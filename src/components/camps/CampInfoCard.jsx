import React from "react";
import { Text, View } from "react-native";
import { CAMP_CATEGORIES } from "../../constants/campCategories";

const CampInfoCard = ({ camp }) => {
	const selectedCategory = CAMP_CATEGORIES.find((x) => x.id === camp.category);

	return (
		<View style={styles.infoCard}>
			<Text style={styles.sectionTitle}>Kategori</Text>

			<Text style={styles.sectionValue}>
				{selectedCategory?.icon} {selectedCategory?.name}
			</Text>

			<Text style={styles.sectionTitle}>Oluşturan</Text>

			<Text style={styles.sectionValue}>{camp.ownerName}</Text>

			<Text style={styles.sectionTitle}>Açıklama</Text>

			<Text style={styles.description}>{camp.description}</Text>
		</View>
	);
};

export default CampInfoCard;
