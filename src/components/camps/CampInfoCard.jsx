import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CampInfoCard = ({ camp, categoryMap }) => {
	return (
		<View style={styles.infoCard}>
			<Text style={styles.sectionTitle}>Kategori</Text>

			<Text style={styles.sectionValue}>
				{categoryMap[camp.categoryName] ||
					camp.categoryName ||
					camp.category}
			</Text>

			<Text style={styles.sectionTitle}>Oluşturan</Text>

			<Text style={styles.sectionValue}>{camp.ownerName}</Text>

			<Text style={styles.sectionTitle}>Açıklama</Text>

			<Text style={styles.description}>{camp.description}</Text>
		</View>
	);
};

export default CampInfoCard;

const styles = StyleSheet.create({
	infoCard: {
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 20,
		marginTop: 20,

		elevation: 4,

		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#222",
		marginBottom: 6,
		marginTop: 16,
	},

	sectionValue: {
		fontSize: 16,
		color: "#666",
	},

	description: {
		fontSize: 16,
		lineHeight: 24,
		color: "#555",
	},
});
