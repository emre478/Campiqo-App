import { toAppProblem, type AppProblem } from "../../api/appProblem";
import { campiqoClient } from "../../api/campiqoClient";
import type { SessionStore } from "../../api/sessionStore";
import type { AuthLogoutRequest } from "../../generated/api/apis/AuthApi";
import type { BooleanApiResponse } from "../../generated/api/models";

interface LogoutClient {
	auth: {
		authLogout(request: AuthLogoutRequest): Promise<BooleanApiResponse>;
	};
	sessionStore: SessionStore;
}

export interface LogoutResult {
	serverRevoked: boolean;
	problem?: AppProblem;
}

export async function logoutCurrentSession(
	client: LogoutClient = campiqoClient
): Promise<LogoutResult> {
	let serverRevoked = false;
	let problem: AppProblem | undefined;

	try {
		const session = await client.sessionStore.get();

		if (session?.refreshToken) {
			const response = await client.auth.authLogout({
				logoutRequest: {
					refreshToken: session.refreshToken,
				},
			});

			serverRevoked = response.isSuccess === true && response.data === true;
		}
	} catch (error) {
		// Backend revoke best-effort'tür. Yerel session yine temizlenir.
		problem = await toAppProblem(error);
	}

	await client.sessionStore.clear();

	return {
		serverRevoked,
		problem,
	};
}
