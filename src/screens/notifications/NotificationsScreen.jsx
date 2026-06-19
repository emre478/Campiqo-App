import React, { useEffect, useState } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import { getNotifications } from "../../services/notificationService";

const NotificationsScreen = () => {
	const [notifications, setNotifications] = useState([]);
	useEffect(() => {
		loadNotifications();
	}, []);

	const loadNotifications = async () => {
		try {
			const response = await getNotifications();

			setNotifications(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bildirimler</Text>

			<FlatList
				data={notifications}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={[styles.card, !item.isRead && styles.unreadCard]}>
						<Text style={styles.cardTitle}>{item.title}</Text>

						<Text style={styles.message}>{item.message}</Text>
					</View>
				)}
			/>
		</View>
	);
};

export default NotificationsScreen;

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

	cardTitle: {
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 4,
	},

	message: {
		color: "#666",
	},
});
