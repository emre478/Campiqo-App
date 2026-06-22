import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CampActionButton = ({ buttonConfig, onPress }) => {
	return (
		<TouchableOpacity
			activeOpacity={buttonConfig.disabled ? 1 : 0.85}
			style={[
				styles.button,
				{ backgroundColor: buttonConfig.color },
				buttonConfig.disabled && styles.disabledButton,
			]}
			onPress={() => {
				if (!buttonConfig.disabled) {
					onPress();
				}
			}}
		>
			<View style={styles.content}>
				{buttonConfig.icon ? (
					<MaterialCommunityIcons
						name={buttonConfig.icon}
						size={20}
						color={buttonConfig.textColor}
					/>
				) : null}
				<Text style={[styles.label, { color: buttonConfig.textColor }]}>
					{buttonConfig.text}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CampActionButton;

const styles = StyleSheet.create({
	button: {
		borderRadius: 20,
		height: 56,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
	},

	content: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	label: {
		fontSize: 16,
		fontWeight: "800",
		letterSpacing: 0.3,
	},

	disabledButton: {
		opacity: 0.85,
	},
});
