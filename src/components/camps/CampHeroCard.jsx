import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CAMP_CATEGORIES } from "../../constants/campCategories";

const CampHeroCard = ({
	title,
	location,
	averageRating,
	ratingCount,
	formattedStartDate,
	formattedEndDate,
	participantCount,
	maxParticipantCount,
	category,
	ownerName,
}) => {
	const selectedCategory = CAMP_CATEGORIES.find((x) => x.id === category);

	return (
		<View style={styles.card}>
			<Text style={styles.title}>{title}</Text>

			<View style={styles.locationRow}>
				<MaterialCommunityIcons
					name="map-marker-outline"
					size={15}
					color="#6DA878"
				/>
				<Text style={styles.location}>{location}</Text>
			</View>

			<View style={styles.metaRow}>
				<View style={styles.metaItem}>
					<MaterialCommunityIcons name="star" size={16} color="#FFD34D" />
					<Text style={styles.metaText}>
						{averageRating > 0 ? averageRating.toFixed(1) : "0.0"} (
						{ratingCount})
					</Text>
				</View>

				<View style={styles.metaItem}>
					<MaterialCommunityIcons
						name="calendar-range"
						size={16}
						color="#AAB8AA"
					/>
					<Text style={styles.metaText}>{formattedStartDate}</Text>
				</View>

				<View style={styles.metaItem}>
					<MaterialCommunityIcons
						name="account-group-outline"
						size={16}
						color="#AAB8AA"
					/>
					<Text style={styles.metaText}>
						{participantCount}/{maxParticipantCount}
					</Text>
				</View>
			</View>

			<View style={styles.infoRow}>
				<View style={styles.infoBox}>
					<Text style={styles.label}>Kategori</Text>

					<Text style={styles.value}>
						{selectedCategory?.icon} {selectedCategory?.name}
					</Text>
				</View>

				<View style={styles.infoBox}>
					<Text style={styles.label}>Oluşturan</Text>

					<Text style={styles.value}>👤 {ownerName}</Text>
				</View>
			</View>
		</View>
	);
};

export default CampHeroCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",

		marginTop: -40,

		borderRadius: 24,

		padding: 18,

		borderWidth: 1,
		borderColor: "#203A25",

		marginHorizontal: 16,
	},

	title: {
		fontSize: 28,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},

	location: {
		color: "#91A091",
		marginLeft: 4,
	},

	metaRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 18,
		paddingTop: 14,
		borderTopWidth: 1,
		borderColor: "#203A25",
	},

	metaItem: {
		flexDirection: "row",
		alignItems: "center",
	},

	metaText: {
		marginLeft: 4,
		fontSize: 12,
		color: "#C5CEC4",
		fontWeight: "700",
	},

	infoRow: {
		flexDirection: "row",
		gap: 12,
		marginTop: 18,
	},

	infoBox: {
		flex: 1,
		backgroundColor: "#0D1C10",
		borderRadius: 16,
		padding: 14,
	},

	label: {
		fontSize: 12,
		color: "#91A091",
		marginBottom: 6,
	},

	value: {
		color: "#F4F7EF",
		fontWeight: "700",
	},
});
