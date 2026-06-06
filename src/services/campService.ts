import apiClient from "../api/apiClient";

export const getCamps = async () => {
	const response = await apiClient.get("/Camp");

	return response.data;
};