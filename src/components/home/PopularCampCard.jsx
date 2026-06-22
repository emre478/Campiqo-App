import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const PopularCampCard = ({
	title,
	location,
	date,
	participants,
	image,
	category,
	onPress,
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

			<View style={styles.content}>
				<View style={styles.topRow}>
					<Text numberOfLines={2} style={styles.title}>
						{title}
					</Text>

					<View style={styles.badge}>
						<Text style={styles.badgeText}>{category || "Kamp"}</Text>
					</View>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={16}
						color="#F59E0B"
					/>

					<Text style={styles.text}>{location}</Text>
				</View>

				<View style={styles.infoRow}>
					<View style={styles.infoItem}>
						<MaterialCommunityIcons
							name="account-group-outline"
							size={14}
							color="#555"
						/>
						<Text style={styles.info}>{participants}</Text>
					</View>

					<View style={styles.infoItem}>
						<MaterialCommunityIcons
							name="calendar-month-outline"
							size={14}
							color="#555"
						/>
						<Text style={styles.info}>{date}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default PopularCampCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#FFFFFF",

		borderRadius: 24,

		marginHorizontal: 20,
		marginBottom: 16,

		padding: 12,

		flexDirection: "row",

		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 12,
		shadowOffset: {
			width: 0,
			height: 4,
		},

		elevation: 4,
	},

	image: {
		width: 110,
		height: 110,
		borderRadius: 18,
	},

	content: {
		flex: 1,
		marginLeft: 12,
		justifyContent: "center",
	},

	title: {
		flex: 1,

		fontSize: 18,

		fontWeight: "900",

		color: "#1F1F1F",
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},

	text: {
		marginLeft: 6,
		color: "#AEBDAE",
	},
	topRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",

		marginBottom: 12,
	},

	badge: {
		backgroundColor: "#FFF3D8",

		paddingHorizontal: 10,
		paddingVertical: 5,

		borderRadius: 12,
	},

	badgeText: {
		color: "#D97706",
		fontWeight: "700",
		fontSize: 11,
	},

	infoRow: {
		flexDirection: "row",
		marginTop: 10,
		gap: 14,
	},

	infoItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},

	info: {
		color: "#555",
		fontWeight: "600",
	},
});
