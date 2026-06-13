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

			<Text
				style={[
					styles.sectionTitle,
					{
						marginTop: 20,
					},
				]}
			>
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
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 18,
		marginBottom: 18,

		elevation: 4,

		shadowColor: "#000",
		shadowOpacity: 0.06,
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
	},
});
