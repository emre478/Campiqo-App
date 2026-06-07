import apiClient from "../api/apiClient";

export const getMyCreatedCamps = async () => {
	const response = await apiClient.get("/Camp/my-created");

	return response.data;
};

export const getMyJoinedCamps = async () => {
	const response = await apiClient.get("/Camp/my-joined");

	return response.data;
};