import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CampJoinRequestCard = ({ request, onApprove, onReject }) => {
	return (
		<View style={styles.card}>
			<View style={styles.nameRow}>
				<View style={styles.avatar}>
					<MaterialCommunityIcons
						name="account"
						size={18}
						color="#8DD69A"
					/>
				</View>
				<Text style={styles.name}>{request.fullName}</Text>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.approveButton}
					onPress={() => onApprove(request.id)}
					activeOpacity={0.85}
				>
					<MaterialCommunityIcons
						name="check"
						size={18}
						color="#F4F7EF"
					/>
					<Text style={styles.buttonText}>Kabul Et</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.rejectButton}
					onPress={() => onReject(request.id)}
					activeOpacity={0.85}
				>
					<MaterialCommunityIcons
						name="close"
						size={18}
						color="#F4F7EF"
					/>
					<Text style={styles.buttonText}>Reddet</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CampJoinRequestCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",
		padding: 18,
		borderRadius: 20,
		marginBottom: 14,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	nameRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginBottom: 14,
	},

	avatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#0D1C10",
		alignItems: "center",
		justifyContent: "center",
	},

	name: {
		flex: 1,
		fontSize: 17,
		fontWeight: "700",
		color: "#F4F7EF",
	},

	buttonContainer: {
		flexDirection: "row",
		gap: 10,
	},

	approveButton: {
		flex: 1,
		backgroundColor: "#2E7D32",
		paddingVertical: 12,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		gap: 6,
	},

	rejectButton: {
		flex: 1,
		backgroundColor: "#8B2E2E",
		paddingVertical: 12,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		gap: 6,
	},

	buttonText: {
		color: "#F4F7EF",
		fontWeight: "800",
	},
});
