import assert from "node:assert/strict";
import test from "node:test";

import {
  createCampiqoClient,
  saveAuthResponse,
  toCampiqoProblem,
} from "../src/api/campiqoClient";
import type {
  AuthResponseApiResponse,
  CampResponsePaginatedResponseApiResponse,
  ProblemDetails,
} from "../src/generated/api/models";
import { ResponseError } from "../src/generated/api/runtime";
import type { AuthSession, SessionStore } from "../src/api/sessionStore";

class MemorySessionStore implements SessionStore {
  value: AuthSession | null = null;
  async get() { return this.value; }
  async set(value: AuthSession) { this.value = value; }
  async clear() { this.value = null; }
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
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
  assert.equal(
    idempotencyKey,
    "00000000-0000-4000-8000-000000000001",
  );
  assert.deepEqual(
    calls.map(({ url }) => new URL(url).pathname),
    [
      "/api/v1/auth/register",
      "/api/v1/auth/login",
      "/api/v1/auth/refresh",
      "/api/v1/camp",
      "/api/v1/camp",
    ],
  );
  assert.equal(
    new Headers(calls.at(-1)?.init?.headers).get("Idempotency-Key"),
    idempotencyKey,
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

    assert.equal(new Headers(init?.headers).get("Authorization"), "Bearer new");
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

test("Problem Details is normalized and generated contract stays nullable", async () => {
  const details: ProblemDetails = {
    title: "Validation failed",
    status: 400,
    detail: null,
    errors: { email: ["Invalid"] },
  };
  const problem = await toCampiqoProblem(
    new ResponseError(json(details, 400)),
  );

  assert.equal(problem.status, 400);
  assert.deepEqual(problem.errors, { email: ["Invalid"] });

  const sessionStore = new MemorySessionStore();
  await saveAuthResponse(
    { accessToken: "a", refreshToken: "r", tokenType: null },
    sessionStore,
  );
  assert.equal(sessionStore.value?.refreshToken, "r");
});
