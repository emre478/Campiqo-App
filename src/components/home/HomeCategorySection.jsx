import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { CAMP_CATEGORIES } from "../../constants/campCategories";
import CategoryIcon from "../common/CategoryIcon";

const HomeCategorySection = ({ selectedCategory, onSelectCategory }) => {
	return (
		<View style={styles.container}>
			<View style={styles.sectionHeader}>
				<MaterialCommunityIcons
					name="shape-outline"
					size={20}
					color="#6DA878"
				/>
				<Text style={styles.sectionTitle}>Kategoriler</Text>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.list}
			>
				{CAMP_CATEGORIES.map((item) => {
					const isSelected = selectedCategory === item.id;

					return (
						<TouchableOpacity
							key={item.id}
							activeOpacity={0.85}
							onPress={() =>
								onSelectCategory(isSelected ? null : item.id)
							}
							style={[styles.card, isSelected && styles.selectedCard]}
						>
							<CategoryIcon
								name={item.icon}
								size={26}
								color={isSelected ? "#F4F7EF" : "#8DD69A"}
								style={styles.categoryIcon}
							/>

							<Text
								numberOfLines={2}
								style={[styles.title, isSelected && styles.selectedTitle]}
							>
								{item.name}
							</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default HomeCategorySection;

const styles = StyleSheet.create({
	container: {
		marginTop: 24,
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 14,
		paddingHorizontal: 20,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	list: {
		paddingLeft: 20,
		paddingRight: 10,
	},

	card: {
		width: 96,
		height: 96,
		backgroundColor: "#132617",
		borderRadius: 22,
		borderWidth: 1,
		borderColor: "#203A25",
		marginRight: 12,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 8,
	},

	selectedCard: {
		backgroundColor: "#2E7D32",
		borderColor: "#2E7D32",
	},

	categoryIcon: {
		marginBottom: 8,
	},

	title: {
		fontSize: 11,
		fontWeight: "800",
		color: "#C5CEC4",
		textAlign: "center",
	},

	selectedTitle: {
		color: "#F4F7EF",
	},
});
