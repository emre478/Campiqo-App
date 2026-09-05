import { toAppProblem, type AppProblem } from "../../api/appProblem";
import { campiqoClient, type CampiqoClient } from "../../api/campiqoClient";
import type { SessionStore } from "../../api/sessionStore";
import type {
	AuthRegisterRequest,
	AuthResponseApiResponse,
	AuthenticatedUserResponse,
	CurrentLegalDocumentsResponseApiResponse,
	LegalDocumentResponse,
} from "../../generated/api";

const TERMS_OF_USE_DOCUMENT_TYPE = 1;
const PRIVACY_POLICY_DOCUMENT_TYPE = 2;

export interface RegistrationLegalDocument {
	version: string;
	url: string;
}

export interface RegistrationLegalDocuments {
	termsOfUse: RegistrationLegalDocument;
	privacyPolicy: RegistrationLegalDocument;
}

export interface PasswordRegistrationInput {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	hasAcceptedTermsOfUse: boolean;
	hasAcceptedPrivacyPolicy: boolean;
	legalDocuments: RegistrationLegalDocuments;
}

export type LoadRegistrationLegalDocumentsResult =
	| {
			ok: true;
			documents: RegistrationLegalDocuments;
	  }
	| {
			ok: false;
			message: string;
			problem: AppProblem;
	  };

export type PasswordRegistrationResult =
	| {
			ok: true;
			user: AuthenticatedUserResponse;
	  }
	| {
			ok: false;
			message: string;
			problem?: AppProblem;
	  };

interface RegistrationClient {
	auth: {
		authRegister(
			request: AuthRegisterRequest
		): Promise<AuthResponseApiResponse>;
	};
	legal: {
		legalGetCurrentDocuments(): Promise<CurrentLegalDocumentsResponseApiResponse>;
	};
	sessionStore: SessionStore;
}

function toRegistrationClient(
	client: CampiqoClient = campiqoClient
): RegistrationClient {
	return {
		auth: client.auth,
		legal: client.legal,
		sessionStore: client.sessionStore,
	};
}

function isValidDocumentUrl(value: string): boolean {
	try {
		const url = new URL(value);

		return url.protocol === "https:" || url.protocol === "http:";
	} catch {
		return false;
	}
}

function mapLegalDocument(
	document: LegalDocumentResponse | undefined
): RegistrationLegalDocument | null {
	const version = document?.version?.trim();
	const url = document?.url?.trim();

	if (!version || !url || !isValidDocumentUrl(url)) {
		return null;
	}

	return {
		version,
		url,
	};
}

export async function loadRegistrationLegalDocuments(
	client: RegistrationClient = toRegistrationClient()
): Promise<LoadRegistrationLegalDocumentsResult> {
	try {
		const response = await client.legal.legalGetCurrentDocuments();
		const documents = response.data?.documents ?? [];

		const termsOfUse = mapLegalDocument(
			documents.find(
				(document) => document.documentType === TERMS_OF_USE_DOCUMENT_TYPE
			)
		);

		const privacyPolicy = mapLegalDocument(
			documents.find(
				(document) => document.documentType === PRIVACY_POLICY_DOCUMENT_TYPE
			)
		);

		if (!response.isSuccess || !termsOfUse || !privacyPolicy) {
			return {
				ok: false,
				message:
					"Güncel kullanım koşulları veya gizlilik politikası alınamadı.",
				problem: {
					kind: "contract",
					message:
						"Güncel kullanım koşulları veya gizlilik politikası alınamadı.",
				},
			};
		}

		return {
			ok: true,
			documents: {
				termsOfUse,
				privacyPolicy,
			},
		};
	} catch (error) {
		const problem = await toAppProblem(error);

		return {
			ok: false,
			message: problem.message,
			problem,
		};
	}
}

export async function registerWithPassword(
	input: PasswordRegistrationInput,
	client: RegistrationClient = toRegistrationClient()
): Promise<PasswordRegistrationResult> {
	const firstName = input.firstName.trim();
	const lastName = input.lastName.trim();
	const email = input.email.trim().toLowerCase();

	if (!firstName || !lastName || !email || !input.password) {
		return {
			ok: false,
			message: "Lütfen bütün zorunlu alanları doldurun.",
		};
	}

	if (input.password !== input.confirmPassword) {
		return {
			ok: false,
			message: "Şifreler eşleşmiyor.",
		};
	}

	if (!input.hasAcceptedTermsOfUse || !input.hasAcceptedPrivacyPolicy) {
		return {
			ok: false,
			message:
				"Devam etmek için kullanım koşullarını ve gizlilik politikasını kabul etmelisiniz.",
		};
	}

	try {
		const response = await client.auth.authRegister({
			registerRequest: {
				firstName,
				lastName,
				email,
				password: input.password,
				hasAcceptedTermsOfUse: true,
				termsOfUseVersion: input.legalDocuments.termsOfUse.version,
				hasAcceptedPrivacyPolicy: true,
				privacyPolicyVersion: input.legalDocuments.privacyPolicy.version,
			},
		});

		const authResponse = response.data;
		const user = authResponse?.user;

		if (!response.isSuccess || !authResponse || !user?.id) {
			return {
				ok: false,
				message: response.message || "Kayıt işlemi tamamlanamadı.",
				problem: {
					kind: "contract",
					message: response.message || "Kayıt işlemi tamamlanamadı.",
				},
			};
		}

		await client.sessionStore.saveAuthResponse(authResponse);

		return {
			ok: true,
			user,
		};
	} catch (error) {
		const problem = await toAppProblem(error);

		return {
			ok: false,
			message: problem.message,
			problem,
		};
	}
}
