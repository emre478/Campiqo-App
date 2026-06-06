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
		marginTop: -70,
		borderRadius: 24,
		elevation: 10,
		paddingVertical: 20,
		paddingHorizontal: 10,
	},
});
