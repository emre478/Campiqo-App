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
		backgroundColor: "#132617",
		padding: 18,
		borderRadius: 20,
		marginBottom: 14,

		borderWidth: 1,
		borderColor: "#203A25",
	},

	name: {
		fontSize: 17,
		fontWeight: "700",
		color: "#F4F7EF",
		marginBottom: 14,
	},

	buttonContainer: {
		flexDirection: "row",
		gap: 10,
	},

	approveButton: {
		flex: 1,
		backgroundColor: "#4F8F5F",
		paddingVertical: 12,
		borderRadius: 14,
		alignItems: "center",
	},

	rejectButton: {
		flex: 1,
		backgroundColor: "#8B2E2E",
		paddingVertical: 12,
		borderRadius: 14,
		alignItems: "center",
	},

	buttonText: {
		color: "#fff",
		fontWeight: "800",
	},
});
