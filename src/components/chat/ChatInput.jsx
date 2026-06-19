import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChatInput = ({ message, onChangeText, onSend }) => {
	return (
		<View style={styles.container}>
			<TextInput
				value={message}
				onChangeText={onChangeText}
				placeholder="Mesaj yaz..."
				style={styles.input}
				multiline
			/>

			<TouchableOpacity onPress={onSend} style={styles.sendButton}>
				<MaterialCommunityIcons name="send" size={22} color="#fff" />
			</TouchableOpacity>
		</View>
	);
};

export default ChatInput;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "flex-end",
		padding: 12,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#eee",
	},

	input: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 10,
		maxHeight: 100,
	},

	sendButton: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "#2E7D32",

		alignItems: "center",
		justifyContent: "center",

		marginLeft: 8,
	},
});
