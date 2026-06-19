import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const HomeHeader = ({}) => {
	const unreadCount = useSelector((state) => state.notification.unreadCount);
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.greeting}>Merhaba Emre 👋</Text>

				<Text style={styles.subtitle}>
					Bugün yeni bir kamp keşfetmeye ne dersin?
				</Text>
			</View>

			<TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
				<View style={styles.notificationContainer}>
					<MaterialCommunityIcons
						name="bell-outline"
						size={28}
						color="#2E7D32"
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
	);
};

export default HomeHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 60,
	},

	greeting: {
		fontSize: 26,
		fontWeight: "700",
		color: "#222",
	},

	subtitle: {
		fontSize: 14,
		color: "#777",
		marginTop: 4,
	},
	notificationContainer: {
		position: "relative",
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
});
