import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const CampFilter = ({ selected, onChange }) => {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			<TouchableOpacity
				style={[styles.chip, selected === "all" && styles.activeChip]}
				onPress={() => onChange("all")}
			>
				<Text
					style={[styles.text, selected === "all" && styles.activeText]}
				>
					Tümü
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.chip, selected === "upcoming" && styles.activeChip]}
				onPress={() => onChange("upcoming")}
			>
				<Text
					style={[
						styles.text,
						selected === "upcoming" && styles.activeText,
					]}
				>
					Yaklaşan
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default CampFilter;

const styles = StyleSheet.create({
	container: {
		paddingBottom: 8,
	},

	chip: {
		height: 42,

		paddingHorizontal: 18,

		borderRadius: 21,

		backgroundColor: "#FFFFFF",

		borderWidth: 1,
		borderColor: "#CDEBD8",

		marginRight: 10,

		alignItems: "center",
		justifyContent: "center",
	},

	activeChip: {
		backgroundColor: "#35C759",
		borderColor: "#35C759",
	},

	text: {
		fontSize: 13,
		fontWeight: "700",
		color: "#24523A",
	},

	activeText: {
		color: "#FFFFFF",
	},
});
