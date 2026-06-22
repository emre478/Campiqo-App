import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "../../theme/ThemeContext";

const HomeHeader = ({ isDark }) => {
	const unreadCount = useSelector((state) => state.notification.unreadCount);
	const { isDark, toggleTheme } = useTheme();
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.greeting}>Hoş Geldiniz 👋</Text>

				<Text style={styles.subtitle}>Doğayı Keşfet</Text>
			</View>
			<View style={styles.rightActions}>
				<TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
					<MaterialCommunityIcons
						name={isDark ? "weather-sunny" : "moon-waning-crescent"}
						size={24}
						color={isDark ? "#FFD54F" : "#444"}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => navigation.navigate("Notifications")}
				>
					<View style={styles.notificationContainer}>
						<MaterialCommunityIcons
							name="bell-outline"
							size={26}
							color={isDark ? "#F4F7EF" : "#222"}
						/>

						{unreadCount > 0 && (
							<View style={styles.badge}>
								<Text style={styles.badgeText}>
									{unreadCount > 99 ? "99+" : unreadCount}
								</Text>
							</View>
						)}
					</View>
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
		paddingTop: 65,
	},

	greeting: {
		fontSize: 32,
		fontWeight: "900",
		color: "#1c1c1c",
		color: isDark ? "#F4F7EF" : "#1C1C1C",
	},
	subtitle: {
		fontSize: 14,
		color: "#111311",
		marginTop: 6,
		color: isDark ? "#AEBDAE" : "#666",
	},
	notificationContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation: 3,
		backgroundColor: isDark ? "#132617" : "#FFFFFF",
	},

	badge: {
		position: "absolute",
		top: -6,
		right: -8,

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
	themeButton: {
		width: 48,
		height: 48,
		borderRadius: 24,

		backgroundColor: "#fff",

		alignItems: "center",
		justifyContent: "center",

		marginRight: 12,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3,
		},

		elevation: 3,
	},
	rightActions: {
		flexDirection: "row",
		alignItems: "center",
	},
});
