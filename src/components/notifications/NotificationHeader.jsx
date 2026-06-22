import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NotificationHeader = ({ navigation, unreadCount, onReadAll }) => {
	return (
		<View style={styles.wrapper}>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => navigation.goBack()}
				activeOpacity={0.85}
			>
				<MaterialCommunityIcons
					name="arrow-left"
					size={22}
					color="#F4F7EF"
				/>
			</TouchableOpacity>

			<View style={styles.header}>
				<View style={styles.headerText}>
					<Text style={styles.title}>Bildirimler</Text>
					<Text style={styles.subtitle}>
						{unreadCount > 0
							? `${unreadCount} okunmamış bildirim`
							: "Tüm bildirimler okundu"}
					</Text>
				</View>

				<View style={styles.headerIcon}>
					<MaterialCommunityIcons
						name="bell"
						size={24}
						color="#8DD69A"
					/>
					{unreadCount > 0 && (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>
								{unreadCount > 99 ? "99+" : unreadCount}
							</Text>
						</View>
					)}
				</View>
			</View>

			{unreadCount > 0 && (
				<TouchableOpacity
					style={styles.readAllButton}
					onPress={onReadAll}
					activeOpacity={0.85}
				>
					<MaterialCommunityIcons
						name="check-all"
						size={18}
						color="#8DD69A"
					/>
					<Text style={styles.readAllText}>Tümünü Okundu Yap</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default NotificationHeader;

const styles = StyleSheet.create({
	wrapper: {
		paddingTop: 8,
		marginBottom: 16,
	},

	backButton: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	headerText: {
		flex: 1,
		paddingRight: 12,
	},

	title: {
		fontSize: 28,
		fontWeight: "900",
		color: "#F4F7EF",
		letterSpacing: -0.5,
	},

	subtitle: {
		fontSize: 14,
		color: "#91A091",
		marginTop: 4,
		fontWeight: "600",
	},

	headerIcon: {
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
	},

	badge: {
		position: "absolute",
		top: -2,
		right: -2,
		minWidth: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: "#E53935",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 4,
	},

	badgeText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "700",
	},

	readAllButton: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		gap: 6,
		marginTop: 14,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 18,
	},

	readAllText: {
		fontSize: 13,
		fontWeight: "700",
		color: "#8DD69A",
	},
});
