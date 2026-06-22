import React from "react";
import {
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import NotificationHeader from "../../components/notifications/NotificationHeader";
import NotificationList from "../../components/notifications/NotificationList";
import { useNotifications } from "../../hooks/useNotifications";

const NotificationsScreen = () => {
	const navigation = useNavigation();
	const { notifications, loading, handleNotificationPress, handleReadAll } =
		useNotifications();

	const unreadCount = notifications.filter((x) => !x.isRead).length;

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#8DD69A" />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<NotificationHeader
				navigation={navigation}
				unreadCount={unreadCount}
				onReadAll={handleReadAll}
			/>

			<NotificationList
				notifications={notifications}
				onNotificationPress={handleNotificationPress}
			/>
		</SafeAreaView>
	);
};

export default NotificationsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#07130B",
		paddingHorizontal: 20,
	},

	loadingContainer: {
		flex: 1,
		backgroundColor: "#07130B",
		justifyContent: "center",
		alignItems: "center",
	},
});
