import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CommentCard = ({ comment, onDelete, onUserPress }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.userRow}
					onPress={() => onUserPress(comment.userId)}
					activeOpacity={0.8}
				>
					<View style={styles.avatar}>
						<MaterialCommunityIcons
							name="account"
							size={18}
							color="#8DD69A"
						/>
					</View>
					<Text style={styles.name}>{comment.fullName}</Text>
				</TouchableOpacity>

				{comment.isOwner && (
					<TouchableOpacity
						onPress={() => onDelete(comment.id)}
						activeOpacity={0.8}
					>
						<Text style={styles.deleteText}>Sil</Text>
					</TouchableOpacity>
				)}
			</View>

			<Text style={styles.content}>{comment.content}</Text>

			<View style={styles.dateRow}>
				<MaterialCommunityIcons
					name="clock-outline"
					size={13}
					color="#91A091"
				/>
				<Text style={styles.date}>
					{new Date(comment.createdAt).toLocaleDateString("tr-TR")}
				</Text>
			</View>
		</View>
	);
};

export default CommentCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#132617",
		borderRadius: 20,
		padding: 16,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},

	userRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		flex: 1,
	},

	avatar: {
		width: 34,
		height: 34,
		borderRadius: 17,
		backgroundColor: "#0D1C10",
		alignItems: "center",
		justifyContent: "center",
	},

	name: {
		fontWeight: "800",
		fontSize: 15,
		color: "#F4F7EF",
		flex: 1,
	},

	content: {
		fontSize: 14,
		lineHeight: 24,
		color: "#C5CEC4",
		marginBottom: 12,
	},

	dateRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},

	date: {
		fontSize: 12,
		color: "#91A091",
		fontWeight: "600",
	},

	deleteText: {
		color: "#FF8A80",
		fontWeight: "700",
		fontSize: 13,
	},
});
