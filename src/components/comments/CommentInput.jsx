import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const CommentInput = ({ value, onChangeText, onSubmit }) => {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Deneyimini paylaş..."
				placeholderTextColor="#7F907F"
				value={value}
				onChangeText={onChangeText}
				multiline
			/>

			<TouchableOpacity style={styles.button} onPress={onSubmit}>
				<Text style={styles.buttonText}>Yorumu Gönder</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CommentInput;

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	input: {
		backgroundColor: "#132617",

		borderRadius: 18,

		paddingHorizontal: 16,
		paddingVertical: 14,

		minHeight: 90,

		color: "#F4F7EF",

		borderWidth: 1,
		borderColor: "#203A25",

		textAlignVertical: "top",

		marginBottom: 12,
	},
	button: {
		backgroundColor: "#4F8F5F",

		paddingVertical: 14,

		borderRadius: 16,

		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "800",
		fontSize: 15,
	},
});
