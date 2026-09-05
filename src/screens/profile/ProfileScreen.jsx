import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileMenuItem from "../../components/profile/ProfileMenuItem";
import ProfileStats from "../../components/profile/ProfileStats";
import { logoutCurrentSession } from "../../features/auth/logout";
import { logout } from "../../redux/slices/authSlice";
import { setProfile } from "../../redux/slices/profileSlice";
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
			await logoutCurrentSession();

			dispatch(logout());

			navigation.reset({
				index: 0,
				routes: [{ name: "Login" }],
			});
		} catch {
			Alert.alert(
				"Çıkış yapılamadı",
				"Güvenli oturum bilgileri temizlenemedi. Lütfen tekrar dene."
			);
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.header}>
					<View>
						<Text style={styles.title}>Profil</Text>
						<Text style={styles.subtitle}>Hesap bilgilerin</Text>
					</View>

					<View style={styles.headerIcon}>
						<MaterialCommunityIcons
							name="account-circle-outline"
							size={28}
							color="#8DD69A"
						/>
					</View>
				</View>

				<ProfileHeader profile={profile} />

				<ProfileStats
					createdCount={createdCount}
					joinedCount={joinedCount}
				/>

				<View style={styles.sectionHeader}>
					<MaterialCommunityIcons
						name="cog-outline"
						size={18}
						color="#6DA878"
					/>
					<Text style={styles.sectionTitle}>Hesap</Text>
				</View>

				<View style={styles.menuGroup}>
					<ProfileMenuItem
						icon="tent"
						title="Oluşturduğum Kamplar"
						onPress={() => navigation.navigate("MyCreatedCamps")}
					/>

					<ProfileMenuItem
						icon="handshake-outline"
						title="Katıldığım Kamplar"
						onPress={() => navigation.navigate("MyJoinedCamps")}
					/>

					<ProfileMenuItem
						icon="account-edit-outline"
						title="Profili Düzenle"
						onPress={() => navigation.navigate("EditProfile")}
					/>

					<ProfileMenuItem
						icon="logout"
						title="Çıkış Yap"
						danger
						onPress={handleLogout}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ProfileScreen;

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
		paddingBottom: 100,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},

	title: {
		fontSize: 32,
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
