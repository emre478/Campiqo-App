import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const CampFilter = ({ selected, onChange }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[
					styles.tab,
					selected === "all" && styles.activeTab,
				]}
				onPress={() => onChange("all")}
			>
				<Text
					style={[
						styles.text,
						selected === "all" && styles.activeText,
					]}
				>
					Tümü
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					styles.tab,
					selected === "upcoming" && styles.activeTab,
				]}
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
		</View>
	);
};

export default CampFilter;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginHorizontal: 16,
		marginBottom: 16,
		backgroundColor: "#F1F3F5",
		borderRadius: 12,
		padding: 4,
	},

	tab: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 10,
		borderRadius: 10,
	},

	activeTab: {
		backgroundColor: "#2E7D32",
	},

	text: {
		fontWeight: "600",
		color: "#666",
	},

	activeText: {
		color: "#fff",
	},
});