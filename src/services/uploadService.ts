import apiClient from "../api/apiClient";

export const uploadImage = async (imageUri: string) => {
	const formData = new FormData();

	formData.append("file", {
		uri: imageUri,
		name: "camp-image.jpg",
		type: "image/jpeg",
	} as any);

	const response = await apiClient.post(
		"/Upload",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);

	return response.data;
};