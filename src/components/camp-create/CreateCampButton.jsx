import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CreateCampButton = ({ onPress }) => {
	return (
		<TouchableOpacity
			style={styles.button}
			onPress={onPress}
			activeOpacity={0.85}
		>
			<MaterialCommunityIcons
				name="check-circle-outline"
				size={22}
				color="#F4F7EF"
			/>
			<Text style={styles.label}>Kampı Oluştur</Text>
		</TouchableOpacity>
	);
};

export default CreateCampButton;

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#2E7D32",
		borderRadius: 20,
		height: 56,
		marginTop: 8,
	},

	label: {
		fontSize: 16,
		fontWeight: "800",
		color: "#F4F7EF",
		letterSpacing: 0.3,
	},
});
