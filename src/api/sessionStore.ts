export interface AuthSession {
	accessToken: string;
	refreshToken: string;
	expiresAtUtc?: string;
	refreshTokenExpiresAtUtc?: string;
}

export interface SessionStore {
	get(): Promise<AuthSession | null>;
	set(session: AuthSession): Promise<void>;
	clear(): Promise<void>;
}

const SESSION_KEY = "campiqo.auth.session.v1";

function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

function isOptionalIsoDate(value: unknown): value is string | undefined {
	return (
		value === undefined ||
		(typeof value === "string" &&
			value.length > 0 &&
			!Number.isNaN(Date.parse(value)))
	);
}

export function isAuthSession(value: unknown): value is AuthSession {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const session = value as Record<string, unknown>;

	return (
		isNonEmptyString(session.accessToken) &&
		isNonEmptyString(session.refreshToken) &&
		isOptionalIsoDate(session.expiresAtUtc) &&
		isOptionalIsoDate(session.refreshTokenExpiresAtUtc)
	);
}

export function deserializeAuthSession(value: string): AuthSession | null {
	try {
		const parsed: unknown = JSON.parse(value);
		return isAuthSession(parsed) ? parsed : null;
	} catch {
		return null;
	}
}

export const secureSessionStore: SessionStore = {
	async get() {
		const SecureStore = await import("expo-secure-store");
		const value = await SecureStore.getItemAsync(SESSION_KEY);

		if (!value) {
			return null;
		}

		const session = deserializeAuthSession(value);

		if (!session) {
			await SecureStore.deleteItemAsync(SESSION_KEY);
			return null;
		}

		return session;
	},

	async set(session) {
		if (!isAuthSession(session)) {
			throw new Error("Geçersiz authentication session kaydedilemez.");
		}

		const SecureStore = await import("expo-secure-store");

		await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session), {
			keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
		});
	},

	async clear() {
		const SecureStore = await import("expo-secure-store");
		await SecureStore.deleteItemAsync(SESSION_KEY);
	},
};
