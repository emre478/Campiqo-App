import React, { useState } from "react";
import {
	Dimensions,
	Image,
	Modal,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SERVER_URL } from "../../constants/apiConstants";

const resolveImageUri = (profileImageUrl) => {
	if (!profileImageUrl) return null;

	if (
		profileImageUrl.startsWith("http") ||
		profileImageUrl.startsWith("file")
	) {
		return profileImageUrl;
	}

	return `${SERVER_URL}${profileImageUrl}`;
};

const ProfileHeader = ({ profile }) => {
	const [previewVisible, setPreviewVisible] = useState(false);

	const imageUri = resolveImageUri(profile?.profileImageUrl);
	const imageSource = imageUri ? { uri: imageUri } : null;

	const initials = `${profile?.firstName?.charAt(0) || ""}${profile?.lastName?.charAt(0) || ""}`;
	const fullName = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();

	return (
		<View style={styles.profileCard}>
			{imageSource ? (
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() => setPreviewVisible(true)}
				>
					<View style={styles.avatar}>
						<Image source={imageSource} style={styles.avatarImage} />
						<View style={styles.expandBadge}>
							<MaterialCommunityIcons
								name="magnify-plus-outline"
								size={14}
								color="#F4F7EF"
							/>
						</View>
					</View>
				</TouchableOpacity>
			) : (
				<View style={styles.avatar}>
					<Text style={styles.avatarText}>{initials || "?"}</Text>
				</View>
			)}

			<Text style={styles.name}>{fullName}</Text>

			{profile?.email ? (
				<View style={styles.emailRow}>
					<MaterialCommunityIcons
						name="email-outline"
						size={15}
						color="#91A091"
					/>
					<Text style={styles.email}>{profile.email}</Text>
				</View>
			) : null}

			{profile?.experienceLevelName ? (
				<View style={styles.badge}>
					<MaterialCommunityIcons
						name="medal-outline"
						size={14}
						color="#8DD69A"
					/>
					<Text style={styles.badgeText}>
						{profile.experienceLevelName}
					</Text>
				</View>
			) : null}

			{profile?.city ? (
				<View style={styles.cityRow}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={15}
						color="#6DA878"
					/>
					<Text style={styles.city}>{profile.city}</Text>
				</View>
			) : null}

			{profile?.bio ? (
				<Text style={styles.bio}>{profile.bio}</Text>
			) : null}

			<Modal
				visible={previewVisible}
				animationType="fade"
				transparent={false}
				statusBarTranslucent
				onRequestClose={() => setPreviewVisible(false)}
			>
				<View style={styles.modalRoot}>
					<SafeAreaView style={styles.modalSafeArea}>
						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setPreviewVisible(false)}
							activeOpacity={0.85}
						>
							<MaterialCommunityIcons
								name="close"
								size={24}
								color="#F4F7EF"
							/>
						</TouchableOpacity>

						<View style={styles.modalContent}>
							{imageSource ? (
								<Image
									source={imageSource}
									style={styles.previewImage}
									resizeMode="contain"
								/>
							) : null}

							{fullName ? (
								<Text style={styles.previewName}>{fullName}</Text>
							) : null}
						</View>
					</SafeAreaView>
				</View>
			</Modal>
		</View>
	);
};

export default ProfileHeader;

const styles = StyleSheet.create({
	profileCard: {
		backgroundColor: "#132617",
		borderRadius: 24,
		padding: 20,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#203A25",
	},

	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#0D1C10",
		borderWidth: 2,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
		marginBottom: 14,
	},

	avatarImage: {
		width: "100%",
		height: "100%",
	},

	expandBadge: {
		position: "absolute",
		right: 4,
		bottom: 4,
		width: 26,
		height: 26,
		borderRadius: 13,
		backgroundColor: "rgba(0, 0, 0, 0.55)",
		alignItems: "center",
		justifyContent: "center",
	},

	avatarText: {
		fontSize: 36,
		fontWeight: "800",
		color: "#8DD69A",
	},

	name: {
		fontSize: 24,
		fontWeight: "900",
		color: "#F4F7EF",
		textAlign: "center",
	},

	emailRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginTop: 8,
	},

	email: {
		fontSize: 14,
		color: "#91A091",
		fontWeight: "600",
	},

	badge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginTop: 12,
		backgroundColor: "#0D1C10",
		borderRadius: 14,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},

	badgeText: {
		color: "#C5CEC4",
		fontWeight: "700",
		fontSize: 13,
	},

	cityRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginTop: 12,
	},

	city: {
		color: "#91A091",
		fontSize: 14,
		fontWeight: "600",
	},

	bio: {
		marginTop: 14,
		fontSize: 15,
		lineHeight: 24,
		color: "#C5CEC4",
		textAlign: "center",
	},

	modalRoot: {
		flex: 1,
		backgroundColor: "#07130B",
	},

	modalSafeArea: {
		flex: 1,
	},

	modalContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingBottom: 24,
	},

	closeButton: {
		alignSelf: "flex-end",
		marginTop: 8,
		marginRight: 16,
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
	},

	previewImage: {
		flex: 1,
		width: Dimensions.get("window").width - 32,
	},

	previewName: {
		marginTop: 20,
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",
		textAlign: "center",
	},
});
