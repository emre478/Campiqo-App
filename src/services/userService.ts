import apiClient from "../api/apiClient";

export const getMyProfile = async () => {
	const response = await apiClient.get("/User/me");

	return response.data;
};