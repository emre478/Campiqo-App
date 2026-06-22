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
					<Text
						style={[
							styles.name,
							selectedCategory === item.id && styles.selectedName,
						]}
					>
						{item.name}
					</Text>
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
		backgroundColor: "#132617",
		padding: 16,
		borderRadius: 18,
		marginBottom: 12,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#203A25",
	},

	selectedCard: {
		backgroundColor: "#1B3A22",
		borderColor: "#5FA46B",
	},

	icon: {
		fontSize: 28,
	},

	name: {
		marginTop: 8,
		fontWeight: "700",
		color: "#C5CEC4",
	},

	selectedName: {
		color: "#F4F7EF",
	},
});
