import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileMenuItem = ({ icon, title, onPress, danger = false }) => {
	return (
		<TouchableOpacity
			style={[styles.card, danger && styles.dangerCard]}
			onPress={onPress}
			activeOpacity={0.85}
		>
			<View style={styles.left}>
				<View
					style={[
						styles.iconContainer,
						danger && styles.dangerIconContainer,
					]}
				>
					<MaterialCommunityIcons
						name={icon}
						size={22}
						color={danger ? "#FF5A5A" : "#8DD69A"}
					/>
				</View>

				<Text style={[styles.title, danger && styles.dangerText]}>
					{title}
				</Text>
			</View>

			{!danger && (
				<MaterialCommunityIcons
					name="chevron-right"
					size={24}
					color="#91A091"
				/>
			)}
		</TouchableOpacity>
	);
};

export default ProfileMenuItem;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",
		marginHorizontal: 20,
		marginTop: 10,
		paddingHorizontal: 18,
		paddingVertical: 18,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: "#203A25",
	},

	left: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},

	iconContainer: {
		width: 44,
		height: 44,
		borderRadius: 14,
		backgroundColor: "#0D1C10",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 14,
	},

	dangerIconContainer: {
		backgroundColor: "rgba(255, 90, 90, 0.1)",
	},

	title: {
		fontSize: 17,
		fontWeight: "700",
		color: "#F4F7EF",
		flex: 1,
	},

	dangerCard: {
		backgroundColor: "transparent",
		borderColor: "#4D2C2C",
	},

	dangerText: {
		color: "#FF5A5A",
	},
});
