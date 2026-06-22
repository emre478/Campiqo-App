import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Button } from "react-native-paper";

import CampActionButton from "../../../components/camps/CampActionButton";
import CampInfoCard from "../../../components/camps/CampInfoCard";
import CampRatingCard from "../../../components/camps/CampRatingCard";
import CommentCard from "../../../components/comments/CommentCard";
import CommentInput from "../../../components/comments/CommentInput";
import { SERVER_URL } from "../../../constants/apiConstants";
import { useCampDetail } from "../../../hooks/useCampDetail";
import { useCampRating } from "../../../hooks/useCampRating";
import { getCampById } from "../../../services/campService";

const CampDetailScreen = ({ route, navigation }) => {
	const { camp: initialCamp } = route.params;

	const [camp, setCamp] = useState(initialCamp);

	useEffect(() => {
		setCamp(initialCamp);
	}, [initialCamp.id]);

	useEffect(() => {
		loadCamp();
	}, [initialCamp.id]);

	const {
		isFavorited,
		handleFavorite,
		handleJoin,
		buttonConfig,
		comments,
		commentText,
		setCommentText,
		handleAddComment,
		handleDeleteComment,
	} = useCampDetail(camp);

	const {
		selectedRating,
		setSelectedRating,
		handleRate,
		loading: ratingLoading,
	} = useCampRating(camp.id, camp.myRating);

	const loadCamp = async () => {
		try {
			const response = await getCampById(initialCamp.id);
			setCamp(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const imageSource = camp.imageUrl
		? { uri: `${SERVER_URL}${camp.imageUrl}` }
		: { uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" };

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

	const dayCount =
		Math.max(
			1,
			Math.ceil(
				(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
			)
		) || 1;

	const averageRating = camp.averageRating || 0;
	const ratingCount = camp.ratingCount || 0;

	return (
		<View style={styles.screen}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.heroWrapper}>
					<Image source={imageSource} style={styles.heroImage} />

					<View style={styles.heroOverlay} />

					<TouchableOpacity
						style={styles.backButton}
						onPress={() => navigation.goBack()}
					>
						<MaterialCommunityIcons
							name="chevron-left"
							size={30}
							color="#fff"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.favoriteButton}
						onPress={handleFavorite}
					>
						<MaterialCommunityIcons
							name={isFavorited ? "heart" : "heart-outline"}
							size={24}
							color={isFavorited ? "#FF6B6B" : "#fff"}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.contentCard}>
					<View style={styles.titleRow}>
						<View style={styles.titleArea}>
							<Text style={styles.title}>{camp.title}</Text>

							<View style={styles.locationRow}>
								<MaterialCommunityIcons
									name="map-marker-outline"
									size={15}
									color="#6DA878"
								/>
								<Text style={styles.location}>{camp.location}</Text>
							</View>
						</View>
					</View>

					<View style={styles.metaCard}>
						<View style={styles.metaItem}>
							<MaterialCommunityIcons
								name="star"
								size={17}
								color="#FFD34D"
							/>
							<Text style={styles.metaText}>
								{averageRating > 0 ? averageRating.toFixed(1) : "0.0"} (
								{ratingCount})
							</Text>
						</View>

						<View style={styles.metaItem}>
							<MaterialCommunityIcons
								name="clock-outline"
								size={16}
								color="#AAB8AA"
							/>
							<Text style={styles.metaText}>{dayCount} gün</Text>
						</View>

						<View style={styles.metaItem}>
							<MaterialCommunityIcons
								name="account-group-outline"
								size={16}
								color="#AAB8AA"
							/>
							<Text style={styles.metaText}>
								Max {camp.maxParticipantCount} kişi
							</Text>
						</View>
					</View>

					<View style={styles.dateBox}>
						<Text style={styles.dateText}>
							{formattedStartDate} - {formattedEndDate}
						</Text>
					</View>

					<CampInfoCard camp={camp} />

					{camp.isOwner && (
						<Button
							mode="outlined"
							textColor="#CFE8D2"
							style={styles.outlineButton}
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
							buttonColor="#4F8F5F"
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

					{camp.isCompleted && (
						<View style={styles.commentSection}>
							<Text style={styles.sectionTitle}>Yorumlar</Text>

							<CommentInput
								value={commentText}
								onChangeText={setCommentText}
								onSubmit={handleAddComment}
							/>

							{comments.map((comment) => (
								<CommentCard
									key={comment.id}
									comment={comment}
									onDelete={handleDeleteComment}
									onUserPress={(userId) =>
										navigation.navigate("UserProfile", {
											userId,
										})
									}
								/>
							))}
						</View>
					)}
				</View>
			</ScrollView>

			<View style={styles.bottomBar}>
				<View>
					<Text style={styles.totalLabel}>Katılım Durumu</Text>
					<Text style={styles.totalText}>
						{camp.participantCount}/{camp.maxParticipantCount}
					</Text>
				</View>

				<View style={styles.actionWrapper}>
					<CampActionButton
						buttonConfig={buttonConfig}
						onPress={handleJoin}
					/>
				</View>
			</View>
		</View>
	);
};

export default CampDetailScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#07130B",
	},

	container: {
		flex: 1,
		backgroundColor: "#07130B",
	},

	scrollContent: {
		paddingBottom: 110,
	},

	heroWrapper: {
		height: 300,
		position: "relative",
	},

	heroImage: {
		width: "100%",
		height: "100%",
	},

	heroOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.25)",
	},

	backButton: {
		position: "absolute",
		top: 48,
		left: 18,
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "rgba(0,0,0,0.35)",
		alignItems: "center",
		justifyContent: "center",
	},

	favoriteButton: {
		position: "absolute",
		top: 48,
		right: 18,
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "rgba(0,0,0,0.35)",
		alignItems: "center",
		justifyContent: "center",
	},

	contentCard: {
		marginTop: -42,
		marginHorizontal: 14,
		backgroundColor: "#0D1C10",
		borderRadius: 26,
		padding: 18,
		borderWidth: 1,
		borderColor: "#1C3320",
	},

	titleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	titleArea: {
		flex: 1,
	},

	title: {
		fontSize: 25,
		fontWeight: "800",
		color: "#F4F7EF",
		lineHeight: 31,
	},

	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},

	location: {
		fontSize: 13,
		color: "#9FAE9F",
		marginLeft: 4,
	},

	metaCard: {
		marginTop: 18,
		paddingTop: 14,
		borderTopWidth: 1,
		borderColor: "#1E3322",
		flexDirection: "row",
		justifyContent: "space-between",
	},

	metaItem: {
		flexDirection: "row",
		alignItems: "center",
	},

	metaText: {
		marginLeft: 5,
		fontSize: 12,
		color: "#C5CEC4",
		fontWeight: "600",
	},

	dateBox: {
		marginTop: 16,
		backgroundColor: "#132617",
		borderRadius: 16,
		paddingVertical: 12,
		paddingHorizontal: 14,
	},

	dateText: {
		color: "#CFE8D2",
		fontSize: 13,
		fontWeight: "600",
	},

	outlineButton: {
		marginTop: 14,
		borderRadius: 16,
		borderColor: "#4F8F5F",
	},

	chatButton: {
		marginTop: 14,
		borderRadius: 16,
	},

	commentSection: {
		marginTop: 24,
	},

	sectionTitle: {
		fontSize: 20,
		fontWeight: "800",
		color: "#F4F7EF",
		marginBottom: 14,
	},

	bottomBar: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "#152C19",
		borderTopWidth: 1,
		borderColor: "#243E28",
		paddingHorizontal: 18,
		paddingTop: 14,
		paddingBottom: 24,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	totalLabel: {
		color: "#AEBDAE",
		fontSize: 12,
	},

	totalText: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "900",
		marginTop: 2,
	},

	actionWrapper: {
		flex: 1,
		marginLeft: 18,
	},
});
