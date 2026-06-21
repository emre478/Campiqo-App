import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CommentCard = ({ comment, onDelete, onUserpress }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => onUserPress(comment.userId)}>
					<Text style={styles.name}>{comment.fullName}</Text>
				</TouchableOpacity>

				{comment.isOwner && (
					<TouchableOpacity onPress={() => onDelete(comment.id)}>
						<Text style={styles.deleteText}>Sil</Text>
					</TouchableOpacity>
				)}
			</View>

			<Text style={styles.content}>{comment.content}</Text>

			<Text style={styles.date}>
				{new Date(comment.createdAt).toLocaleDateString("tr-TR")}
			</Text>
		</View>
	);
};

export default CommentCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 14,
		marginBottom: 12,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},

	name: {
		fontWeight: "700",
		fontSize: 15,
	},

	content: {
		fontSize: 15,
		color: "#333",
		marginBottom: 8,
	},

	date: {
		fontSize: 12,
		color: "#888",
	},

	deleteText: {
		color: "#D32F2F",
		fontWeight: "600",
	},
});
