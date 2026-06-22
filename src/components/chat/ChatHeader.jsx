import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChatHeader = ({
	navigation,
	campTitle,
	participantCount,
	maxParticipantCount,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.topRow}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
					activeOpacity={0.85}
				>
					<MaterialCommunityIcons
						name="arrow-left"
						size={22}
						color="#F4F7EF"
					/>
				</TouchableOpacity>

				<View style={styles.headerIcon}>
					<MaterialCommunityIcons
						name="chat-outline"
						size={22}
						color="#8DD69A"
					/>
				</View>
			</View>

			<View style={styles.titleRow}>
				<MaterialCommunityIcons name="tent" size={20} color="#8DD69A" />
				<Text style={styles.title} numberOfLines={1}>
					{campTitle}
				</Text>
			</View>

			<View style={styles.subtitleRow}>
				<MaterialCommunityIcons
					name="account-group-outline"
					size={15}
					color="#6DA878"
				/>
				<Text style={styles.subtitle}>
					{participantCount}/{maxParticipantCount} Katılımcı
				</Text>
			</View>
		</View>
	);
};

export default ChatHeader;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#132617",
		paddingHorizontal: 20,
		paddingTop: 8,
		paddingBottom: 14,
		borderBottomWidth: 1,
		borderBottomColor: "#203A25",
	},

	topRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 12,
	},

	backButton: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#0D1C10",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
	},

	headerIcon: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#0D1C10",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
	},

	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	title: {
		flex: 1,
		fontSize: 20,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	subtitleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginTop: 6,
	},

	subtitle: {
		fontSize: 13,
		color: "#91A091",
		fontWeight: "600",
	},
});
