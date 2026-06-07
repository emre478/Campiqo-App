import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileMenuItem from "../../components/profile/ProfileMenuItem";
import ProfileStats from "../../components/profile/ProfileStats";

import {
	getMyCreatedCamps,
	getMyJoinedCamps,
} from "../../services/myCampService";

import { getMyProfile } from "../../services/userService";

const ProfileScreen = () => {
	const [profile, setProfile] = useState(null);
	const [createdCount, setCreatedCount] = useState(0);
	const [joinedCount, setJoinedCount] = useState(0);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			const profileResponse = await getMyProfile();
			const createdResponse = await getMyCreatedCamps();
			const joinedResponse = await getMyJoinedCamps();

			setProfile(profileResponse.data);

			setCreatedCount(createdResponse.data?.length || 0);

			setJoinedCount(joinedResponse.data?.length || 0);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<ProfileHeader profile={profile} />

			<ProfileStats createdCount={createdCount} joinedCount={joinedCount} />

			<ProfileMenuItem
				icon="🏕️"
				title="Oluşturduğum Kamplar"
				onPress={() => console.log("Created Camps")}
			/>

			<ProfileMenuItem
				icon="🤝"
				title="Katıldığım Kamplar"
				onPress={() => console.log("Joined Camps")}
			/>

			<ProfileMenuItem
				icon="✏️"
				title="Profili Düzenle"
				onPress={() => console.log("Edit Profile")}
			/>

			<ProfileMenuItem
				icon="🚪"
				title="Çıkış Yap"
				danger
				onPress={() => console.log("Logout")}
			/>
		</ScrollView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F7FB",
	},
});
