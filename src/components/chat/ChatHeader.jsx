import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ChatHeader = ({ campTitle, participantCount, maxParticipantCount }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>🏕 {campTitle}</Text>

			<Text style={styles.subtitle}>
				{participantCount}/{maxParticipantCount} Katılımcı
			</Text>
		</View>
	);
};

export default ChatHeader;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		paddingVertical: 14,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},

	title: {
		fontSize: 18,
		fontWeight: "700",
		color: "#222",
	},

	subtitle: {
		marginTop: 2,
		fontSize: 13,
		color: "#777",
	},
});
