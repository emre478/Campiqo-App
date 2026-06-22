import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { CAMP_CATEGORIES } from "../../constants/campCategories";

const HomeCategorySection = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>Kategoriler</Text>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.list}
			>
				{CAMP_CATEGORIES.map((item) => (
					<TouchableOpacity
						key={item.id}
						style={styles.card}
						activeOpacity={0.85}
					>
						<Text style={styles.icon}>{item.icon}</Text>

						<Text style={styles.title} numberOfLines={2}>
							{item.name}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

export default HomeCategorySection;

const styles = StyleSheet.create({
	container: {
		marginTop: 24,
	},

	sectionTitle: {
		fontSize: 20,
		fontWeight: "900",
		color: "#1F1F1F",
		marginBottom: 14,
		paddingHorizontal: 20,
	},

	list: {
		paddingLeft: 20,
		paddingRight: 10,
	},

	card: {
		width: 100,
		height: 100,
		backgroundColor: "#FFFFFF",
		borderRadius: 22,
		marginRight: 14,

		alignItems: "center",
		justifyContent: "center",

		paddingHorizontal: 8,

		shadowColor: "#000",
		shadowOpacity: 0.06,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: 4,
		},

		elevation: 3,
	},

	icon: {
		fontSize: 28,
		marginBottom: 8,
	},

	title: {
		fontSize: 12,
		fontWeight: "800",
		color: "#333",
		textAlign: "center",
	},
});
