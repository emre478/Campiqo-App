import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CommentCard = ({ comment, onDelete, onUserPress }) => {
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
		backgroundColor: "#132617",

		borderRadius: 18,

		padding: 16,

		marginBottom: 12,

		borderWidth: 1,
		borderColor: "#203A25",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",

		marginBottom: 10,
	},
	name: {
		fontWeight: "800",
		fontSize: 15,
		color: "#F4F7EF",
	},
	content: {
		fontSize: 14,
		lineHeight: 24,

		color: "#C5CEC4",

		marginBottom: 12,
	},
	date: {
		fontSize: 12,
		color: "#91A091",
	},
	deleteText: {
		color: "#FF8A80",
		fontWeight: "700",
	},
});
