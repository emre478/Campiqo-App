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
							size={32}
							color="#fff"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.favoriteButton}
						onPress={handleFavorite}
					>
						<MaterialCommunityIcons
							name={isFavorited ? "heart" : "heart-outline"}
							size={25}
							color={isFavorited ? "#FF6B6B" : "#fff"}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.contentCard}>
					<Text style={styles.title}>{camp.title}</Text>

					<View style={styles.locationRow}>
						<MaterialCommunityIcons
							name="map-marker-outline"
							size={16}
							color="#6DA878"
						/>
						<Text style={styles.location}>{camp.location}</Text>
					</View>

					<View style={styles.metaCard}>
						<View style={styles.metaItem}>
							<MaterialCommunityIcons
								name="star"
								size={19}
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
								size={18}
								color="#AAB8AA"
							/>
							<Text style={styles.metaText}>{dayCount} gün</Text>
						</View>

						<View style={styles.metaItem}>
							<MaterialCommunityIcons
								name="account-group-outline"
								size={18}
								color="#AAB8AA"
							/>
							<Text style={styles.metaText}>
								Max {camp.maxParticipantCount}
							</Text>
						</View>
					</View>

					<View style={styles.dateBox}>
						<MaterialCommunityIcons
							name="calendar-range"
							size={18}
							color="#CFE8D2"
						/>
						<Text style={styles.dateText}>
							{formattedStartDate} - {formattedEndDate}
						</Text>
					</View>

					<CampInfoCard camp={camp} />

					{camp.isOwner && (
						<Button
							mode="contained-tonal"
							buttonColor="#132617"
							textColor="#CFE8D2"
							style={styles.ownerButton}
							labelStyle={styles.buttonLabel}
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
							textColor="#fff"
							style={styles.chatButton}
							labelStyle={styles.buttonLabel}
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
					<Text style={styles.totalLabel}>Katılımcılar</Text>
					<Text style={styles.totalText}>
						{camp.participantCount} / {camp.maxParticipantCount}
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
		paddingBottom: 115,
	},

	heroWrapper: {
		height: 360,
		position: "relative",
	},

	heroImage: {
		width: "100%",
		height: "100%",
	},

	heroOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.28)",
	},

	backButton: {
		position: "absolute",
		top: 48,
		left: 18,
		width: 46,
		height: 46,
		borderRadius: 23,
		backgroundColor: "rgba(0,0,0,0.38)",
		alignItems: "center",
		justifyContent: "center",
	},

	favoriteButton: {
		position: "absolute",
		top: 48,
		right: 18,
		width: 46,
		height: 46,
		borderRadius: 23,
		backgroundColor: "rgba(0,0,0,0.38)",
		alignItems: "center",
		justifyContent: "center",
	},

	contentCard: {
		marginTop: -55,
		marginHorizontal: 14,
		backgroundColor: "#0D1C10",
		borderRadius: 28,
		padding: 18,
		borderWidth: 1,
		borderColor: "#1C3320",
	},

	title: {
		fontSize: 30,
		fontWeight: "900",
		color: "#F4F7EF",
		lineHeight: 36,
	},

	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 9,
	},

	location: {
		fontSize: 14,
		color: "#9FAE9F",
		marginLeft: 5,
		fontWeight: "600",
	},

	metaCard: {
		marginTop: 18,
		backgroundColor: "#132617",
		borderRadius: 18,
		paddingVertical: 14,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: "#203A25",
		flexDirection: "row",
		justifyContent: "space-around",
	},

	metaItem: {
		flexDirection: "row",
		alignItems: "center",
	},

	metaText: {
		marginLeft: 5,
		fontSize: 12,
		color: "#C5CEC4",
		fontWeight: "700",
	},

	dateBox: {
		marginTop: 16,
		backgroundColor: "#132617",
		borderRadius: 16,
		paddingVertical: 13,
		paddingHorizontal: 14,
		borderWidth: 1,
		borderColor: "#203A25",
		flexDirection: "row",
		alignItems: "center",
	},

	dateText: {
		color: "#CFE8D2",
		fontSize: 13,
		fontWeight: "700",
		marginLeft: 8,
	},

	ownerButton: {
		marginTop: 16,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	chatButton: {
		marginTop: 16,
		borderRadius: 18,
	},

	buttonLabel: {
		fontWeight: "800",
		fontSize: 15,
	},

	commentSection: {
		marginTop: 28,
		paddingTop: 24,
		borderTopWidth: 1,
		borderColor: "#203A25",
	},

	sectionTitle: {
		fontSize: 21,
		fontWeight: "900",
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
		fontWeight: "600",
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
