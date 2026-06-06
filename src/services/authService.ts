import apiClient from "../api/apiClient";

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const register = async (data: any) => {
  const response = await apiClient.post("/auth/register", data);

  return response.data;
};