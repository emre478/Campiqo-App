import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ParticipantCounter = ({ value, onChange }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.button, value <= 1 && styles.buttonDisabled]}
				onPress={() => value > 1 && onChange(value - 1)}
				activeOpacity={0.85}
			>
				<MaterialCommunityIcons name="minus" size={22} color="#F4F7EF" />
			</TouchableOpacity>

			<View style={styles.valueBox}>
				<Text style={styles.value}>{value}</Text>
				<Text style={styles.label}>kişi</Text>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => onChange(value + 1)}
				activeOpacity={0.85}
			>
				<MaterialCommunityIcons name="plus" size={22} color="#F4F7EF" />
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
		backgroundColor: "#0D1C10",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#203A25",
		paddingVertical: 14,
		paddingHorizontal: 20,
	},

	button: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "#2E7D32",
		alignItems: "center",
		justifyContent: "center",
	},

	buttonDisabled: {
		opacity: 0.45,
	},

	valueBox: {
		minWidth: 100,
		alignItems: "center",
	},

	value: {
		fontSize: 28,
		fontWeight: "900",
		color: "#8DD69A",
	},

	label: {
		fontSize: 12,
		color: "#91A091",
		marginTop: 2,
		fontWeight: "600",
	},
});
