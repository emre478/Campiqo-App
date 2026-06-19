import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../constants/apiConstants";

const CampCard = ({ camp, onPress }) => {
	const pendingCampIds = useSelector(
		(state) => state.joinRequest.pendingCampIds
	);

	const hasPendingRequest =
		camp.hasPendingRequest || pendingCampIds.includes(camp.id);
	const imageSource = camp.imageUrl
		? {
				uri: `${SERVER_URL}${camp.imageUrl}`,
			}
		: {
				uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
			};

	const startDate = new Date(camp.startDate);

	const formattedDate = startDate.toLocaleDateString("tr-TR", {
		day: "numeric",
		month: "long",
	});
	const getStatusBadge = () => {
		if (camp.isCompleted) {
			return {
				text: "Tamamlandı",
				color: "#EEEEEE",
				textColor: "#616161",
			};
		}
		if (camp.isOwner) {
			return {
				text: "Kamp Sahibi",
				color: "#E8F5E9",
				textColor: "#2E7D32",
			};
		}

		if (camp.isParticipant) {
			return {
				text: "Katıldın",
				color: "#E8F5E9",
				textColor: "#2E7D32",
			};
		}

		if (hasPendingRequest) {
			return {
				text: "İstek Gönderildi",
				color: "#FFF3E0",
				textColor: "#EF6C00",
			};
		}

		if (camp.isFull) {
			return {
				text: "Kamp Dolu",
				color: "#FFEBEE",
				textColor: "#C62828",
			};
		}

		return null;
	};

	const badge = getStatusBadge();
	console.log(
	"Camp:",
	camp.title,
	"completed:",
	camp.isCompleted,
	"rating:",
	camp.averageRating,
	"count:",
	camp.ratingCount
);

	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={styles.card}
			onPress={onPress}
		>
			<Image source={imageSource} style={styles.image} />

			<View style={styles.content}>
				<View style={styles.header}>
					<Text numberOfLines={2} style={styles.title}>
						{camp.title}
					</Text>

					{badge && (
						<View
							style={[
								styles.statusBadge,
								{ backgroundColor: badge.color },
							]}
						>
							<Text
								style={[styles.statusText, { color: badge.textColor }]}
							>
								{badge.text}
							</Text>
						</View>
					)}
				</View>
				{camp.isCompleted && camp.ratingCount > 0 && (
					<View style={styles.ratingContainer}>
						<Text style={styles.ratingText}>
							⭐ {camp.averageRating.toFixed(1)} ({camp.ratingCount})
						</Text>
					</View>
				)}
				<View style={styles.infoRow}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={18}
						color="#666"
					/>

					<Text style={styles.infoText}>{camp.location}</Text>
				</View>

				<View style={styles.infoRow}>
					<MaterialCommunityIcons
						name="calendar-month-outline"
						size={18}
						color="#666"
					/>

					<Text style={styles.infoText}>{formattedDate}</Text>
				</View>

				<View style={styles.infoRow}>
					<MaterialCommunityIcons
						name="account-group-outline"
						size={18}
						color="#666"
					/>

					<Text style={styles.infoText}>
						Katılım: {camp.participantCount}/{camp.maxParticipantCount}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default CampCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 20,
		marginHorizontal: 16,
		marginBottom: 16,
		padding: 12,

		flexDirection: "row",

		elevation: 4,

		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},

	image: {
		width: 110,
		height: 110,
		borderRadius: 16,
	},

	content: {
		flex: 1,
		marginLeft: 14,
		justifyContent: "center",
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 10,
	},

	title: {
		flex: 1,
		fontSize: 20,
		fontWeight: "700",
		color: "#222",
		marginRight: 10,
	},

	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},

	infoText: {
		marginLeft: 6,
		fontSize: 14,
		color: "#666",
	},
	pendingBadge: {
		backgroundColor: "#FFF3E0",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 10,
	},

	pendingText: {
		color: "#EF6C00",
		fontSize: 12,
		fontWeight: "700",
	},
	statusBadge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 10,
	},

	statusText: {
		fontSize: 12,
		fontWeight: "700",
	},
	ratingContainer: {
		marginBottom: 8,
	},

	ratingText: {
		fontSize: 13,
		fontWeight: "700",
		color: "#F59E0B",
	},
});
