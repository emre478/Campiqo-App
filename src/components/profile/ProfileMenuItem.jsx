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
		backgroundColor: "#fff",

		marginHorizontal: 20,
		marginTop: 14,

		paddingHorizontal: 20,
		paddingVertical: 20,

		borderRadius: 20,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",

		elevation: 3,

		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3,
		},
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
		fontWeight: "600",
		color: "#222",
	},

	arrow: {
		fontSize: 24,
		color: "#BDBDBD",
	},

	dangerCard: {
		backgroundColor: "#FFEBEE",
	},

	dangerText: {
		color: "#D32F2F",
		fontWeight: "700",
	},
});
