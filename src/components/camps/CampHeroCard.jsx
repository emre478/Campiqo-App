import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CAMP_CATEGORIES } from "../../constants/campCategories";
import CategoryIcon from "../common/CategoryIcon";

const formatMonthRange = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);

	const startMonth = start.toLocaleDateString("tr-TR", { month: "long" });
	const endMonth = end.toLocaleDateString("tr-TR", { month: "long" });

	const capitalize = (value) =>
		value.charAt(0).toLocaleUpperCase("tr-TR") + value.slice(1);

	if (startMonth === endMonth) {
		return capitalize(startMonth);
	}

	return `${capitalize(startMonth)} - ${capitalize(endMonth)}`;
};

const CampHeroCard = ({
	title,
	location,
	averageRating,
	ratingCount,
	formattedStartDate,
	formattedEndDate,
	startDate,
	endDate,
	participantCount,
	maxParticipantCount,
	category,
	categoryName,
	ownerName,
}) => {
	const selectedCategory = CAMP_CATEGORIES.find((x) => x.id === category);
	const monthRange = formatMonthRange(startDate, endDate);

	const ratingLabel =
		ratingCount > 0
			? `${averageRating?.toFixed(1) ?? "0.0"} (${ratingCount})`
			: "Yeni";

	return (
		<View style={styles.card}>
			<View style={styles.titleRow}>
				<Text style={styles.title}>{title}</Text>

				<View style={styles.ratingPill}>
					<MaterialCommunityIcons name="star" size={14} color="#FFD34D" />
					<Text style={styles.ratingText}>{ratingLabel}</Text>
				</View>
			</View>

			<View style={styles.locationRow}>
				<MaterialCommunityIcons
					name="map-marker-outline"
					size={16}
					color="#6DA878"
				/>
				<Text style={styles.location}>{location}</Text>
			</View>

			<View style={styles.divider} />

			<View style={styles.metaRow}>
				<View style={styles.metaItem}>
					<MaterialCommunityIcons
						name="account-group-outline"
						size={16}
						color="#AAB8AA"
					/>
					<Text style={styles.metaText}>{maxParticipantCount} kişi</Text>
				</View>

				<View style={styles.metaItem}>
					<MaterialCommunityIcons
						name="calendar-month-outline"
						size={16}
						color="#AAB8AA"
					/>
					<Text style={styles.metaText}>{monthRange}</Text>
				</View>

				<Text style={styles.capacityText}>
					<Text style={styles.capacityValue}>{participantCount}</Text>
					<Text style={styles.capacitySuffix}>/{maxParticipantCount}</Text>
				</Text>
			</View>

			<View style={styles.infoRow}>
				<View style={styles.infoBox}>
					<Text style={styles.label}>Kategori</Text>
					{selectedCategory ? (
						<View style={styles.categoryValue}>
							<CategoryIcon
								name={selectedCategory.icon}
								size={16}
								color="#8DD69A"
							/>
							<Text style={styles.valueText}>
								{categoryName || selectedCategory.name}
							</Text>
						</View>
					) : (
						<Text style={styles.valueText}>
							{categoryName || "-"}
						</Text>
					)}
				</View>

				<View style={styles.infoBox}>
					<Text style={styles.label}>Oluşturan</Text>
					<Text style={styles.value} numberOfLines={1}>
						{ownerName}
					</Text>
				</View>
			</View>

			<View style={styles.dateRow}>
				<View style={styles.dateItem}>
					<MaterialCommunityIcons
						name="calendar-start"
						size={15}
						color="#6DA878"
					/>
					<Text style={styles.dateText}>{formattedStartDate}</Text>
				</View>

				<View style={styles.dateItem}>
					<MaterialCommunityIcons
						name="calendar-end"
						size={15}
						color="#6DA878"
					/>
					<Text style={styles.dateText}>{formattedEndDate}</Text>
				</View>
			</View>
		</View>
	);
};

export default CampHeroCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",
		marginTop: -36,
		borderRadius: 24,
		padding: 18,
		borderWidth: 1,
		borderColor: "#203A25",
		marginHorizontal: 20,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 6 },
		elevation: 5,
	},

	titleRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		gap: 10,
	},

	title: {
		flex: 1,
		fontSize: 22,
		fontWeight: "800",
		color: "#F4F7EF",
		lineHeight: 28,
	},

	ratingPill: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#0D1C10",
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 14,
		gap: 4,
	},

	ratingText: {
		fontSize: 12,
		fontWeight: "700",
		color: "#C5CEC4",
	},

	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		gap: 4,
	},

	location: {
		flex: 1,
		fontSize: 13,
		color: "#91A091",
	},

	divider: {
		height: 1,
		backgroundColor: "#203A25",
		marginVertical: 14,
	},

	metaRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	metaItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		flexShrink: 1,
	},

	metaText: {
		fontSize: 12,
		fontWeight: "700",
		color: "#C5CEC4",
	},

	capacityText: {
		fontSize: 14,
		fontWeight: "800",
	},

	capacityValue: {
		color: "#8DD69A",
	},

	capacitySuffix: {
		color: "#91A091",
		fontWeight: "700",
	},

	infoRow: {
		flexDirection: "row",
		gap: 12,
		marginTop: 16,
	},

	infoBox: {
		flex: 1,
		backgroundColor: "#0D1C10",
		borderRadius: 16,
		padding: 14,
	},

	label: {
		fontSize: 11,
		fontWeight: "600",
		color: "#91A091",
		marginBottom: 6,
		textTransform: "uppercase",
		letterSpacing: 0.4,
	},

	value: {
		color: "#F4F7EF",
		fontWeight: "700",
		fontSize: 14,
	},

	categoryValue: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},

	valueText: {
		color: "#F4F7EF",
		fontWeight: "700",
		fontSize: 14,
		flexShrink: 1,
	},

	dateRow: {
		marginTop: 14,
		gap: 10,
	},

	dateItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: "#0D1C10",
		borderRadius: 14,
		paddingHorizontal: 12,
		paddingVertical: 10,
	},

	dateText: {
		flex: 1,
		fontSize: 12,
		fontWeight: "600",
		color: "#C5CEC4",
	},
});
