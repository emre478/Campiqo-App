import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AuthCard = ({ title, subtitle, children }) => {
	return (
		<View style={styles.card}>
			{title ? <Text style={styles.title}>{title}</Text> : null}
			{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
			{children}
		</View>
	);
};

export default AuthCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",
		borderRadius: 24,
		padding: 20,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	title: {
		fontSize: 24,
		fontWeight: "900",
		color: "#F4F7EF",
		marginBottom: 6,
	},

	subtitle: {
		fontSize: 14,
		color: "#91A091",
		fontWeight: "600",
		marginBottom: 20,
	},
});
