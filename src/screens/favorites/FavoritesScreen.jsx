import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FavoritesScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Favorilerim
			</Text>
		</View>
	);
};

export default FavoritesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
});