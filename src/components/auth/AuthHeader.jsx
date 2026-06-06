import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text } from "react-native";

const AuthHeader = () => {
	return (
		<LinearGradient colors={["#1B5E20", "#4CAF50"]} style={styles.container}>
			<MaterialCommunityIcons name="tent" size={52} color="#fff" style={styles.logoIcon} />
			<Text style={styles.logo}>Campiqo</Text>

			<Text style={styles.subtitle}>Doğayı Keşfet</Text>
		</LinearGradient>
	);
};

export default AuthHeader;

const styles = StyleSheet.create({
	container: {
		flex: 0.42,
		backgroundColor: "#2E7D32",
		justifyContent: "center",
		alignItems: "center",
	},

	logo: {
		color: "#fff",
		fontSize: 48,
		fontWeight: "800",
	},

	subtitle: {
		color: "#fff",
		marginTop: 10,
		fontSize: 18,
		opacity: 0.95,
	},
	logoIcon: {
		marginBottom: 0,
	},
});
