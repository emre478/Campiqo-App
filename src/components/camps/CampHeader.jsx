import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const CampHeader = ({ imageSource, isFavorited, onFavorite, onBack }) => {
	return (
		<View style={styles.imageContainer}>
			<Image source={imageSource} style={styles.image} />

			<TouchableOpacity style={styles.backButton} onPress={onBack}>
				<MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
			</TouchableOpacity>

			<TouchableOpacity style={styles.favoriteButton} onPress={onFavorite}>
				<MaterialCommunityIcons
					name={isFavorited ? "heart" : "heart-outline"}
					size={28}
					color={isFavorited ? "#E53935" : "#FFFFFF"}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default CampHeader;

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 260,
	},

	imageContainer: {
		position: "relative",
	},

	favoriteButton: {
		position: "absolute",
		top: 45,
		right: 20,
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "rgba(0,0,0,0.35)",
		justifyContent: "center",
		alignItems: "center",
	},

	backButton: {
		position: "absolute",
		top: 45,
		left: 20,
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "rgba(0,0,0,0.35)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
});
