import React, { useState } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
	addFavorite,
	removeFavorite,
} from "../../../redux/slices/favoriteSlice";
import { requestJoinCamp } from "../../../services/campJoinRequestService";
import { favoriteCamp, unfavoriteCamp } from "../../../services/campService";

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
	const [isFavorited, setIsFavorited] = useState(camp.isFavorited);
	const dispatch = useDispatch();

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
		} catch (error) {
			console.log(JSON.stringify(error.response?.data, null, 2));
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
	const imageSource =
		camp.imageUrl && camp.imageUrl !== "string"
			? { uri: camp.imageUrl }
			: {
					uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
				};

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
			<View style={styles.imageContainer}>
				<Image source={imageSource} style={styles.image} />
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<MaterialCommunityIcons
						name="arrow-left"
						size={28}
						color="#fff"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.favoriteButton}
					onPress={handleFavorite}
				>
					<MaterialCommunityIcons
						name={isFavorited ? "heart" : "heart-outline"}
						size={28}
						color={isFavorited ? "#E53935" : "#FFFFFF"}
					/>
				</TouchableOpacity>
			</View>

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

				<View style={styles.infoCard}>
					<Text style={styles.sectionTitle}>Kategori</Text>

					<Text style={styles.sectionValue}>
						{categoryMap[camp.categoryName] ||
							camp.categoryName ||
							camp.category}
					</Text>

					<Text style={styles.sectionTitle}>Oluşturan</Text>

					<Text style={styles.sectionValue}>{camp.ownerName}</Text>

					<Text style={styles.sectionTitle}>Açıklama</Text>

					<Text style={styles.description}>{camp.description}</Text>
				</View>

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

	image: {
		width: "100%",
		height: 260,
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

	infoCard: {
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 20,
		marginTop: 20,

		elevation: 4,

		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#222",
		marginBottom: 6,
		marginTop: 16,
	},

	sectionValue: {
		fontSize: 16,
		color: "#666",
	},

	description: {
		fontSize: 16,
		lineHeight: 24,
		color: "#555",
	},

	joinButton: {
		marginTop: 24,
		borderRadius: 14,
		paddingVertical: 6,
	},
	disabledButton: {
		backgroundColor: "#9E9E9E",
	},
	imageContainer: {
		position: "relative",
	},

	favoriteButton: {
		position: "absolute",
		top: 45,
		right: 20,

		width: 44,
		height: 44,

		borderRadius: 22,

		backgroundColor: "rgba(0,0,0,0.35)",

		justifyContent: "center",
		alignItems: "center",
	},
	backButton: {
		position: "absolute",
		top: 45,
		left: 20,
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "rgba(0,0,0,0.35)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
});
