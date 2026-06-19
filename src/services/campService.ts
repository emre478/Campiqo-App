import apiClient from "../api/apiClient";
import { CreateCampRequest } from "../types/CreateCampRequest";

export const getCamps = async (page = 1, pageSize = 10) => {
	const response = await apiClient.get(
		`/Camp?page=${page}&pageSize=${pageSize}`
	);

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

export const createCamp = async (data: CreateCampRequest) => {
	const response = await apiClient.post("/Camp", data);
	console.log(response.data);
	return response.data;
};
export const getCampById = async (campId: string) => {
	const response = await apiClient.get(`/Camp/${campId}`);

	return response.data;
};
