import React from "react";
import {
	ScrollView,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileMenuItem from "../../components/profile/ProfileMenuItem";
import ProfileStats from "../../components/profile/ProfileStats";

import { useUserProfile } from "../../hooks/useUserProfile";

const UserProfileScreen = ({ route, navigation }) => {
	const { userId } = route.params;

	const { profile, loading } = useUserProfile(userId);

	if (loading || !profile) {
		return null;
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.header}>
					<View>
						<Text style={styles.title}>Kullanıcı Profili</Text>
						<Text style={styles.subtitle}>Kamp geçmişi ve bilgiler</Text>
					</View>

					<View style={styles.headerIcon}>
						<MaterialCommunityIcons
							name="account-outline"
							size={26}
							color="#8DD69A"
						/>
					</View>
				</View>

				<ProfileHeader profile={profile} />

				<ProfileStats
					createdCount={profile.createdCampCount}
					joinedCount={profile.joinedCampCount}
				/>

				<View style={styles.sectionHeader}>
					<MaterialCommunityIcons
						name="tent"
						size={18}
						color="#6DA878"
					/>
					<Text style={styles.sectionTitle}>Kamplar</Text>
				</View>

				<View style={styles.menuGroup}>
					<ProfileMenuItem
						icon="tent"
						title="Oluşturduğu Kamplar"
						onPress={() =>
							navigation.navigate("UserCreatedCamps", {
								userId,
							})
						}
					/>

					<ProfileMenuItem
						icon="handshake-outline"
						title="Katıldığı Kamplar"
						onPress={() =>
							navigation.navigate("UserJoinedCamps", {
								userId,
							})
						}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default UserProfileScreen;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#07130B",
	},

	container: {
		flex: 1,
	},

	scrollContent: {
		paddingHorizontal: 20,
		paddingTop: 8,
		paddingBottom: 40,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},

	title: {
		fontSize: 28,
		fontWeight: "900",
		color: "#F4F7EF",
		letterSpacing: -0.5,
	},

	subtitle: {
		fontSize: 14,
		color: "#91A091",
		marginTop: 4,
		fontWeight: "600",
	},

	headerIcon: {
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginTop: 24,
		marginBottom: 4,
	},

	sectionTitle: {
		fontSize: 16,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	menuGroup: {
		marginHorizontal: -20,
	},
});
