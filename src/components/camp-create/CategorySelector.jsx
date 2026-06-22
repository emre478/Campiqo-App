import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CAMP_CATEGORIES } from "../../constants/campCategories";
import CategoryIcon from "../common/CategoryIcon";

const CategorySelector = ({ selectedCategory, onSelect }) => {
	return (
		<View style={styles.container}>
			{CAMP_CATEGORIES.map((item) => {
				const isSelected = selectedCategory === item.id;

				return (
					<TouchableOpacity
						key={item.id}
						style={[styles.card, isSelected && styles.selectedCard]}
						onPress={() => onSelect(item.id)}
						activeOpacity={0.85}
					>
						<CategoryIcon
							name={item.icon}
							size={28}
							color={isSelected ? "#F4F7EF" : "#8DD69A"}
						/>
						<Text
							style={[styles.name, isSelected && styles.selectedName]}
						>
							{item.name}
						</Text>
					</TouchableOpacity>
				);
			})}
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
		backgroundColor: "#0D1C10",
		paddingVertical: 16,
		paddingHorizontal: 12,
		borderRadius: 18,
		marginBottom: 12,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#203A25",
	},

	selectedCard: {
		backgroundColor: "#2E7D32",
		borderColor: "#2E7D32",
	},

	name: {
		marginTop: 8,
		fontWeight: "700",
		fontSize: 13,
		color: "#C5CEC4",
		textAlign: "center",
	},

	selectedName: {
		color: "#F4F7EF",
	},
});
