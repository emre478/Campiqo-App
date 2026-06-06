import apiClient from "../api/apiClient";

export const login = async (
  email: string,
  password: string
) => {
  const response = await apiClient.post("/Auth/login", {
    email,
    password,
  });

  return response.data;
};