import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NotificationHeader = ({ unreadCount, onReadAll }) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Bildirimler</Text>

				{unreadCount > 0 && (
					<Text style={styles.subtitle}>
						{unreadCount} okunmamış bildirim
					</Text>
				)}
			</View>

			{unreadCount > 0 && (
				<TouchableOpacity onPress={onReadAll}>
					<Text style={styles.readAllText}>Tümünü Okundu Yap</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default NotificationHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 18,
	},

	title: {
		fontSize: 28,
		fontWeight: "700",
		color: "#222",
	},

	subtitle: {
		fontSize: 13,
		color: "#777",
		marginTop: 4,
	},

	readAllText: {
		fontSize: 13,
		fontWeight: "700",
		color: "#2E7D32",
	},
});
