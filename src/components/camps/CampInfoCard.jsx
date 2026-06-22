import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CampInfoCard = ({ camp }) => {
	return (
		<View style={styles.infoCard}>
			<View style={styles.sectionHeader}>
				<MaterialCommunityIcons
					name="text-box-outline"
					size={20}
					color="#6DA878"
				/>
				<Text style={styles.mainTitle}>Hakkında</Text>
			</View>

			<Text style={styles.description}>{camp.description}</Text>
		</View>
	);
};

export default CampInfoCard;

const styles = StyleSheet.create({
	infoCard: {
		backgroundColor: "#132617",
		borderRadius: 24,
		padding: 18,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 14,
	},

	mainTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	description: {
		fontSize: 15,
		lineHeight: 26,
		color: "#C5CEC4",
	},
});
