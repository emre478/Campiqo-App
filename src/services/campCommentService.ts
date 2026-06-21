import apiClient from "../api/apiClient";

export const addCampComment = async (campId: string, content: string) => {
	const response = await apiClient.post(`/Camp/${campId}/comments`, {
		content,
	});

	return response.data;
};

export const getCampComments = async (campId: string) => {
	const response = await apiClient.get(`/Camp/${campId}/comments`);

	return response.data;
};

export const updateCampComment = async (commentId: string, content: string) => {
	const response = await apiClient.put(`/Camp/comments/${commentId}`, {
		content,
	});

	return response.data;
};

export const deleteCampComment = async (commentId: string) => {
	const response = await apiClient.delete(`/Camp/comments/${commentId}`);

	return response.data;
};
