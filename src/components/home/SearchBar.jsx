import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const SearchBar = ({ value, onChangeText }) => {
	return (
		<View style={styles.container}>
			<MaterialCommunityIcons
				name="map-marker-outline"
				size={22}
				color="#8B8B8B"
			/>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder="Kamp alanı ara..."
				placeholderTextColor="#9A9A9A"
				style={styles.input}
			/>
			<View style={styles.searchButton}>
				<MaterialCommunityIcons name="map-marker" size={18} color="#fff" />
			</View>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		marginTop: 22,

		backgroundColor: "#FFFFFF",

		borderRadius: 18,

		paddingHorizontal: 16,
		paddingVertical: 10,

		flexDirection: "row",
		alignItems: "center",

		shadowColor: "#000",
		shadowOpacity: 0.06,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: 3,
		},

		elevation: 3,
	},

	input: {
		flex: 1,
		fontSize: 15,
		marginLeft: 10,
		color: "#222",
	},

	searchButton: {
		width: 38,
		height: 38,
		borderRadius: 19,

		backgroundColor: "#F59E0B",

		alignItems: "center",
		justifyContent: "center",
	},
});
