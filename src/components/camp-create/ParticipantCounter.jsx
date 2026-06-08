import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ParticipantCounter = ({ value, onChange }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => value > 1 && onChange(value - 1)}
			>
				<Text style={styles.symbol}>-</Text>
			</TouchableOpacity>

			<Text style={styles.value}>{value}</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() => onChange(value + 1)}
			>
				<Text style={styles.symbol}>+</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ParticipantCounter;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},

	button: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#2E7D32",

		alignItems: "center",
		justifyContent: "center",
	},

	symbol: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "700",
	},

	value: {
		fontSize: 22,
		fontWeight: "700",
		marginHorizontal: 20,
	},
});
