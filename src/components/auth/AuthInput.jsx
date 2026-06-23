import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AuthInput = ({
	icon,
	label,
	value,
	onChangeText,
	secureTextEntry = false,
	keyboardType = "default",
	autoCapitalize = "sentences",
}) => {
	return (
		<View style={styles.wrap}>
			<Text style={styles.label}>{label}</Text>

			<View style={styles.inputWrap}>
				<MaterialCommunityIcons
					name={icon}
					size={20}
					color="#6DA878"
				/>

				<TextInput
					value={value}
					onChangeText={onChangeText}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType}
					autoCapitalize={autoCapitalize}
					placeholderTextColor="#5A6F5E"
					style={styles.input}
					placeholder={label}
				/>
			</View>
		</View>
	);
};

export default AuthInput;

const styles = StyleSheet.create({
	wrap: {
		marginBottom: 14,
	},

	label: {
		fontSize: 13,
		fontWeight: "700",
		color: "#91A091",
		marginBottom: 8,
		marginLeft: 4,
	},

	inputWrap: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#0D1C10",
		borderRadius: 18,
		borderWidth: 1,
		borderColor: "#203A25",
		paddingHorizontal: 14,
		gap: 10,
	},

	input: {
		flex: 1,
		paddingVertical: 15,
		fontSize: 15,
		color: "#F4F7EF",
	},
});
