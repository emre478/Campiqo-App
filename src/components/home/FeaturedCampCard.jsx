import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FeaturedCampCard = ({ title, location, image, onPress }) => {
	return (
		<TouchableOpacity
			style={styles.card}
			onPress={onPress}
			activeOpacity={0.9}
		>
			<Image
				source={{
					uri:
						image && image !== "string"
							? image
							: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
				}}
				style={styles.image}
			/>

			<View style={styles.overlay}>
				<Text style={styles.title}>{title}</Text>

				<Text style={styles.location}>📍 {location}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default FeaturedCampCard;

const styles = StyleSheet.create({
	card: {
		width: 310,
		height: 220,
		borderRadius: 28,
		overflow: "hidden",
		marginRight: 16,
	},

	image: {
		width: "100%",
		height: "100%",
	},

	overlay: {
		position: "absolute",
		left: 14,
		right: 14,
		bottom: 14,
		padding: 16,
		borderRadius: 20,
		backgroundColor: "rgba(8,20,10,0.85)",
	},

	title: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "900",
	},

	location: {
		color: "#AEBDAE",
		marginTop: 6,
	},
});
