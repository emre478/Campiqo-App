import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const FeaturedCampCard = ({ title, location, image }) => {
	return (
		<View style={styles.card}>
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
		</View>
	);
};

export default FeaturedCampCard;

const styles = StyleSheet.create({
	card: {
		width: 260,
		height: 170,
		borderRadius: 20,
		overflow: "hidden",
		marginRight: 15,
	},

	image: {
		width: "100%",
		height: "100%",
	},

	overlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,

		padding: 15,

		backgroundColor: "rgba(0,0,0,0.4)",
	},

	title: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "700",
	},

	location: {
		color: "#fff",
		marginTop: 4,
	},
});
