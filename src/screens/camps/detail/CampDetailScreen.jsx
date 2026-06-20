import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import CampActionButton from "../../../components/camps/CampActionButton";
import CampHeader from "../../../components/camps/CampHeader";
import CampInfoCard from "../../../components/camps/CampInfoCard";
import CampMetaInfo from "../../../components/camps/CampMetaInfo";
import CampRatingCard from "../../../components/camps/CampRatingCard";
import { SERVER_URL } from "../../../constants/apiConstants";
import { useCampDetail } from "../../../hooks/useCampDetail";
import { useCampRating } from "../../../hooks/useCampRating";
import { getCampById } from "../../../services/campService";

const CampDetailScreen = ({ route, navigation }) => {
	const { camp: initialCamp } = route.params;

	const [camp, setCamp] = useState(initialCamp);
	const { isFavorited, handleFavorite, handleJoin, buttonConfig } =
		useCampDetail(camp);
	const {
		selectedRating,
		setSelectedRating,
		handleRate,
		loading: ratingLoading,
	} = useCampRating(camp.id, camp.myRating);
	useEffect(() => {
		loadCamp();
	}, []);

	const loadCamp = async () => {
		try {
			const response = await getCampById(initialCamp.id);

			setCamp(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const imageSource = camp.imageUrl
		? {
				uri: `${SERVER_URL}${camp.imageUrl}`,
			}
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
			<CampHeader
				imageSource={imageSource}
				isFavorited={isFavorited}
				onFavorite={handleFavorite}
				onBack={() => navigation.goBack()}
			/>

			<View style={styles.content}>
				<Text style={styles.title}>{camp.title}</Text>

				<CampMetaInfo
					location={camp.location}
					formattedStartDate={formattedStartDate}
					formattedEndDate={formattedEndDate}
					participantCount={camp.participantCount}
					maxParticipantCount={camp.maxParticipantCount}
				/>

				<CampInfoCard camp={camp} />
				{camp.isOwner && (
					<Button
						mode="outlined"
						style={styles.requestButton}
						onPress={() =>
							navigation.navigate("CampJoinRequests", {
								campId: camp.id,
							})
						}
					>
						Katılım İsteklerini Gör
					</Button>
				)}
				{camp.isCompleted && camp.isParticipant && (
					<CampRatingCard
						campId={camp.id}
						myRating={camp.myRating}
						averageRating={camp.averageRating}
						ratingCount={camp.ratingCount}
						onRated={loadCamp}
					/>
				)}
				{(camp.isParticipant || camp.isOwner) && (
					<Button
						mode="contained"
						buttonColor="#2E7D32"
						style={styles.chatButton}
						onPress={() =>
							navigation.navigate("Chat", {
								campId: camp.id,
								campTitle: camp.title,
								participantCount: camp.participantCount,
								maxParticipantCount: camp.maxParticipantCount,
							})
						}
					>
						Sohbete Git
					</Button>
				)}
				<CampActionButton
					buttonConfig={buttonConfig}
					onPress={handleJoin}
				/>
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
	requestButton: {
		marginTop: 10,
		marginBottom: 12,
		borderRadius: 14,
	},
	chatButton: {
		marginTop: 10,
		marginBottom: 12,
		borderRadius: 14,
	},
});
