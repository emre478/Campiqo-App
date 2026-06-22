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
				color: "#1B3A22",
				textColor: "#8DD69A",
			};
		}

		if (camp.isParticipant) {
			return {
				text: "Katıldın",
				color: "#1B3A22",
				textColor: "#8DD69A",
			};
		}

		if (hasPendingRequest) {
			return {
				text: "Bekliyor",
				color: "#3A2A12",
				textColor: "#F5B04C",
			};
		}

		if (camp.isFull) {
			return {
				text: "Dolu",
				color: "#3A1717",
				textColor: "#FF8A80",
			};
		}

		return null;
	};

	const badge = getStatusBadge();

	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={styles.card}
			onPress={onPress}
		>
			<Image source={imageSource} style={styles.image} />

			<View style={styles.content}>
				<View style={styles.header}>
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						style={styles.title}
					>
						{camp.title}
					</Text>

					{badge && (
						<View
							style={[
								styles.statusBadge,
								{
									backgroundColor: badge.color,
								},
							]}
						>
							<Text
								style={[
									styles.statusText,
									{
										color: badge.textColor,
									},
								]}
							>
								{badge.text}
							</Text>
						</View>
					)}
				</View>

				<View style={styles.infoRow}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={18}
						color="#8FA295"
					/>

					<Text numberOfLines={1} style={styles.infoText}>
						{camp.location}
					</Text>
				</View>

				<View style={styles.infoRow}>
					<MaterialCommunityIcons
						name="calendar-month-outline"
						size={18}
						color="#8FA295"
					/>

					<Text style={styles.infoText}>{formattedDate}</Text>
				</View>

				<View style={styles.infoRow}>
					<MaterialCommunityIcons
						name="account-group-outline"
						size={18}
						color="#8FA295"
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
		backgroundColor: "#0F2415",

		flexDirection: "row",

		marginHorizontal: 20,
		marginBottom: 18,

		padding: 14,

		borderRadius: 30,

		borderWidth: 1,
		borderColor: "#1F3A27",

		shadowColor: "#000",
		shadowOpacity: 0.12,
		shadowRadius: 12,
		shadowOffset: {
			width: 0,
			height: 6,
		},

		elevation: 6,
	},

	image: {
		width: 120,
		height: 120,

		borderRadius: 22,
	},

	content: {
		flex: 1,
		marginLeft: 14,

		justifyContent: "center",
	},

	header: {
		flexDirection: "row",
		alignItems: "flex-start",

		marginBottom: 12,
	},

	title: {
		flex: 1,

		fontSize: 20,
		fontWeight: "900",

		color: "#F4F7EF",

		paddingRight: 8,
	},

	statusBadge: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 14,

		alignSelf: "flex-start",
	},

	statusText: {
		fontSize: 11,
		fontWeight: "800",
	},

	infoRow: {
		flexDirection: "row",
		alignItems: "center",

		marginBottom: 8,
	},

	infoText: {
		marginLeft: 8,

		fontSize: 14,

		color: "#B6C1B7",

		flexShrink: 1,
	},
});
