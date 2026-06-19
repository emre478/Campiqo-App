import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
	getNotifications,
	markAsRead,
	readAllNotifications,
} from "../services/notificationService";

import { setUnreadCount } from "../redux/slices/notificationSlice";

import { Notification } from "../types/Notification";

export const useNotifications = () => {
	const dispatch = useDispatch();

	const [notifications, setNotifications] = useState<Notification[]>([]);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadNotifications();
	}, []);

	const loadNotifications = async () => {
		try {
			setLoading(true);

			const response = await getNotifications();

			setNotifications(response.data.data);

			const unreadCount = response.data.data.filter((x) => !x.isRead).length;

			dispatch(setUnreadCount(unreadCount));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleNotificationPress = async (notification: Notification) => {
		try {
			if (notification.isRead) return;

			await markAsRead(notification.id);

			setNotifications((prev) =>
				prev.map((item) =>
					item.id === notification.id
						? {
								...item,
								isRead: true,
							}
						: item
				)
			);

			dispatch(
				setUnreadCount(
					notifications.filter(
						(x) => !x.isRead && x.id !== notification.id
					).length
				)
			);
		} catch (error) {
			console.log(error);
		}
	};
	const handleReadAll = async () => {
		try {
			await readAllNotifications();

			setNotifications((prev) =>
				prev.map((item) => ({
					...item,
					isRead: true,
				}))
			);

			dispatch(setUnreadCount(0));
		} catch (error) {
			console.log(error);
		}
	};
	return {
		notifications,
		loading,
		loadNotifications,
		handleNotificationPress,
        handleReadAll,
	};
};
