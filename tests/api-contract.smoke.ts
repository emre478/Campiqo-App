import assert from "node:assert/strict";
import test from "node:test";
import { parseAppEnvironment, resolveApiServerUrl } from "../src/api/apiConfig";
import { getAppProblemMessage, toAppProblem } from "../src/api/appProblem";
import {
	createCampiqoClient,
	saveAuthResponse,
} from "../src/api/campiqoClient";
import {
	deserializeAuthSession,
	isAuthSession,
	type AuthSession,
	type SessionStore,
} from "../src/api/sessionStore";
import { loginWithPassword } from "../src/features/auth/login";
import { logoutCurrentSession } from "../src/features/auth/logout";
import type {
	AuthResponseApiResponse,
	CampResponsePaginatedResponseApiResponse,
	ProblemDetails,
} from "../src/generated/api/models";
import { FetchError, ResponseError } from "../src/generated/api/runtime";

class MemorySessionStore implements SessionStore {
	value: AuthSession | null = null;
	async get() {
		return this.value;
	}
	async set(value: AuthSession) {
		this.value = value;
	}
	async clear() {
		this.value = null;
	}
}

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});

test("password login saves the generated AuthResponse session", async () => {
	const sessionStore = new MemorySessionStore();

	const result = await loginWithPassword(
		"  USER@CAMPIQO.TEST ",
		"StrongPassword123!",
		{
			sessionStore,
			auth: {
				async authLogin(request) {
					assert.equal(request.loginRequest?.email, "user@campiqo.test");
					assert.equal(
						request.loginRequest?.password,
						"StrongPassword123!"
					);

					return {
						isSuccess: true,
						data: {
							accessToken: "access-token",
							refreshToken: "refresh-token",
							expiresAtUtc: "2026-09-06T00:00:00Z",
							refreshTokenExpiresAtUtc: "2026-10-06T00:00:00Z",
							user: {
								id: "user-id",
								email: "user@campiqo.test",
								firstName: "Test",
								lastName: "User",
								isEmailVerified: true,
							},
						},
					};
				},
			},
		}
	);

	if (result.ok === false) {
		assert.fail(result.message);
	}

	assert.equal(result.user.id, "user-id");
	assert.equal(sessionStore.value?.accessToken, "access-token");
	assert.equal(sessionStore.value?.refreshToken, "refresh-token");
});

test("logout revokes the refresh token and clears local session", async () => {
	const sessionStore = new MemorySessionStore();
	sessionStore.value = {
		accessToken: "access-token",
		refreshToken: "refresh-token",
	};

	let receivedRefreshToken: string | undefined;

	const result = await logoutCurrentSession({
		sessionStore,
		auth: {
			async authLogout(request) {
				receivedRefreshToken = request.logoutRequest?.refreshToken;

				return {
					isSuccess: true,
					data: true,
				};
			},
		},
	});

	assert.equal(receivedRefreshToken, "refresh-token");
	assert.equal(result.serverRevoked, true);
	assert.equal(result.problem, undefined);
	assert.equal(sessionStore.value, null);
});

test("logout clears local session when server revoke fails", async () => {
	const sessionStore = new MemorySessionStore();
	sessionStore.value = {
		accessToken: "access-token",
		refreshToken: "refresh-token",
	};

	const result = await logoutCurrentSession({
		sessionStore,
		auth: {
			async authLogout() {
				throw new TypeError("Network unavailable");
			},
		},
	});

	assert.equal(result.serverRevoked, false);
	assert.equal(result.problem?.kind, "network");
	assert.equal(sessionStore.value, null);
});

test("session validation rejects malformed or incomplete values", () => {
	assert.equal(deserializeAuthSession("not-json"), null);
	assert.equal(deserializeAuthSession("{}"), null);

	assert.equal(
		deserializeAuthSession(
			JSON.stringify({
				accessToken: "access",
			})
		),
		null
	);

	assert.equal(
		deserializeAuthSession(
			JSON.stringify({
				accessToken: " ",
				refreshToken: "refresh",
			})
		),
		null
	);

	assert.equal(
		deserializeAuthSession(
			JSON.stringify({
				accessToken: "access",
				refreshToken: "refresh",
				expiresAtUtc: "invalid-date",
			})
		),
		null
	);

	assert.equal(
		isAuthSession({
			accessToken: "access",
			refreshToken: "refresh",
		}),
		true
	);
});

test("invalid refresh credentials clear the session", async () => {
	for (const status of [400, 401, 403]) {
		const sessionStore = new MemorySessionStore();
		sessionStore.value = {
			accessToken: "expired",
			refreshToken: "invalid-refresh",
		};

		const client = createCampiqoClient({
			baseUrl: "https://api.campiqo.test",
			sessionStore,
			fetchApi: async (input) => {
				if (String(input).endsWith("/api/v1/auth/refresh")) {
					return json({ title: "Invalid refresh token" }, status);
				}

				return json({ title: "Unauthorized" }, 401);
			},
		});

		await assert.rejects(() => client.camps.campGetAll({}), ResponseError);

		assert.equal(
			sessionStore.value,
			null,
			`${status} refresh cevabında session temizlenmedi`
		);
	}
});

test("transient refresh responses preserve the session", async () => {
	for (const status of [429, 500, 503]) {
		const sessionStore = new MemorySessionStore();
		sessionStore.value = {
			accessToken: "expired",
			refreshToken: "valid-refresh",
		};

		const client = createCampiqoClient({
			baseUrl: "https://api.campiqo.test",
			sessionStore,
			fetchApi: async (input) => {
				if (String(input).endsWith("/api/v1/auth/refresh")) {
					return json({ title: "Temporary failure" }, status);
				}

				return json({ title: "Unauthorized" }, 401);
			},
		});

		await assert.rejects(
			() => client.camps.campGetAll({}),
			(error: unknown) => {
				assert.ok(error instanceof FetchError);
				assert.ok(error.cause instanceof ResponseError);
				assert.equal(error.cause.response.status, status);
				return true;
			}
		);

		assert.equal(sessionStore.value?.refreshToken, "valid-refresh");
	}
});

test("network failure during refresh preserves the session", async () => {
	const sessionStore = new MemorySessionStore();
	sessionStore.value = {
		accessToken: "expired",
		refreshToken: "valid-refresh",
	};

	const client = createCampiqoClient({
		baseUrl: "https://api.campiqo.test",
		sessionStore,
		fetchApi: async (input) => {
			if (String(input).endsWith("/api/v1/auth/refresh")) {
				throw new TypeError("Network unavailable");
			}

			return json({ title: "Unauthorized" }, 401);
		},
	});

	await assert.rejects(
		() => client.camps.campGetAll({}),
		(error: unknown) => {
			assert.ok(error instanceof FetchError);
			assert.ok(error.cause instanceof TypeError);
			assert.match(error.cause.message, /Network unavailable/);
			return true;
		}
	);

	assert.equal(sessionStore.value?.refreshToken, "valid-refresh");
});

test("development uses the Android emulator API URL by default", () => {
	assert.equal(resolveApiServerUrl("development"), "http://10.0.2.2:5170");
});

test("API origin removes a trailing slash", () => {
	assert.equal(
		resolveApiServerUrl("production", "https://api.campiqo.example/"),
		"https://api.campiqo.example"
	);
});

test("staging and production require an explicit API URL", () => {
	assert.throws(() => resolveApiServerUrl("staging"), /zorunludur/);

	assert.throws(() => resolveApiServerUrl("production"), /zorunludur/);
});

test("staging and production reject HTTP", () => {
	assert.throws(
		() =>
			resolveApiServerUrl("staging", "http://staging-api.campiqo.example"),
		/HTTPS/
	);

	assert.throws(
		() => resolveApiServerUrl("production", "http://api.campiqo.example"),
		/HTTPS/
	);
});

test("production rejects local API hosts", () => {
	assert.throws(
		() => resolveApiServerUrl("production", "https://localhost:5170"),
		/yerel API hostu/
	);
});

test("API URL rejects paths, query strings and hashes", () => {
	assert.throws(
		() =>
			resolveApiServerUrl(
				"production",
				"https://api.campiqo.example/api/v1"
			),
		/yalnızca server origin/
	);

	assert.throws(
		() =>
			resolveApiServerUrl(
				"production",
				"https://api.campiqo.example?debug=true"
			),
		/yalnızca server origin/
	);
});

test("application environment rejects unknown values", () => {
	assert.throws(
		() => parseAppEnvironment("qa"),
		/Geçersiz EXPO_PUBLIC_APP_ENV/
	);
});

test("client exposes every consumer API group and excludes admin APIs", () => {
	const client = createCampiqoClient({
		baseUrl: "https://api.campiqo.test",
		fetchApi: async () => json({}),
		sessionStore: new MemorySessionStore(),
	});

	const consumerApiGroups = [
		"auth",
		"camps",
		"comments",
		"favorites",
		"campImages",
		"invitations",
		"joinRequests",
		"participants",
		"ratings",
		"chat",
		"reports",
		"legal",
		"metadata",
		"notifications",
		"uploads",
		"users",
		"userBlocks",
	] as const;

	for (const group of consumerApiGroups) {
		assert.ok(client[group], `${group} API grubu expose edilmedi`);
	}

	assert.equal("adminAudit" in client, false);
	assert.equal("adminReports" in client, false);
	assert.equal("adminModeration" in client, false);
});

test("generated client covers register, login, refresh and camp list", async () => {
	const calls: Array<{ url: string; init?: RequestInit }> = [];
	const sessionStore = new MemorySessionStore();
	const authData = {
		accessToken: "access-token",
		refreshToken: "refresh-token",
		tokenType: "Bearer",
		expiresAtUtc: "2026-09-01T00:00:00Z",
		refreshTokenExpiresAtUtc: "2026-10-01T00:00:00Z",
	};

	const mockFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
		const url = String(input);
		calls.push({ url, init });
		if (
			new URL(url).pathname === "/api/v1/camp" &&
			(init?.method ?? "GET") === "GET"
		) {
			const response: CampResponsePaginatedResponseApiResponse = {
				isSuccess: true,
				message: "ok",
				data: { items: [], totalCount: 0, page: 1, pageSize: 10 },
			};
			return json(response);
		}

		if (new URL(url).pathname === "/api/v1/camp") {
			return json({ isSuccess: true, data: { id: "camp-id" } }, 201);
		}

		const response: AuthResponseApiResponse = {
			isSuccess: true,
			message: "ok",
			data: authData,
		};
		return json(response);
	};

	const client = createCampiqoClient({
		baseUrl: "https://api.campiqo.test",
		fetchApi: mockFetch,
		sessionStore,
		idempotencyKeyFactory: async () => "00000000-0000-4000-8000-000000000001",
	});

	const registered = await client.auth.authRegister({
		registerRequest: {
			email: "test@campiqo.test",
			password: "StrongPassword123!",
			firstName: "Camp",
			lastName: "User",
			hasAcceptedTermsOfUse: true,
			termsOfUseVersion: "1.0",
			hasAcceptedPrivacyPolicy: true,
			privacyPolicyVersion: "1.0",
		},
	});
	const loggedIn = await client.auth.authLogin({
		loginRequest: { email: "test@campiqo.test", password: "password" },
	});
	const refreshed = await client.auth.authRefresh({
		refreshTokenRequest: { refreshToken: "refresh-token" },
	});
	const camps = await client.camps.campGetAll({ page: 1, pageSize: 10 });
	const idempotencyKey = await client.createIdempotencyKey();
	await client.camps.campCreate({
		idempotencyKey,
		createCampRequest: { title: "Contract camp" },
	});

	assert.equal(registered.data?.accessToken, "access-token");
	assert.equal(loggedIn.data?.refreshToken, "refresh-token");
	assert.equal(refreshed.data?.expiresAtUtc, "2026-09-01T00:00:00Z");
	assert.deepEqual(camps.data?.items, []);
	assert.equal(idempotencyKey, "00000000-0000-4000-8000-000000000001");
	assert.deepEqual(
		calls.map(({ url }) => new URL(url).pathname),
		[
			"/api/v1/auth/register",
			"/api/v1/auth/login",
			"/api/v1/auth/refresh",
			"/api/v1/camp",
			"/api/v1/camp",
		]
	);
	assert.equal(
		new Headers(calls.at(-1)?.init?.headers).get("Idempotency-Key"),
		idempotencyKey
	);
});

test("401 triggers a single refresh and retries with the new token", async () => {
	const sessionStore = new MemorySessionStore();
	sessionStore.value = {
		accessToken: "expired",
		refreshToken: "refresh",
	};
	let campCalls = 0;
	let refreshCalls = 0;

	const mockFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
		const url = String(input);
		if (url.endsWith("/api/v1/auth/refresh")) {
			refreshCalls += 1;
			return json({
				isSuccess: true,
				data: { accessToken: "new", refreshToken: "new-refresh" },
			});
		}

		campCalls += 1;
		if (campCalls === 1) {
			return json({ title: "Unauthorized" }, 401);
		}

		assert.equal(
			new Headers(init?.headers).get("Authorization"),
			"Bearer new"
		);
		return json({ isSuccess: true, data: { items: [] } });
	};

	const client = createCampiqoClient({
		baseUrl: "https://api.campiqo.test",
		fetchApi: mockFetch,
		sessionStore,
	});
	await client.camps.campGetAll({});

	assert.equal(refreshCalls, 1);
	assert.equal(campCalls, 2);
	assert.equal(sessionStore.value?.accessToken, "new");
});

test(
	"ten concurrent 401 responses share one refresh request",
	{ timeout: 5000 },
	async () => {
		const sessionStore = new MemorySessionStore();
		sessionStore.value = {
			accessToken: "expired-access",
			refreshToken: "valid-refresh",
		};

		let refreshCalls = 0;
		let unauthorizedCalls = 0;
		let successfulRetries = 0;

		let releaseRefresh!: () => void;
		const refreshGate = new Promise<void>((resolve) => {
			releaseRefresh = resolve;
		});
		let reportRefreshStarted!: () => void;
		const refreshStarted = new Promise<void>((resolve) => {
			reportRefreshStarted = resolve;
		});

		let reportAllUnauthorized!: () => void;
		const allUnauthorizedSeen = new Promise<void>((resolve) => {
			reportAllUnauthorized = resolve;
		});

		const client = createCampiqoClient({
			baseUrl: "https://api.campiqo.test",
			sessionStore,
			fetchApi: async (input, init) => {
				const url = String(input);

				if (url.endsWith("/api/v1/auth/refresh")) {
					refreshCalls += 1;
					reportRefreshStarted();
					await refreshGate;

					return json({
						isSuccess: true,
						data: {
							accessToken: "new-access",
							refreshToken: "rotated-refresh",
						},
					});
				}

				const authorization = new Headers(init?.headers).get(
					"Authorization"
				);

				if (authorization === "Bearer expired-access") {
					unauthorizedCalls += 1;

					if (unauthorizedCalls === 10) {
						reportAllUnauthorized();
					}

					return json({ title: "Unauthorized" }, 401);
				}

				assert.equal(
					authorization,
					"Bearer new-access",
					"İstek yeni access token ile tekrar gönderilmedi"
				);

				successfulRetries += 1;

				return json({
					isSuccess: true,
					data: {
						items: [],
						totalCount: 0,
						page: 1,
						pageSize: 10,
					},
				});
			},
		});

		const requests = Array.from({ length: 10 }, () =>
			client.camps.campGetAll({})
		);

		await allUnauthorizedSeen;
		await refreshStarted;

		assert.equal(unauthorizedCalls, 10);
		assert.equal(
			refreshCalls,
			1,
			"Eşzamanlı 401 cevapları birden fazla refresh başlattı"
		);

		releaseRefresh();

		const results = await Promise.all(requests);

		assert.equal(results.length, 10);
		assert.equal(successfulRetries, 10);
		assert.equal(refreshCalls, 1);
		assert.equal(sessionStore.value?.accessToken, "new-access");
		assert.equal(sessionStore.value?.refreshToken, "rotated-refresh");
	}
);

test("Problem Details is normalized and generated contract stays nullable", async () => {
	const details: ProblemDetails = {
		title: "Validation failed",
		status: 400,
		detail: null,
		errors: { email: ["Invalid"] },
	};
	const problem = await toAppProblem(new ResponseError(json(details, 400)));

	assert.equal(problem.status, 400);
	assert.deepEqual(problem.errors, { email: ["Invalid"] });
	assert.equal(problem.kind, "http");
	assert.equal(problem.retryable, false);
	assert.equal(
		getAppProblemMessage(problem),
		"Lütfen form alanlarını kontrol et."
	);

	const sessionStore = new MemorySessionStore();
	await saveAuthResponse(
		{ accessToken: "a", refreshToken: "r", tokenType: null },
		sessionStore
	);
	assert.equal(sessionStore.value?.refreshToken, "r");
});

test("wrapped HTTP errors preserve status and Problem Details", async () => {
	const responseError = new ResponseError(
		json(
			{
				title: "Too many requests",
				status: 429,
				code: "RATE_LIMITED",
				traceId: "trace-123",
			},
			429
		)
	);

	const problem = await toAppProblem(
		new FetchError(
			responseError,
			"Generated runtime wrapped the response error"
		)
	);

	assert.equal(problem.kind, "http");
	assert.equal(problem.status, 429);
	assert.equal(problem.code, "RATE_LIMITED");
	assert.equal(problem.traceId, "trace-123");
	assert.equal(problem.retryable, true);
	assert.equal(
		getAppProblemMessage(problem),
		"Çok fazla istek gönderildi. Bir süre sonra tekrar dene."
	);
});

test("network errors do not expose their raw message", async () => {
	const problem = await toAppProblem(
		new FetchError(
			new TypeError(
				"Request to private-host.example with secret query failed"
			),
			"Generated runtime request failure"
		)
	);

	assert.equal(problem.kind, "network");
	assert.equal(problem.retryable, true);
	assert.equal(problem.title, "Bağlantı hatası");

	const message = getAppProblemMessage(problem);

	assert.equal(
		message,
		"İnternet bağlantısı kurulamadı. Bağlantını kontrol edip tekrar dene."
	);
	assert.doesNotMatch(message, /private-host/);
	assert.doesNotMatch(message, /secret/);
});
