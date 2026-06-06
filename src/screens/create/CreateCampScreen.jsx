import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreateCampScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Kamp Oluştur</Text>
		</View>
	);
};

export default CreateCampScreen;

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