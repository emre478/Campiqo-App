import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const AuthCard = ({ children }) => {
	return (
		<Card style={styles.card}>
			<Card.Content>{children}</Card.Content>
		</Card>
	);
};

export default AuthCard;

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 20,
		marginTop: 40,
		borderRadius: 30,
		elevation: 12,

		backgroundColor: "rgba(255,255,255,0.97)",

		paddingVertical: 24,
		paddingHorizontal: 12,
	},
});
