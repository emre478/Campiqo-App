import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CampJoinRequestCard = ({ request, onApprove, onReject }) => {
	return (
		<View style={styles.card}>
			<Text style={styles.name}>👤 {request.fullName}</Text>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.approveButton}
					onPress={() => onApprove(request.id)}
				>
					<Text style={styles.buttonText}>Kabul Et</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.rejectButton}
					onPress={() => onReject(request.id)}
				>
					<Text style={styles.buttonText}>Reddet</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CampJoinRequestCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 16,
		marginBottom: 12,

		elevation: 3,

		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 6,
		shadowOffset: {
			width: 0,
			height: 2,
		},
	},

	name: {
		fontSize: 16,
		fontWeight: "600",
		color: "#222",
		marginBottom: 12,
	},

	buttonContainer: {
		flexDirection: "row",
		gap: 10,
	},

	approveButton: {
		flex: 1,
		backgroundColor: "#2E7D32",
		paddingVertical: 10,
		borderRadius: 10,
		alignItems: "center",
	},

	rejectButton: {
		flex: 1,
		backgroundColor: "#D32F2F",
		paddingVertical: 10,
		borderRadius: 10,
		alignItems: "center",
	},

	buttonText: {
		color: "#fff",
		fontWeight: "700",
	},
});
