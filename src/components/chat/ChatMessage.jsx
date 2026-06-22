import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SERVER_URL } from "../../constants/apiConstants";
import { formatMessageTime } from "../../utils/dateUtils";

const resolveAvatarUri = (profileImageUrl, userFullName) => {
	if (!profileImageUrl) {
		return `https://ui-avatars.com/api/?name=${encodeURIComponent(userFullName || "U")}&background=132617&color=8DD69A`;
	}

	if (
		profileImageUrl.startsWith("http") ||
		profileImageUrl.startsWith("file")
	) {
		return profileImageUrl;
	}

	return `${SERVER_URL}${profileImageUrl}`;
};

const ChatMessage = ({ message, isMyMessage }) => {
	const avatarUri = resolveAvatarUri(
		message.profileImageUrl,
		message.userFullName
	);

	return (
		<View style={[styles.row, isMyMessage ? styles.myRow : styles.otherRow]}>
			{!isMyMessage && (
				<Image source={{ uri: avatarUri }} style={styles.avatar} />
			)}

			<View
				style={[
					styles.bubble,
					isMyMessage ? styles.myBubble : styles.otherBubble,
				]}
			>
				{!isMyMessage && (
					<Text style={styles.userName}>{message.userFullName}</Text>
				)}

				<Text
					style={[
						styles.messageText,
						isMyMessage ? styles.myMessageText : styles.otherMessageText,
					]}
				>
					{message.message}
				</Text>

				<View style={styles.timeRow}>
					<MaterialCommunityIcons
						name="clock-outline"
						size={11}
						color={isMyMessage ? "#C8E6C9" : "#91A091"}
					/>
					<Text
						style={[
							styles.time,
							isMyMessage ? styles.myTime : styles.otherTime,
						]}
					>
						{formatMessageTime(message.createdAt)}
					</Text>
				</View>
			</View>

			{isMyMessage && (
				<View style={styles.myAvatar}>
					<MaterialCommunityIcons
						name="account"
						size={18}
						color="#8DD69A"
					/>
				</View>
			)}
		</View>
	);
};

export default ChatMessage;

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginBottom: 14,
		gap: 8,
	},

	myRow: {
		justifyContent: "flex-end",
	},

	otherRow: {
		justifyContent: "flex-start",
	},

	avatar: {
		width: 34,
		height: 34,
		borderRadius: 17,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	myAvatar: {
		width: 34,
		height: 34,
		borderRadius: 17,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
	},

	bubble: {
		maxWidth: "78%",
		paddingHorizontal: 14,
		paddingVertical: 12,
		borderRadius: 20,
	},

	myBubble: {
		backgroundColor: "#2E7D32",
		borderBottomRightRadius: 6,
	},

	otherBubble: {
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		borderBottomLeftRadius: 6,
	},

	userName: {
		fontWeight: "800",
		marginBottom: 4,
		fontSize: 12,
		color: "#8DD69A",
	},

	messageText: {
		fontSize: 15,
		lineHeight: 22,
	},

	myMessageText: {
		color: "#F4F7EF",
	},

	otherMessageText: {
		color: "#C5CEC4",
	},

	timeRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginTop: 8,
		alignSelf: "flex-end",
	},

	time: {
		fontSize: 11,
		fontWeight: "600",
	},

	myTime: {
		color: "#C8E6C9",
	},

	otherTime: {
		color: "#91A091",
	},
});
