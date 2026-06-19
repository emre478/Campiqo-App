import React from "react";
import { StyleSheet, View } from "react-native";

import NotificationHeader from "../../components/notifications/NotificationHeader";
import NotificationList from "../../components/notifications/NotificationList";
import { useNotifications } from "../../hooks/useNotifications";

const NotificationsScreen = () => {
	const { notifications, handleNotificationPress, handleReadAll } =
		useNotifications();

	const unreadCount = notifications.filter((x) => !x.isRead).length;

	return (
		<View style={styles.container}>
			<NotificationHeader
				unreadCount={unreadCount}
				onReadAll={handleReadAll}
			/>

			<NotificationList
				notifications={notifications}
				onNotificationPress={handleNotificationPress}
			/>
		</View>
	);
};

export default NotificationsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		padding: 20,
	},
});
