import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
			<View style={styles.sectionHeader}>
				<MaterialCommunityIcons
					name="shape-outline"
					size={20}
					color="#6DA878"
				/>
				<Text style={styles.sectionTitle}>Kategori Seç</Text>
			</View>

			<CategorySelector selectedCategory={category} onSelect={setCategory} />

			<View style={[styles.sectionHeader, styles.sectionHeaderSpaced]}>
				<MaterialCommunityIcons
					name="account-group-outline"
					size={20}
					color="#6DA878"
				/>
				<Text style={styles.sectionTitle}>Maksimum Katılımcı</Text>
			</View>

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
		backgroundColor: "#132617",
		borderRadius: 24,
		padding: 18,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 14,
	},

	sectionHeaderSpaced: {
		marginTop: 20,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",
	},
});
