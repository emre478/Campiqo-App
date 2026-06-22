import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProfileMenuItem = ({ icon, title, onPress, danger = false }) => {
	return (
		<TouchableOpacity
			style={[styles.card, danger && styles.dangerCard]}
			onPress={onPress}
		>
			<View style={styles.left}>
				<Text style={styles.icon}>{icon}</Text>

				<Text style={[styles.title, danger && styles.dangerText]}>
					{title}
				</Text>
			</View>

			{!danger && <Text style={styles.arrow}>›</Text>}
		</TouchableOpacity>
	);
};

export default ProfileMenuItem;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",

		marginHorizontal: 20,
		marginTop: 14,

		paddingHorizontal: 18,
		paddingVertical: 18,

		borderRadius: 20,

		flexDirection: "row",
		alignItems: "center",

		borderWidth: 1,
		borderColor: "#203A25",
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 14,

		backgroundColor: "#1B3120",

		alignItems: "center",
		justifyContent: "center",

		marginRight: 14,
	},
	arrow: {
		color: "#91A091",
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
	},

	icon: {
		fontSize: 20,
		marginRight: 12,
	},

	title: {
		fontSize: 17,
		fontWeight: "700",
		color: "#F4F7EF",
	},

	arrow: {
		fontSize: 24,
		color: "#91A091",
	},

	dangerCard: {
		backgroundColor: "transparent",
		borderColor: "#4D2C2C",
	},

	dangerText: {
		color: "#FF5A5A",
	},
});
