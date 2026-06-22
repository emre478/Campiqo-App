import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SERVER_URL } from "../../constants/apiConstants";

const FeaturedCampCard = ({
	title,
	location,
	image,
	onPress,
	participantCount,
	maxParticipantCount,
	categoryName,
	averageRating,
	ratingCount,
}) => {
	const imageSource = image && image !== "string"
		? { uri: `${SERVER_URL}${image}` }
		: {
				uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
			};

	const ratingLabel =
		ratingCount > 0
			? `${averageRating?.toFixed(1) ?? "0.0"}`
			: "Yeni";

	return (
		<TouchableOpacity
			style={styles.card}
			onPress={onPress}
			activeOpacity={0.92}
		>
			<View style={styles.imageWrapper}>
				<Image source={imageSource} style={styles.image} />

				{categoryName ? (
					<View style={styles.categoryTag}>
						<Text style={styles.categoryText}>{categoryName}</Text>
					</View>
				) : null}
			</View>

			<View style={styles.content}>
				<View style={styles.titleRow}>
					<Text numberOfLines={1} style={styles.title}>
						{title}
					</Text>

					<View style={styles.ratingPill}>
						<MaterialCommunityIcons
							name="star"
							size={12}
							color="#FFD34D"
						/>
						<Text style={styles.ratingText}>{ratingLabel}</Text>
					</View>
				</View>

				<View style={styles.locationRow}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={14}
						color="#6DA878"
					/>
					<Text numberOfLines={1} style={styles.location}>
						{location}
					</Text>
				</View>

				<View style={styles.statsRow}>
					<MaterialCommunityIcons
						name="account-group-outline"
						size={14}
						color="#AAB8AA"
					/>
					<Text style={styles.stat}>
						{participantCount}/{maxParticipantCount} kişi
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default FeaturedCampCard;

const styles = StyleSheet.create({
	card: {
		width: 280,
		backgroundColor: "#132617",
		borderRadius: 24,
		borderWidth: 1,
		borderColor: "#203A25",
		overflow: "hidden",
		marginRight: 16,
	},

	imageWrapper: {
		position: "relative",
	},

	image: {
		width: "100%",
		height: 160,
	},

	categoryTag: {
		position: "absolute",
		left: 12,
		bottom: 12,
		backgroundColor: "rgba(0, 0, 0, 0.55)",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 12,
	},

	categoryText: {
		color: "#F4F7EF",
		fontSize: 11,
		fontWeight: "700",
	},

	content: {
		padding: 14,
	},

	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 8,
	},

	title: {
		flex: 1,
		fontSize: 17,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	ratingPill: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#0D1C10",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		gap: 3,
	},

	ratingText: {
		fontSize: 11,
		fontWeight: "700",
		color: "#C5CEC4",
	},

	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginTop: 8,
	},

	location: {
		flex: 1,
		fontSize: 13,
		color: "#91A091",
	},

	statsRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginTop: 10,
	},

	stat: {
		fontSize: 12,
		fontWeight: "700",
		color: "#C5CEC4",
	},
});
