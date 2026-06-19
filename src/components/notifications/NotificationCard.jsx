import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getNotificationConfig } from "../../constants/notificationConstants";
import { getTimeAgo } from "../../utils/dateUtils";

const NotificationCard = ({ notification, onPress }) => {
	const config = getNotificationConfig(notification.type);
	return (
		<TouchableOpacity
			onPress={() => onPress(notification)}
			style={[
				styles.card,
				notification.isRead ? styles.readCard : styles.unreadCard,
			]}
		>
			<View style={styles.content}>
				<View style={styles.iconContainer}>
					<MaterialCommunityIcons
						name={config.icon}
						size={24}
						color={config.color}
					/>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.title}>{notification.title}</Text>

					<Text style={styles.message}>{notification.message}</Text>

					<Text style={styles.time}>
						{getTimeAgo(notification.createdAt)}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default NotificationCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 16,
		marginBottom: 12,
	},

	unreadCard: {
		borderLeftWidth: 4,
		borderLeftColor: "#2E7D32",
	},

	readCard: {
		opacity: 0.7,
	},

	title: {
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 4,
	},

	message: {
		color: "#666",
	},
	time: {
		marginTop: 10,
		fontSize: 12,
		color: "#999",
	},
	content: {
		flexDirection: "row",
		alignItems: "flex-start",
	},

	iconContainer: {
		width: 40,
		alignItems: "center",
		paddingTop: 2,
	},

	textContainer: {
		flex: 1,
	},
});
