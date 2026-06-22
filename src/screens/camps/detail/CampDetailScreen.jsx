import React, { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CampActionButton from "../../../components/camps/CampActionButton";
import CampHeader from "../../../components/camps/CampHeader";
import CampHeroCard from "../../../components/camps/CampHeroCard";
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
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.scrollContent}
		>
			<CampHeader
				imageSource={imageSource}
				isFavorited={isFavorited}
				onFavorite={handleFavorite}
				onBack={() => navigation.goBack()}
				categoryName={camp.categoryName}
			/>

			<CampHeroCard
				title={camp.title}
				location={camp.location}
				averageRating={camp.averageRating || 0}
				ratingCount={camp.ratingCount || 0}
				formattedStartDate={formattedStartDate}
				formattedEndDate={formattedEndDate}
				startDate={camp.startDate}
				endDate={camp.endDate}
				participantCount={camp.participantCount}
				maxParticipantCount={camp.maxParticipantCount}
				category={camp.category}
				categoryName={camp.categoryName}
				ownerName={camp.ownerName}
			/>

			<View style={styles.content}>
				<CampInfoCard camp={camp} />

				{camp.isOwner && (
					<TouchableOpacity
						style={styles.outlineButton}
						onPress={() =>
							navigation.navigate("CampJoinRequests", {
								campId: camp.id,
							})
						}
						activeOpacity={0.85}
					>
						<MaterialCommunityIcons
							name="account-clock-outline"
							size={20}
							color="#8DD69A"
						/>
						<Text style={styles.outlineButtonText}>
							Katılım İsteklerini Gör
						</Text>
					</TouchableOpacity>
				)}

				{camp.isCompleted && camp.isParticipant && (
					<View style={styles.section}>
						<CampRatingCard
							campId={camp.id}
							myRating={camp.myRating}
							averageRating={camp.averageRating}
							ratingCount={camp.ratingCount}
							onRated={loadCamp}
						/>
					</View>
				)}

				{(camp.isParticipant || camp.isOwner) && (
					<TouchableOpacity
						style={styles.primaryButton}
						onPress={() =>
							navigation.navigate("Chat", {
								campId: camp.id,
								campTitle: camp.title,
								participantCount: camp.participantCount,
								maxParticipantCount: camp.maxParticipantCount,
							})
						}
						activeOpacity={0.85}
					>
						<MaterialCommunityIcons
							name="chat-outline"
							size={20}
							color="#F4F7EF"
						/>
						<Text style={styles.primaryButtonText}>Sohbete Git</Text>
					</TouchableOpacity>
				)}

				{camp.isCompleted && (
					<View style={styles.commentSection}>
						<View style={styles.sectionHeader}>
							<MaterialCommunityIcons
								name="comment-text-outline"
								size={20}
								color="#6DA878"
							/>
							<Text style={styles.commentTitle}>Yorumlar</Text>
							<View style={styles.commentBadge}>
								<Text style={styles.commentBadgeText}>
									{comments.length}
								</Text>
							</View>
						</View>

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
		backgroundColor: "#07130B",
	},

	scrollContent: {
		paddingBottom: 40,
	},

	content: {
		paddingHorizontal: 20,
		paddingTop: 16,
		gap: 14,
	},

	section: {
		marginTop: 2,
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 14,
	},

	outlineButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#132617",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#203A25",
		height: 52,
	},

	outlineButtonText: {
		color: "#F4F7EF",
		fontWeight: "800",
		fontSize: 15,
	},

	primaryButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#2E7D32",
		borderRadius: 20,
		height: 52,
	},

	primaryButtonText: {
		color: "#F4F7EF",
		fontWeight: "800",
		fontSize: 15,
	},

	commentSection: {
		marginTop: 8,
	},

	commentTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",
		flex: 1,
	},

	commentBadge: {
		backgroundColor: "#0D1C10",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
	},

	commentBadgeText: {
		color: "#8DD69A",
		fontSize: 12,
		fontWeight: "800",
	},
});
