import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileMenuItem from "../../components/profile/ProfileMenuItem";
import ProfileStats from "../../components/profile/ProfileStats";
import { logout } from "../../redux/slices/authSlice";
import { setProfile } from "../../redux/slices/profileSlice";
import { removeToken } from "../../services/tokenService";

import {
	getMyCreatedCamps,
	getMyJoinedCamps,
} from "../../services/myCampService";

import { getMyProfile } from "../../services/userService";

const ProfileScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const profile = useSelector((state) => state.profile.data);
	const [createdCount, setCreatedCount] = useState(0);
	const [joinedCount, setJoinedCount] = useState(0);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			const profileResponse = await getMyProfile();
			dispatch(setProfile(profileResponse.data));
			const createdResponse = await getMyCreatedCamps();
			const joinedResponse = await getMyJoinedCamps();

			setProfile(profileResponse.data);

			setCreatedCount(createdResponse.data?.length || 0);

			setJoinedCount(joinedResponse.data?.length || 0);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogout = async () => {
		try {
			await removeToken();

			dispatch(logout());

			navigation.reset({
				index: 0,
				routes: [{ name: "Login" }],
			});
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
				onPress={() => navigation.navigate("MyCreatedCamps")}
			/>

			<ProfileMenuItem
				icon="🤝"
				title="Katıldığım Kamplar"
				onPress={() => navigation.navigate("MyJoinedCamps")}
			/>

			<ProfileMenuItem
				icon="✏️"
				title="Profili Düzenle"
				onPress={() => navigation.navigate("EditProfile")}
			/>

			<ProfileMenuItem
				icon="🚪"
				title="Çıkış Yap"
				danger
				onPress={handleLogout}
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
