import apiClient from "../api/apiClient";
import { Notification } from "../types/Notification";

export const getNotifications = async () => {
	return await apiClient.get<{
		data: Notification[];
	}>("/notification");
};
export const getUnreadCount = async () => {
	return await apiClient.get("/notification/unread-count");
};

export const markAsRead = async (notificationId: string) => {
	return await apiClient.post(`/notification/${notificationId}/read`);
};

export const readAllNotifications = async () => {
	return await apiClient.post("/notification/read-all");
};
