import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../constants/apiConstants";

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

const CampsListCard = ({ camp, onPress }) => {
	const pendingCampIds = useSelector(
		(state) => state.joinRequest.pendingCampIds
	);

	const hasPendingRequest =
		camp.hasPendingRequest || pendingCampIds.includes(camp.id);

	const imageSource = camp.imageUrl
		? { uri: `${SERVER_URL}${camp.imageUrl}` }
		: {
				uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
			};

	const monthRange = formatMonthRange(camp.startDate, camp.endDate);

	const ratingLabel =
		camp.ratingCount > 0
			? `${camp.averageRating?.toFixed(1) ?? "0.0"} (${camp.ratingCount})`
			: "Yeni";

	const getStatusStyle = () => {
		if (camp.isCompleted) {
			return { text: "Tamamlandı", color: "#C5CEC4" };
		}
		if (camp.isOwner) {
			return { text: "Sahibisin", color: "#8DD69A" };
		}
		if (camp.isParticipant) {
			return { text: "Katıldın", color: "#8DD69A" };
		}
		if (hasPendingRequest) {
			return { text: "Bekliyor", color: "#F5B04C" };
		}
		if (camp.isFull) {
			return { text: "Dolu", color: "#FF8A80" };
		}
		return null;
	};

	const statusStyle = getStatusStyle();

	return (
		<TouchableOpacity
			activeOpacity={0.92}
			style={styles.card}
			onPress={onPress}
		>
			<View style={styles.imageWrapper}>
				<Image source={imageSource} style={styles.image} />

				{camp.categoryName ? (
					<View style={styles.categoryTag}>
						<Text style={styles.categoryText}>
							{camp.categoryName}
						</Text>
					</View>
				) : null}

				<View style={styles.favoriteButton}>
					<MaterialCommunityIcons
						name={camp.isFavorited ? "heart" : "heart-outline"}
						size={20}
						color={camp.isFavorited ? "#E53935" : "#FFFFFF"}
					/>
				</View>
			</View>

			<View style={styles.content}>
				<View style={styles.titleRow}>
					<Text numberOfLines={1} style={styles.title}>
						{camp.title}
					</Text>

					<View style={styles.ratingPill}>
						<MaterialCommunityIcons
							name="star"
							size={14}
							color="#FFD34D"
						/>
						<Text style={styles.ratingText}>{ratingLabel}</Text>
					</View>
				</View>

				<View style={styles.locationRow}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={16}
						color="#6DA878"
					/>
					<Text numberOfLines={1} style={styles.locationText}>
						{camp.location}
					</Text>
				</View>

				<View style={styles.divider} />

				<View style={styles.metaRow}>
					<View style={styles.metaItem}>
						<MaterialCommunityIcons
							name="account-group-outline"
							size={16}
							color="#AAB8AA"
						/>
						<Text style={styles.metaText}>
							{camp.maxParticipantCount} kişi
						</Text>
					</View>

					<View style={styles.metaItem}>
						<MaterialCommunityIcons
							name="calendar-month-outline"
							size={16}
							color="#AAB8AA"
						/>
						<Text style={styles.metaText}>{monthRange}</Text>
					</View>

					<View style={styles.statusWrap}>
						{statusStyle ? (
							<Text
								style={[
									styles.statusText,
									{ color: statusStyle.color },
								]}
							>
								{statusStyle.text}
							</Text>
						) : (
							<Text style={styles.capacityText}>
								<Text style={styles.capacityValue}>
									{camp.participantCount}
								</Text>
								<Text style={styles.capacitySuffix}>
									/{camp.maxParticipantCount}
								</Text>
							</Text>
						)}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default CampsListCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",
		borderRadius: 24,
		borderWidth: 1,
		borderColor: "#203A25",
		marginBottom: 18,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 6 },
		elevation: 5,
	},

	imageWrapper: {
		position: "relative",
	},

	image: {
		width: "100%",
		height: 190,
	},

	categoryTag: {
		position: "absolute",
		left: 14,
		bottom: 14,
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

	favoriteButton: {
		position: "absolute",
		top: 14,
		right: 14,
		width: 38,
		height: 38,
		borderRadius: 19,
		backgroundColor: "rgba(0, 0, 0, 0.38)",
		alignItems: "center",
		justifyContent: "center",
	},

	content: {
		paddingHorizontal: 16,
		paddingTop: 14,
		paddingBottom: 16,
	},

	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 10,
	},

	title: {
		flex: 1,
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",
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
		marginTop: 8,
		gap: 4,
	},

	locationText: {
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

	statusWrap: {
		marginLeft: 8,
		alignItems: "flex-end",
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

	statusText: {
		fontSize: 12,
		fontWeight: "800",
	},
});
