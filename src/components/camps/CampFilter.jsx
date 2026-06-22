import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CampFilter = ({ selected, onChange }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.tab, selected === "all" && styles.activeTab]}
				onPress={() => onChange("all")}
			>
				<Text
					style={[styles.text, selected === "all" && styles.activeText]}
				>
					Tümü
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.tab, selected === "upcoming" && styles.activeTab]}
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
		marginHorizontal: 20,
		marginBottom: 20,

		backgroundColor: "#FFFFFF",

		borderRadius: 18,

		padding: 5,

		shadowColor: "#000",
		shadowOpacity: 0.06,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3,
		},

		elevation: 3,
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
