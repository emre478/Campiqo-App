import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeHeader = () => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.greeting}>Merhaba Emre 👋</Text>

				<Text style={styles.subtitle}>
					Bugün yeni bir kamp keşfetmeye ne dersin?
				</Text>
			</View>

			<TouchableOpacity>
				<MaterialCommunityIcons
					name="bell-outline"
					size={28}
					color="#2E7D32"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default HomeHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 60,
	},

	greeting: {
		fontSize: 26,
		fontWeight: "700",
		color: "#222",
	},

	subtitle: {
		fontSize: 14,
		color: "#777",
		marginTop: 4,
	},
});