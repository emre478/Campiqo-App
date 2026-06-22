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
			activeOpacity={0.85}
			style={[
				styles.card,
				!notification.isRead && styles.unreadCard,
			]}
		>
			<View style={styles.content}>
				<View
					style={[
						styles.iconContainer,
						{ backgroundColor: `${config.color}18` },
					]}
				>
					<MaterialCommunityIcons
						name={config.icon}
						size={22}
						color={config.color}
					/>
				</View>

				<View style={styles.textContainer}>
					<View style={styles.titleRow}>
						<Text
							style={[
								styles.title,
								!notification.isRead && styles.unreadTitle,
							]}
						>
							{notification.title}
						</Text>

						{!notification.isRead && <View style={styles.unreadDot} />}
					</View>

					<Text style={styles.message}>{notification.message}</Text>

					<View style={styles.timeRow}>
						<MaterialCommunityIcons
							name="clock-outline"
							size={12}
							color="#91A091"
						/>
						<Text style={styles.time}>
							{getTimeAgo(notification.createdAt)}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default NotificationCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",
		padding: 16,
		borderRadius: 20,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	unreadCard: {
		borderColor: "#2E7D32",
		backgroundColor: "#0F2415",
	},

	content: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 12,
	},

	iconContainer: {
		width: 44,
		height: 44,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
	},

	textContainer: {
		flex: 1,
	},

	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 8,
		marginBottom: 4,
	},

	title: {
		flex: 1,
		fontSize: 15,
		fontWeight: "700",
		color: "#C5CEC4",
	},

	unreadTitle: {
		color: "#F4F7EF",
		fontWeight: "800",
	},

	unreadDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#8DD69A",
	},

	message: {
		fontSize: 14,
		lineHeight: 21,
		color: "#91A091",
	},

	timeRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginTop: 10,
	},

	time: {
		fontSize: 12,
		color: "#91A091",
		fontWeight: "600",
	},
});
