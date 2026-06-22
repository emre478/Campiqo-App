import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const CampActionButton = ({ buttonConfig, onPress }) => {
	return (
		<Button
			mode="contained"
			buttonColor={buttonConfig.color}
			textColor={buttonConfig.textColor}
			contentStyle={styles.content}
			labelStyle={styles.label}
			style={[styles.button, buttonConfig.disabled && styles.disabledButton]}
			onPress={() => {
				if (!buttonConfig.disabled) {
					onPress();
				}
			}}
		>
			{buttonConfig.text}
		</Button>
	);
};

export default CampActionButton;

const styles = StyleSheet.create({
	button: {
		borderRadius: 18,
		overflow: "hidden",
	},

	content: {
		height: 58,
	},

	label: {
		fontSize: 16,
		fontWeight: "800",
		letterSpacing: 0.3,
	},

	disabledButton: {
		opacity: 0.75,
	},
});
