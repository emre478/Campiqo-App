import React from "react";
import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChatInput = ({ message, onChangeText, onSend }) => {
	const canSend = message.trim().length > 0;

	return (
		<View style={styles.container}>
			<View style={styles.inputWrap}>
				<TextInput
					value={message}
					onChangeText={onChangeText}
					placeholder="Mesaj yaz..."
					placeholderTextColor="#91A091"
					style={styles.input}
					multiline
				/>
			</View>

			<TouchableOpacity
				onPress={onSend}
				style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
				activeOpacity={0.85}
				disabled={!canSend}
			>
				<MaterialCommunityIcons
					name="send"
					size={20}
					color="#F4F7EF"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default ChatInput;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "flex-end",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "#132617",
		borderTopWidth: 1,
		borderTopColor: "#203A25",
		gap: 10,
	},

	inputWrap: {
		flex: 1,
		backgroundColor: "#0D1C10",
		borderRadius: 22,
		borderWidth: 1,
		borderColor: "#203A25",
		paddingHorizontal: 4,
	},

	input: {
		paddingHorizontal: 14,
		paddingVertical: 12,
		maxHeight: 110,
		fontSize: 15,
		color: "#F4F7EF",
		lineHeight: 22,
	},

	sendButton: {
		width: 46,
		height: 46,
		borderRadius: 23,
		backgroundColor: "#2E7D32",
		alignItems: "center",
		justifyContent: "center",
	},

	sendButtonDisabled: {
		opacity: 0.45,
	},
});
