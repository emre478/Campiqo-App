export type AppEnvironment = "development" | "staging" | "production";

const DEFAULT_DEVELOPMENT_URL = "http://10.0.2.2:5170";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "10.0.2.2"]);

export function parseAppEnvironment(value: string | undefined): AppEnvironment {
	const environment = value?.trim() || "development";

	if (
		environment !== "development" &&
		environment !== "staging" &&
		environment !== "production"
	) {
		throw new Error(`Geçersiz EXPO_PUBLIC_APP_ENV değeri: ${environment}`);
	}

	return environment;
}

export function resolveApiServerUrl(
	environment: AppEnvironment,
	configuredUrl?: string
): string {
	const candidate =
		configuredUrl?.trim() ||
		(environment === "development" ? DEFAULT_DEVELOPMENT_URL : "");

	if (!candidate) {
		throw new Error(
			`EXPO_PUBLIC_API_URL ${environment} ortamında zorunludur.`
		);
	}

	let url: URL;

	try {
		url = new URL(candidate);
	} catch {
		throw new Error("EXPO_PUBLIC_API_URL geçerli bir URL olmalıdır.");
	}

	if (url.protocol !== "http:" && url.protocol !== "https:") {
		throw new Error(
			"EXPO_PUBLIC_API_URL yalnızca HTTP veya HTTPS kullanabilir."
		);
	}

	if (url.username || url.password) {
		throw new Error(
			"EXPO_PUBLIC_API_URL kullanıcı adı veya parola içeremez."
		);
	}

	if (url.pathname !== "/" || url.search.length > 0 || url.hash.length > 0) {
		throw new Error(
			"EXPO_PUBLIC_API_URL yalnızca server origin içermelidir; path, query veya hash içeremez."
		);
	}

	if (environment !== "development") {
		if (url.protocol !== "https:") {
			throw new Error(
				`${environment} ortamında EXPO_PUBLIC_API_URL HTTPS kullanmalıdır.`
			);
		}

		if (LOCAL_HOSTS.has(url.hostname)) {
			throw new Error(
				`${environment} ortamında yerel API hostu kullanılamaz.`
			);
		}
	}

	return `${url.protocol}//${url.host}`;
}

export const APP_ENV = parseAppEnvironment(process.env.EXPO_PUBLIC_APP_ENV);

export const API_SERVER_URL = resolveApiServerUrl(
	APP_ENV,
	process.env.EXPO_PUBLIC_API_URL
);
