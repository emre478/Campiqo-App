import {
	AuthApi,
	CampApi,
	CampCommentApi,
	CampFavoriteApi,
	CampImageApi,
	CampInvitationApi,
	CampJoinRequestApi,
	CampParticipantApi,
	CampRatingApi,
	ChatApi,
	ContentReportApi,
	LegalApi,
	MetadataApi,
	NotificationApi,
	UploadApi,
	UserApi,
	UserBlockApi,
} from "../generated/api/apis";
import type { AuthResponse } from "../generated/api/models";
import {
	Configuration,
	ResponseError,
	type FetchAPI,
} from "../generated/api/runtime";
import { API_SERVER_URL } from "./apiConfig";
import {
	isAuthSession,
	secureSessionStore,
	type AuthSession,
	type SessionStore,
} from "./sessionStore";

export interface CampiqoProblem {
	status?: number;
	title: string;
	detail?: string;
	code?: string;
	traceId?: string;
	errors?: Record<string, string[]>;
}

export interface CampiqoClientOptions {
	baseUrl?: string;
	sessionStore?: SessionStore;
	fetchApi?: FetchAPI;
	idempotencyKeyFactory?: () => Promise<string>;
}

const authPaths = [
	"/api/v1/auth/login",
	"/api/v1/auth/register",
	"/api/v1/auth/refresh",
];
const INVALID_REFRESH_STATUSES = new Set([400, 401, 403]);

function toSession(response: AuthResponse): AuthSession | null {
	const session = {
		accessToken: response.accessToken,
		refreshToken: response.refreshToken,
		expiresAtUtc: response.expiresAtUtc,
		refreshTokenExpiresAtUtc: response.refreshTokenExpiresAtUtc,
	};

	return isAuthSession(session) ? session : null;
}

export function createCampiqoClient(options: CampiqoClientOptions = {}) {
	const baseUrl = (options.baseUrl ?? API_SERVER_URL).replace(/\/$/, "");
	const sessionStore = options.sessionStore ?? secureSessionStore;
	const nativeFetch: FetchAPI = options.fetchApi ?? fetch;
	const idempotencyKeyFactory =
		options.idempotencyKeyFactory ??
		(async () => (await import("expo-crypto")).randomUUID());
	let refreshPromise: Promise<AuthSession | null> | null = null;

	const refreshSession = async (): Promise<AuthSession | null> => {
		if (refreshPromise) {
			return refreshPromise;
		}

		refreshPromise = (async () => {
			const current = await sessionStore.get();
			if (!current?.refreshToken) {
				return null;
			}

			const response = await nativeFetch(`${baseUrl}/api/v1/auth/refresh`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refreshToken: current.refreshToken }),
			});

			if (!response.ok) {
				if (INVALID_REFRESH_STATUSES.has(response.status)) {
					await sessionStore.clear();
					return null;
				}

				throw new ResponseError(
					response,
					`Session refresh geçici olarak başarısız: ${response.status}`
				);
			}

			const envelope = (await response.json()) as {
				data?: AuthResponse | null;
			};
			const refreshed = envelope.data ? toSession(envelope.data) : null;

			if (!refreshed) {
				await sessionStore.clear();
				return null;
			}

			await sessionStore.set(refreshed);
			return refreshed;
		})().finally(() => {
			refreshPromise = null;
		});

		return refreshPromise;
	};

	const fetchWithRefresh: FetchAPI = async (input, init) => {
		const response = await nativeFetch(input, init);
		const url = typeof input === "string" ? input : input.url;

		if (
			response.status !== 401 ||
			authPaths.some((path) => url.includes(path))
		) {
			return response;
		}

		const refreshed = await refreshSession();
		if (!refreshed) {
			return response;
		}

		const headers = new Headers(init?.headers);
		headers.set("Authorization", `Bearer ${refreshed.accessToken}`);
		return nativeFetch(input, { ...init, headers });
	};

	const configuration = new Configuration({
		basePath: baseUrl,
		accessToken: async () => (await sessionStore.get())?.accessToken ?? "",
		fetchApi: fetchWithRefresh,
	});

	return {
		auth: new AuthApi(configuration),
		camps: new CampApi(configuration),
		comments: new CampCommentApi(configuration),
		favorites: new CampFavoriteApi(configuration),
		campImages: new CampImageApi(configuration),
		invitations: new CampInvitationApi(configuration),
		joinRequests: new CampJoinRequestApi(configuration),
		participants: new CampParticipantApi(configuration),
		ratings: new CampRatingApi(configuration),
		chat: new ChatApi(configuration),
		reports: new ContentReportApi(configuration),
		legal: new LegalApi(configuration),
		metadata: new MetadataApi(configuration),
		notifications: new NotificationApi(configuration),
		uploads: new UploadApi(configuration),
		users: new UserApi(configuration),
		userBlocks: new UserBlockApi(configuration),
		sessionStore,
		createIdempotencyKey: idempotencyKeyFactory,
	};
}

export async function saveAuthResponse(
	response: AuthResponse,
	sessionStore: SessionStore = secureSessionStore
): Promise<AuthSession> {
	const session = toSession(response);
	if (!session) {
		throw new Error(
			"Auth response geçerli access ve refresh token içermiyor."
		);
	}

	await sessionStore.set(session);
	return session;
}

export async function toCampiqoProblem(
	error: unknown
): Promise<CampiqoProblem> {
	if (!(error instanceof ResponseError)) {
		return {
			title: error instanceof Error ? error.message : "Beklenmeyen hata",
		};
	}

	let body: Record<string, unknown> = {};
	try {
		body = (await error.response.clone().json()) as Record<string, unknown>;
	} catch {
		// Non-JSON error bodies still retain their HTTP status below.
	}

	return {
		status: error.response.status,
		title:
			typeof body.title === "string" ? body.title : "API isteği başarısız",
		detail: typeof body.detail === "string" ? body.detail : undefined,
		code: typeof body.code === "string" ? body.code : undefined,
		traceId: typeof body.traceId === "string" ? body.traceId : undefined,
		errors:
			typeof body.errors === "object" && body.errors !== null
				? (body.errors as Record<string, string[]>)
				: undefined,
	};
}

export const campiqoClient = createCampiqoClient();
