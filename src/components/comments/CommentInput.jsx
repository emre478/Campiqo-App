import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CommentInput = ({ value, onChangeText, onSubmit }) => {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Deneyimini paylaş..."
				placeholderTextColor="#91A091"
				value={value}
				onChangeText={onChangeText}
				multiline
			/>

			<TouchableOpacity
				style={styles.button}
				onPress={onSubmit}
				activeOpacity={0.85}
			>
				<MaterialCommunityIcons name="send" size={18} color="#F4F7EF" />
				<Text style={styles.buttonText}>Yorumu Gönder</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CommentInput;

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},

	input: {
		backgroundColor: "#132617",
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 14,
		minHeight: 96,
		color: "#F4F7EF",
		borderWidth: 1,
		borderColor: "#203A25",
		textAlignVertical: "top",
		marginBottom: 12,
		fontSize: 15,
		lineHeight: 22,
	},

	button: {
		backgroundColor: "#2E7D32",
		paddingVertical: 14,
		borderRadius: 18,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		gap: 8,
	},

	buttonText: {
		color: "#F4F7EF",
		fontWeight: "800",
		fontSize: 15,
	},
});
