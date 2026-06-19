import apiClient from "../api/apiClient";

export const getChatMessages = async (campId: string) => {
	return await apiClient.get(`/chat/${campId}`);
};

export const sendMessage = async (campId: string, message: string) => {
	return await apiClient.post(`/chat/${campId}`, {
		message,
	});
};
