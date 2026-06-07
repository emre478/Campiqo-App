import apiClient from "../api/apiClient";

export const requestJoinCamp = async (campId: string) => {
	const response = await apiClient.post(
		`/camp/request/${campId}`
	);

	return response.data;
};