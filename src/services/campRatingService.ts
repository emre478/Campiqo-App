import apiClient from "../api/apiClient";

export const rateCamp = async (campId: string, rating: number) => {
	const response = await apiClient.post(`/camp/${campId}/rate`, {
		rating,
	});

	return response.data;
};
