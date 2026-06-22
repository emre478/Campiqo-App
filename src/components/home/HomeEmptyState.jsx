import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeEmptyState = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.icon}>🏕️</Text>

			<Text style={styles.title}>Kamp Bulunamadı</Text>

			<Text style={styles.description}>
				Bu kategoriye ait kamp bulunmuyor.
			</Text>
		</View>
	);
};

export default HomeEmptyState;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",

		paddingVertical: 40,
		paddingHorizontal: 30,
	},

	icon: {
		fontSize: 50,
		marginBottom: 12,
	},

	title: {
		fontSize: 22,
		fontWeight: "800",
		color: "#222",
	},

	description: {
		marginTop: 8,
		textAlign: "center",
		color: "#777",
		fontSize: 14,
		lineHeight: 22,
	},
});
