import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FeaturedCampCard = ({
	title,
	location,
	image,
	onPress,
	participantCount,
	maxParticipantCount,
}) => {
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

				<View style={styles.statsRow}>
					<Text style={styles.stat}>⭐ {rating || 0}</Text>

					<Text style={styles.stat}>
						👥 {participantCount}/{maxParticipantCount}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default FeaturedCampCard;

const styles = StyleSheet.create({
	card: {
		width: 320,
		height: 250,
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

		borderRadius: 22,

		backgroundColor: "rgba(255,255,255,0.92)",
	},

	title: {
		fontSize: 22,
		fontWeight: "900",
		color: "#1F1F1F",
	},

	location: {
		marginTop: 5,
		fontSize: 14,
		color: "#777",
	},

	statsRow: {
		flexDirection: "row",
		marginTop: 12,
	},
	stat: {
		marginRight: 16,
		fontWeight: "700",
		color: "#444",
	},
});
