import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const NotificationCard = ({ notification, onPress }) => {
	return (
		<TouchableOpacity
			onPress={() => onPress(notification)}
			style={[
				styles.card,
				notification.isRead ? styles.readCard : styles.unreadCard,
			]}
		>
			<Text style={styles.title}>{notification.title}</Text>

			<Text style={styles.message}>{notification.message}</Text>
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
});
