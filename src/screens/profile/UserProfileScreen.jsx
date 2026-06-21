import React from "react";
import { ScrollView, StyleSheet } from "react-native";

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
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<ProfileHeader profile={profile} />

			<ProfileStats
				createdCount={profile.createdCampCount}
				joinedCount={profile.joinedCampCount}
			/>

			<ProfileMenuItem
				icon="🏕️"
				title="Oluşturduğu Kamplar"
				onPress={() =>
					navigation.navigate("UserCreatedCamps", {
						userId,
					})
				}
			/>

			<ProfileMenuItem
				icon="🤝"
				title="Katıldığı Kamplar"
				onPress={() =>
					navigation.navigate("UserJoinedCamps", {
						userId,
					})
				}
			/>
		</ScrollView>
	);
};

export default UserProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F7FB",
	},
});
