import { FetchError, ResponseError } from "../generated/api/runtime";

export type AppProblemKind = "http" | "network" | "cancelled" | "unknown";

export interface AppProblem {
	kind: AppProblemKind;
	title: string;
	status?: number;
	detail?: string;
	code?: string;
	traceId?: string;
	errors?: Record<string, string[]>;
	retryable: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function readString(
	record: Record<string, unknown>,
	key: string
): string | undefined {
	const value = record[key];
	return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readValidationErrors(
	value: unknown
): Record<string, string[]> | undefined {
	if (!isRecord(value)) {
		return undefined;
	}

	const result: Record<string, string[]> = {};

	for (const [field, messages] of Object.entries(value)) {
		if (!Array.isArray(messages)) {
			continue;
		}

		const validMessages = messages.filter(
			(message): message is string =>
				typeof message === "string" && message.length > 0
		);

		if (validMessages.length > 0) {
			result[field] = validMessages;
		}
	}

	return Object.keys(result).length > 0 ? result : undefined;
}

function isRetryableStatus(status: number): boolean {
	return status === 408 || status === 425 || status === 429 || status >= 500;
}

function unwrapGeneratedError(error: unknown): unknown {
	let current = error;
	const visited = new Set<unknown>();

	while (
		current instanceof FetchError &&
		current.cause &&
		!visited.has(current)
	) {
		visited.add(current);
		current = current.cause;
	}

	return current;
}

async function fromResponseError(error: ResponseError): Promise<AppProblem> {
	let body: Record<string, unknown> = {};

	try {
		const parsed: unknown = await error.response.clone().json();

		if (isRecord(parsed)) {
			body = parsed;
		}
	} catch {
		// Non-JSON cevaplarda HTTP status korunur.
	}

	const status = error.response.status;

	return {
		kind: "http",
		status,
		title: readString(body, "title") ?? "API isteği başarısız",
		detail: readString(body, "detail"),
		code: readString(body, "code"),
		traceId: readString(body, "traceId"),
		errors: readValidationErrors(body.errors),
		retryable: isRetryableStatus(status),
	};
}

export async function toAppProblem(error: unknown): Promise<AppProblem> {
	const rootError = unwrapGeneratedError(error);

	if (rootError instanceof ResponseError) {
		return fromResponseError(rootError);
	}

	if (rootError instanceof Error && rootError.name === "AbortError") {
		return {
			kind: "cancelled",
			title: "İşlem iptal edildi",
			retryable: false,
		};
	}

	if (error instanceof FetchError || rootError instanceof TypeError) {
		return {
			kind: "network",
			title: "Bağlantı hatası",
			retryable: true,
		};
	}

	return {
		kind: "unknown",
		title: "Beklenmeyen hata",
		retryable: false,
	};
}

export function getAppProblemMessage(problem: AppProblem): string {
	if (problem.kind === "network") {
		return "İnternet bağlantısı kurulamadı. Bağlantını kontrol edip tekrar dene.";
	}

	if (problem.kind === "cancelled") {
		return "İşlem iptal edildi.";
	}

	if (problem.errors) {
		return "Lütfen form alanlarını kontrol et.";
	}

	switch (problem.status) {
		case 400:
			return "Gönderilen bilgiler geçerli değil.";
		case 401:
			return "Oturumun sona erdi. Lütfen tekrar giriş yap.";
		case 403:
			return "Bu işlem için yetkin bulunmuyor.";
		case 404:
			return "İstenen içerik bulunamadı.";
		case 408:
			return "İstek zaman aşımına uğradı. Tekrar dene.";
		case 409:
			return "Veriler başka bir işlemle değişti. Sayfayı yenileyip tekrar dene.";
		case 429:
			return "Çok fazla istek gönderildi. Bir süre sonra tekrar dene.";
		default:
			if (problem.status !== undefined && problem.status >= 500) {
				return "Servise şu anda ulaşılamıyor. Daha sonra tekrar dene.";
			}

			return "İşlem tamamlanamadı. Lütfen tekrar dene.";
	}
}
