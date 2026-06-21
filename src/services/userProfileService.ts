import apiClient from "../api/apiClient";

export const getUserProfile = async (userId: string) => {
	const response = await apiClient.get(`/User/${userId}`);

	return response.data;
};

export const getUserCreatedCamps = async (userId: string) => {
	const response = await apiClient.get(`/User/${userId}/created-camps`);

	return response.data;
};

export const getUserJoinedCamps = async (userId: string) => {
	const response = await apiClient.get(`/User/${userId}/joined-camps`);

	return response.data;
};
