import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CAMP_CATEGORIES } from "../../constants/campCategories";

const CategorySelector = ({ selectedCategory, onSelect }) => {
	return (
		<View style={styles.container}>
			{CAMP_CATEGORIES.map((item) => (
				<TouchableOpacity
					key={item.id}
					style={[
						styles.card,
						selectedCategory === item.id && styles.selectedCard,
					]}
					onPress={() => onSelect(item.id)}
				>
					<Text style={styles.icon}>{item.icon}</Text>

					<Text style={styles.name}>{item.name}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default CategorySelector;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},

	card: {
		width: "48%",
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 16,
		marginBottom: 12,
		alignItems: "center",
	},

	selectedCard: {
		borderWidth: 2,
		borderColor: "#2E7D32",
	},

	icon: {
		fontSize: 28,
	},

	name: {
		marginTop: 8,
		fontWeight: "600",
	},
});
