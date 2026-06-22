import React from "react";
import { StyleSheet, Text, View } from "react-native";

import CategorySelector from "./CategorySelector";
import ParticipantCounter from "./ParticipantCounter";

const CampSettingsSection = ({
	category,
	setCategory,
	maxParticipantCount,
	setMaxParticipantCount,
}) => {
	return (
		<View style={styles.sectionCard}>
			<Text style={styles.sectionTitle}>Kategori Seç</Text>

			<CategorySelector selectedCategory={category} onSelect={setCategory} />

			<Text style={[styles.sectionTitle, { marginTop: 22 }]}>
				Maksimum Katılımcı
			</Text>

			<ParticipantCounter
				value={maxParticipantCount}
				onChange={setMaxParticipantCount}
			/>
		</View>
	);
};

export default CampSettingsSection;

const styles = StyleSheet.create({
	sectionCard: {
		backgroundColor: "#0D1C10",
		borderRadius: 24,
		padding: 18,
		marginBottom: 18,
		borderWidth: 1,
		borderColor: "#1C3320",
	},

	sectionTitle: {
		fontSize: 20,
		fontWeight: "800",
		color: "#F4F7EF",
		marginBottom: 14,
	},
});
