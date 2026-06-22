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
				activeOpacity={0.85}
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
				activeOpacity={0.85}
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
		paddingBottom: 4,
		gap: 10,
	},

	chip: {
		height: 44,
		paddingHorizontal: 20,
		borderRadius: 22,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		marginRight: 10,
		alignItems: "center",
		justifyContent: "center",
	},

	activeChip: {
		backgroundColor: "#2E7D32",
		borderColor: "#2E7D32",
	},

	text: {
		fontSize: 14,
		fontWeight: "700",
		color: "#C5CEC4",
	},

	activeText: {
		color: "#F4F7EF",
	},
});
