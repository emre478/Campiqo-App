import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { CampHeader } from "../../../components/camps/CampHeader";
import CampInfoCard from "../../../components/camps/CampInfoCard";
import { SERVER_URL } from "../../../constants/apiConstants";
import {
	addFavorite,
	removeFavorite,
} from "../../../redux/slices/favoriteSlice";
import { addPendingRequest } from "../../../redux/slices/joinRequestSlice";
import { requestJoinCamp } from "../../../services/campJoinRequestService";
import { favoriteCamp, unfavoriteCamp } from "../../../services/campService";
import CampInfoCard from "../../../components/camps/CampInfoCard";
import CampHeader from "../../../components/camps/CampHeader";

const categoryMap = {
	Nature: "Doğa",
	Caravan: "Karavan",
	Mountain: "Dağ",
	Sea: "Deniz",
	Winter: "Kış",
	Survival: "Hayatta Kalma",
};

const CampDetailScreen = ({ route, navigation }) => {
	const { camp } = route.params;
	console.log("Camp Image Url:", camp.imageUrl);
	const [isFavorited, setIsFavorited] = useState(camp.isFavorited);
	const dispatch = useDispatch();
	const pendingCampIds = useSelector(
		(state) => state.joinRequest.pendingCampIds
	);

	const hasPendingRequest =
		camp.hasPendingRequest || pendingCampIds.includes(camp.id);

	const handleFavorite = async () => {
		try {
			if (isFavorited) {
				await unfavoriteCamp(camp.id);

				dispatch(removeFavorite(camp.id));

				setIsFavorited(false);
			} else {
				await favoriteCamp(camp.id);

				dispatch(
					addFavorite({
						...camp,
						isFavorited: true,
					})
				);

				setIsFavorited(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleJoin = async () => {
		try {
			const response = await requestJoinCamp(camp.id);

			console.log(response);

			dispatch(addPendingRequest(camp.id));
		} catch (error) {
			console.log(JSON.stringify(error.response?.data, null, 2));

			if (error.response?.data?.message === "Zaten istek gönderdiniz") {
				dispatch(addPendingRequest(camp.id));
			}
		}
	};

	const getButtonConfig = () => {
		if (camp.isOwner) {
			return {
				text: "👑 Kamp Sahibi",
				color: "#E8F5E9",
				textColor: "#2E7D32",
				disabled: true,
			};
		}

		if (camp.isParticipant) {
			return {
				text: "✓ Katıldın",
				color: "#E8F5E9",
				textColor: "#2E7D32",
				disabled: true,
			};
		}
		if (hasPendingRequest) {
			return {
				text: "⏳ Katılma İsteği Gönderildi",
				color: "#FFF8E1",
				textColor: "#F9A825",
				disabled: true,
			};
		}

		if (camp.isFull) {
			return {
				text: "⚠ Kamp Dolu",
				color: "#FFF3E0",
				textColor: "#EF6C00",
				disabled: true,
			};
		}

		return {
			text: "Katıl",
			color: "#2E7D32",
			textColor: "#FFFFFF",
			disabled: false,
		};
	};

	const buttonConfig = getButtonConfig();

	const getButtonText = () => {
		if (camp.isOwner) return "Kamp Sahibi";

		if (camp.isParticipant) return "Katıldın";

		if (camp.isFull) return "Kamp Dolu";

		return "Katıl";
	};

	const isDisabled = camp.isOwner || camp.isParticipant || camp.isFull;
	const imageSource = camp.imageUrl
		? {
				uri: `${SERVER_URL}${camp.imageUrl}`,
			}
		: {
				uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
			};
	console.log("FULL IMAGE URL:", `${SERVER_URL}${camp.imageUrl}`);

	const startDate = new Date(camp.startDate);
	const endDate = new Date(camp.endDate);

	const formattedStartDate = startDate.toLocaleDateString("tr-TR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const formattedEndDate = endDate.toLocaleDateString("tr-TR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<ScrollView style={styles.container}>
			<CampHeader
				imageSource={imageSource}
				isFavorited={isFavorited}
				onFavorite={handleFavorite}
				onBack={() => navigation.goBack()}
			/>

			<View style={styles.content}>
				<Text style={styles.title}>{camp.title}</Text>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={20}
						color="#666"
					/>

					<Text style={styles.text}>{camp.location}</Text>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="calendar-range"
						size={20}
						color="#666"
					/>

					<Text style={styles.text}>
						{formattedStartDate} - {formattedEndDate}
					</Text>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="account-group-outline"
						size={20}
						color="#666"
					/>

					<Text style={styles.text}>
						{camp.participantCount}/{camp.maxParticipantCount}
					</Text>
				</View>

				<CampInfoCard camp={camp} categoryMap={categoryMap} />
				<Button
					mode="contained"
					buttonColor={buttonConfig.color}
					textColor={buttonConfig.textColor}
					style={styles.joinButton}
					onPress={() => {
						if (!buttonConfig.disabled) {
							handleJoin();
						}
					}}
				>
					{buttonConfig.text}
				</Button>
			</View>
		</ScrollView>
	);
};

export default CampDetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},

	content: {
		padding: 20,
	},

	title: {
		fontSize: 30,
		fontWeight: "700",
		marginBottom: 20,
		color: "#222",
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},

	text: {
		marginLeft: 8,
		fontSize: 16,
		color: "#666",
	},

	joinButton: {
		marginTop: 24,
		borderRadius: 14,
		paddingVertical: 6,
	},
	disabledButton: {
		backgroundColor: "#9E9E9E",
	},
});
