import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AuthHeader = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.logo}>Campiqo</Text>

			<Text style={styles.subtitle}>Doğayı Keşfet</Text>
		</View>
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
});
