import apiClient from "../api/apiClient";

export const rateCamp = async (campId: string, rating: number) => {
	const response = await apiClient.post(`/camp/${campId}/rate`, {
		rating,
	});

	return response.data;
};
export const getCampById = async (campId: string) => {
	const response = await apiClient.get(`/Camp/${campId}`);

	return response.data;
};
