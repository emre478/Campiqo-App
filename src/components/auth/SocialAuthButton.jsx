import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SocialAuthButton = ({ icon, label, onPress, variant = "google" }) => {
	const isApple = variant === "apple";

	return (
		<TouchableOpacity
			style={[styles.button, isApple && styles.appleButton]}
			onPress={onPress}
			activeOpacity={0.85}
		>
			<MaterialCommunityIcons
				name={icon}
				size={22}
				color={isApple ? "#F4F7EF" : "#F4F7EF"}
			/>
			<Text style={styles.label}>{label}</Text>
		</TouchableOpacity>
	);
};

export default SocialAuthButton;

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		height: 52,
		borderRadius: 16,
		backgroundColor: "#0D1C10",
		borderWidth: 1,
		borderColor: "#203A25",
		marginBottom: 10,
	},

	appleButton: {
		backgroundColor: "#132617",
	},

	label: {
		fontSize: 15,
		fontWeight: "700",
		color: "#F4F7EF",
	},
});
