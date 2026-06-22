import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeEmptyState = () => {
	return (
		<View style={styles.container}>
			<View style={styles.iconWrap}>
				<MaterialCommunityIcons name="tent" size={40} color="#8DD69A" />
			</View>

			<Text style={styles.title}>Kamp Bulunamadı</Text>

			<Text style={styles.description}>
				Bu kategoriye ait kamp bulunmuyor.
			</Text>
		</View>
	);
};

export default HomeEmptyState;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 40,
		paddingHorizontal: 30,
	},

	iconWrap: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},

	title: {
		fontSize: 22,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	description: {
		marginTop: 8,
		textAlign: "center",
		color: "#91A091",
		fontSize: 14,
		lineHeight: 22,
	},
});
