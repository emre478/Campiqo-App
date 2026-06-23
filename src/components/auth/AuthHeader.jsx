import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AuthHeader = () => {
	return (
		<LinearGradient
			colors={["#07130B", "#0F2415", "#132617"]}
			style={styles.container}
		>
			<View style={styles.logoWrap}>
				<MaterialCommunityIcons name="tent" size={34} color="#8DD69A" />
			</View>

			<Text style={styles.logo}>Campiqo</Text>
			<Text style={styles.subtitle}>Doğayı Keşfet, Kampı Paylaş</Text>
		</LinearGradient>
	);
};

export default AuthHeader;

const styles = StyleSheet.create({
	container: {
		paddingTop: 56,
		paddingBottom: 28,
		paddingHorizontal: 24,
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#203A25",
	},

	logoWrap: {
		width: 72,
		height: 72,
		borderRadius: 36,
		backgroundColor: "#0D1C10",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 14,
	},

	logo: {
		color: "#F4F7EF",
		fontSize: 36,
		fontWeight: "900",
		letterSpacing: -0.5,
	},

	subtitle: {
		color: "#91A091",
		marginTop: 8,
		fontSize: 15,
		fontWeight: "600",
		textAlign: "center",
	},
});
