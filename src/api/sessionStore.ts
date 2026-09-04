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

export const secureSessionStore: SessionStore = {
  async get() {
    const SecureStore = await import("expo-secure-store");
    const value = await SecureStore.getItemAsync(SESSION_KEY);
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as AuthSession;
    } catch {
      await SecureStore.deleteItemAsync(SESSION_KEY);
      return null;
    }
  },

  async set(session) {
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
