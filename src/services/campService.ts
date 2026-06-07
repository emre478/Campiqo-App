import apiClient from "../api/apiClient";

export const getCamps = async () => {
	const response = await apiClient.get("/Camp");

	return response.data;
};
export const favoriteCamp = async (campId: string) => {
	const response = await apiClient.post(`/camp/${campId}/favorite`);

	return response.data;
};

export const unfavoriteCamp = async (campId: string) => {
	const response = await apiClient.delete(`/camp/${campId}/favorite`);

	return response.data;
};

export const getFavoriteCamps = async () => {
	const response = await apiClient.get("/camp/favorites");

	return response.data;
};
