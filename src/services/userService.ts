import apiClient from "../api/apiClient";

export const getMyProfile = async () => {
	const response = await apiClient.get("/User/me");

	return response.data;
};

export const updateProfile = async (data: any) => {
	const response = await apiClient.put("/User/me", data);

	return response.data;
};
