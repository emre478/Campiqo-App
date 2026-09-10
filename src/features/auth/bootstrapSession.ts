import {
	getAppProblemMessage,
	toAppProblem,
	type AppProblem,
} from "../../api/appProblem";
import { campiqoClient } from "../../api/campiqoClient";
import type { SessionStore } from "../../api/sessionStore";
import type {
	AuthenticatedUserResponse,
	UserProfileResponseApiResponse,
} from "../../generated/api";

interface SessionBootstrapClient {
	users: {
		userGetMyProfile(): Promise<UserProfileResponseApiResponse>;
	};
	sessionStore: SessionStore;
}

export type SessionBootstrapResult =
	| {
			status: "authenticated";
			user: AuthenticatedUserResponse;
	  }
	| {
			status: "signedOut";
	  }
	| {
			status: "error";
			message: string;
			problem: AppProblem;
	  };

export async function bootstrapSession(
	client: SessionBootstrapClient = campiqoClient
): Promise<SessionBootstrapResult> {
	try {
		const session = await client.sessionStore.get();

		if (!session) {
			return {
				status: "signedOut",
			};
		}

		try {
			const response = await client.users.userGetMyProfile();
			const profile = response.data;

			if (!response.isSuccess || !profile?.id) {
				await client.sessionStore.clear();

				return {
					status: "signedOut",
				};
			}

			return {
				status: "authenticated",
				user: {
					id: profile.id,
					email: profile.email,
					firstName: profile.firstName,
					lastName: profile.lastName,
					isEmailVerified: profile.isEmailVerified,
					profileCompletion: profile.profileCompletion,
				},
			};
		} catch (error) {
			const problem = await toAppProblem(error);

			if (problem.status === 401 || problem.status === 403) {
				await client.sessionStore.clear();

				return {
					status: "signedOut",
				};
			}

			return {
				status: "error",
				message: getAppProblemMessage(problem),
				problem,
			};
		}
	} catch (error) {
		const problem = await toAppProblem(error);

		return {
			status: "error",
			message: getAppProblemMessage(problem),
			problem,
		};
	}
}
