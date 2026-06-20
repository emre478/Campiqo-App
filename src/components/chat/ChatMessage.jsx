import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { formatMessageTime } from "../../utils/dateUtils";

const ChatMessage = ({ message, isMyMessage }) => {
	return (
		<View style={[styles.row, isMyMessage ? styles.myRow : styles.otherRow]}>
			{!isMyMessage && (
				<Image
					source={{
						uri:
							message.profileImageUrl ||
							"https://ui-avatars.com/api/?name=" + message.userFullName,
					}}
					style={styles.avatar}
				/>
			)}

			<View
				style={[
					styles.container,
					isMyMessage ? styles.myContainer : styles.otherContainer,
				]}
			>
				<Text style={styles.userName}>{message.userFullName}</Text>

				<Text style={styles.message}>{message.message}</Text>

				<Text style={styles.time}>
					{formatMessageTime(message.createdAt)}
				</Text>
			</View>
		</View>
	);
};

export default ChatMessage;

const styles = StyleSheet.create({
	container: {
		maxWidth: "75%",
		padding: 12,
		borderRadius: 16,
		marginBottom: 12,
	},

	myContainer: {
		alignSelf: "flex-end",
		backgroundColor: "#DCF8C6",
	},

	otherContainer: {
		alignSelf: "flex-start",
		backgroundColor: "#FFFFFF",
	},

	userName: {
		fontWeight: "700",
		marginBottom: 4,
		fontSize: 12,
		color: "#555",
	},

	message: {
		fontSize: 15,
		color: "#222",
	},
	time: {
		marginTop: 6,
		fontSize: 11,
		color: "#777",
		alignSelf: "flex-end",
	},
	row: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginBottom: 12,
	},

	myRow: {
		justifyContent: "flex-end",
	},

	otherRow: {
		justifyContent: "flex-start",
	},

	avatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
		marginRight: 8,
	},
});
