import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SearchBar = ({ value, onChangeText, placeholder = "Kamp alanı ara..." }) => {
	return (
		<View style={styles.container}>
			<MaterialCommunityIcons name="magnify" size={22} color="#91A091" />
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor="#91A091"
				style={styles.input}
			/>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		height: 54,
		backgroundColor: "#132617",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#203A25",
		marginHorizontal: 20,
		marginTop: 20,
		paddingHorizontal: 16,
		gap: 10,
	},

	input: {
		flex: 1,
		fontSize: 15,
		color: "#F4F7EF",
		paddingVertical: 0,
	},
});
