import {
	getAppProblemMessage,
	toAppProblem,
	type AppProblem,
} from "../../api/appProblem";
import { campiqoClient, saveAuthResponse } from "../../api/campiqoClient";
import type { SessionStore } from "../../api/sessionStore";
import type { AuthLoginRequest } from "../../generated/api/apis/AuthApi";
import type {
	AuthenticatedUserResponse,
	AuthResponseApiResponse,
} from "../../generated/api/models";

interface PasswordLoginClient {
	auth: {
		authLogin(request: AuthLoginRequest): Promise<AuthResponseApiResponse>;
	};
	sessionStore: SessionStore;
}

export type PasswordLoginResult =
	| {
			ok: true;
			user: AuthenticatedUserResponse;
	  }
	| {
			ok: false;
			message: string;
			problem?: AppProblem;
	  };

export async function loginWithPassword(
	email: string,
	password: string,
	client: PasswordLoginClient = campiqoClient
): Promise<PasswordLoginResult> {
	const normalizedEmail = email.trim().toLowerCase();

	if (!normalizedEmail || !password) {
		return {
			ok: false,
			message: "E-posta ve şifre alanları zorunludur.",
		};
	}

	try {
		const response = await client.auth.authLogin({
			loginRequest: {
				email: normalizedEmail,
				password,
			},
		});

		if (!response.isSuccess || !response.data) {
			return {
				ok: false,
				message: "Giriş yapılamadı. Bilgilerini kontrol edip tekrar dene.",
			};
		}

		const user = response.data.user;

		if (!user?.id) {
			await client.sessionStore.clear();

			return {
				ok: false,
				message: "Giriş cevabı geçerli kullanıcı bilgisi içermiyor.",
			};
		}

		await saveAuthResponse(response.data, client.sessionStore);

		return {
			ok: true,
			user,
		};
	} catch (error) {
		const problem = await toAppProblem(error);

		return {
			ok: false,
			message: getAppProblemMessage(problem),
			problem,
		};
	}
}
