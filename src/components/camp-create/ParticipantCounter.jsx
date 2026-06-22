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

			<View style={styles.valueBox}>
				<Text style={styles.value}>{value}</Text>
				<Text style={styles.label}>kişi</Text>
			</View>

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
		marginTop: 4,
	},

	button: {
		width: 46,
		height: 46,
		borderRadius: 23,
		backgroundColor: "#4F8F5F",
		alignItems: "center",
		justifyContent: "center",
	},

	symbol: {
		color: "#fff",
		fontSize: 25,
		fontWeight: "800",
	},

	valueBox: {
		minWidth: 90,
		alignItems: "center",
	},

	value: {
		fontSize: 26,
		fontWeight: "900",
		color: "#F4F7EF",
	},

	label: {
		fontSize: 12,
		color: "#91A091",
		marginTop: 2,
	},
});
