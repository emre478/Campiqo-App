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
				placeholder="Yorum yaz..."
				value={value}
				onChangeText={onChangeText}
			/>

			<TouchableOpacity style={styles.button} onPress={onSubmit}>
				<Text style={styles.buttonText}>Gönder</Text>
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
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 14,
		marginBottom: 10,
	},

	button: {
		backgroundColor: "#2E7D32",
		padding: 14,
		borderRadius: 14,
		alignItems: "center",
	},

	buttonText: {
		color: "#fff",
		fontWeight: "700",
	},
});
