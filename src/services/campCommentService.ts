import apiClient from "../api/apiClient";

export const addCampComment = async (campId: string, content: string) => {
	const response = await apiClient.post(`/camp/${campId}/comments`, {
		content,
	});

	return response.data;
};

export const getCampComments = async (campId: string) => {
	const response = await apiClient.get(`/camp/${campId}/comments`);

	return response.data;
};

export const deleteCampComment = async (commentId: string) => {
	const response = await apiClient.delete(`/camp/comments/${commentId}`);

	return response.data;
};
