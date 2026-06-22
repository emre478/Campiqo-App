import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CAMP_CATEGORIES } from "../../constants/campCategories";

const CampInfoCard = ({ camp }) => {
	const selectedCategory = CAMP_CATEGORIES.find((x) => x.id === camp.category);

	return (
		<View style={styles.infoCard}>
			<Text style={styles.mainTitle}>Hakkında</Text>

			<View style={styles.infoRow}>
				<View style={styles.infoBox}>
					<Text style={styles.label}>Kategori</Text>

					<Text style={styles.value}>
						{selectedCategory?.icon} {selectedCategory?.name}
					</Text>
				</View>

				<View style={styles.infoBox}>
					<Text style={styles.label}>Oluşturan</Text>

					<Text style={styles.value}>👤 {camp.ownerName}</Text>
				</View>
			</View>

			<Text style={styles.descriptionTitle}>Açıklama</Text>

			<Text style={styles.description}>{camp.description}</Text>
		</View>
	);
};

export default CampInfoCard;

const styles = StyleSheet.create({
	infoCard: {
		marginTop: 20,
	},

	mainTitle: {
		fontSize: 22,
		fontWeight: "800",
		color: "#F4F7EF",
		marginBottom: 16,
	},

	infoRow: {
		flexDirection: "row",
		gap: 12,
	},

	infoBox: {
		flex: 1,

		backgroundColor: "#132617",

		borderRadius: 18,

		padding: 16,

		borderWidth: 1,
		borderColor: "#203A25",
	},

	label: {
		fontSize: 12,
		color: "#91A091",
		marginBottom: 8,
	},

	value: {
		fontSize: 15,
		fontWeight: "700",
		color: "#F4F7EF",
	},

	descriptionTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",

		marginTop: 24,
		marginBottom: 12,
	},

	description: {
		fontSize: 15,
		lineHeight: 26,
		color: "#C5CEC4",
	},
});
