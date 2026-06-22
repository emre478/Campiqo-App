import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const HomeHeader = () => {
	const unreadCount = useSelector((state) => state.notification.unreadCount);
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View>
				<View style={styles.greetingRow}>
					<Text style={styles.greeting}>Hoş Geldiniz</Text>
					<MaterialCommunityIcons
						name="hand-wave"
						size={26}
						color="#FFD34D"
					/>
				</View>

				<Text style={styles.subtitle}>Doğayı Keşfet</Text>
			</View>

			<View style={styles.rightActions}>
				<TouchableOpacity
					style={styles.actionButton}
					onPress={() => navigation.navigate("Notifications")}
					activeOpacity={0.85}
				>
					<MaterialCommunityIcons
						name="bell-outline"
						size={24}
						color="#F4F7EF"
					/>

					{unreadCount > 0 && (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>
								{unreadCount > 99 ? "99+" : unreadCount}
							</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HomeHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 12,
	},

	greetingRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	greeting: {
		fontSize: 30,
		fontWeight: "900",
		color: "#F4F7EF",
		letterSpacing: -0.5,
	},

	subtitle: {
		fontSize: 14,
		color: "#91A091",
		marginTop: 6,
		fontWeight: "600",
	},

	rightActions: {
		flexDirection: "row",
		alignItems: "center",
	},

	actionButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		justifyContent: "center",
		alignItems: "center",
	},

	badge: {
		position: "absolute",
		top: -4,
		right: -4,
		minWidth: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: "#E53935",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 4,
	},

	badgeText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "700",
	},
});
