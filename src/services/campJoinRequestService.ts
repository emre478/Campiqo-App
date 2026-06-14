import apiClient from "../api/apiClient";

export const requestJoinCamp = async (campId: string) => {
	const response = await apiClient.post(`/camp/request/${campId}`);

	return response.data;
};

export const getPendingJoinRequests = async (campId: string) => {
	const response = await apiClient.get(`/camp/request/pending/${campId}`);

	return response.data;
};

export const approveJoinRequest = async (requestId: string) => {
	const response = await apiClient.post(`/camp/request/approve/${requestId}`);

	return response.data;
};

export const rejectJoinRequest = async (requestId: string) => {
	const response = await apiClient.post(`/camp/request/reject/${requestId}`);

	return response.data;
};
