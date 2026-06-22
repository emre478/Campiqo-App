import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CampHeader = ({
	imageSource,
	isFavorited,
	onFavorite,
	onBack,
	categoryName,
}) => {
	return (
		<View style={styles.imageContainer}>
			<Image source={imageSource} style={styles.image} />

			<LinearGradient
				colors={["transparent", "rgba(7, 19, 11, 0.75)"]}
				style={styles.gradient}
			/>

			{categoryName ? (
				<View style={styles.categoryTag}>
					<Text style={styles.categoryText}>{categoryName}</Text>
				</View>
			) : null}

			<TouchableOpacity
				style={styles.backButton}
				onPress={onBack}
				activeOpacity={0.85}
			>
				<MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.favoriteButton}
				onPress={onFavorite}
				activeOpacity={0.85}
			>
				<MaterialCommunityIcons
					name={isFavorited ? "heart" : "heart-outline"}
					size={22}
					color={isFavorited ? "#E53935" : "#FFFFFF"}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default CampHeader;

const styles = StyleSheet.create({
	imageContainer: {
		position: "relative",
		overflow: "hidden",
	},

	image: {
		width: "100%",
		height: 280,
	},

	gradient: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: 120,
	},

	categoryTag: {
		position: "absolute",
		left: 20,
		bottom: 52,
		backgroundColor: "rgba(0, 0, 0, 0.55)",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 14,
	},

	categoryText: {
		color: "#F4F7EF",
		fontSize: 12,
		fontWeight: "700",
	},

	backButton: {
		position: "absolute",
		top: 52,
		left: 20,
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "rgba(0, 0, 0, 0.38)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},

	favoriteButton: {
		position: "absolute",
		top: 52,
		right: 20,
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "rgba(0, 0, 0, 0.38)",
		justifyContent: "center",
		alignItems: "center",
	},
});
