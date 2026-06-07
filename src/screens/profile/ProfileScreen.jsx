import React, { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

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
			<View style={styles.profileCard}>
				<View style={styles.avatar}>
					<Text style={styles.avatarText}>
						{profile?.firstName?.charAt(0)}
					</Text>
				</View>

				<Text style={styles.name}>
					{profile?.firstName} {profile?.lastName}
				</Text>

				<Text style={styles.email}>{profile?.email}</Text>

				<View style={styles.badge}>
					<Text style={styles.badgeText}>
						{profile?.experienceLevelName}
					</Text>
				</View>

				<Text style={styles.city}>📍 {profile?.city}</Text>

				<Text style={styles.bio}>{profile?.bio}</Text>
			</View>

			<View style={styles.statsCard}>
				<View style={styles.statItem}>
					<Text style={styles.statNumber}>{createdCount}</Text>

					<Text style={styles.statLabel}>Oluşturduğum</Text>
				</View>

				<View style={styles.divider} />

				<View style={styles.statItem}>
					<Text style={styles.statNumber}>{joinedCount}</Text>

					<Text style={styles.statLabel}>Katıldığım</Text>
				</View>
			</View>

			<TouchableOpacity style={styles.actionCard}>
				<Text style={styles.actionText}>🏕️ Oluşturduğum Kamplar</Text>

				<Text style={styles.arrow}>›</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.actionCard}>
				<Text style={styles.actionText}>🤝 Katıldığım Kamplar</Text>

				<Text style={styles.arrow}>›</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.actionCard}>
				<Text style={styles.actionText}>✏️ Profili Düzenle</Text>

				<Text style={styles.arrow}>›</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.logoutCard}>
				<Text style={styles.logoutText}>🚪 Çıkış Yap</Text>
			</TouchableOpacity>

			<View style={{ height: 30 }} />
		</ScrollView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F7FB",
	},

	profileCard: {
		backgroundColor: "#FFFFFF",

		marginHorizontal: 20,
		marginTop: 30,

		paddingVertical: 30,
		paddingHorizontal: 24,

		borderRadius: 24,

		alignItems: "center",

		elevation: 4,

		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: 4,
		},
	},

	avatar: {
		width: 100,
		height: 100,

		borderRadius: 50,

		backgroundColor: "#2E7D32",

		justifyContent: "center",
		alignItems: "center",

		marginBottom: 16,
	},

	avatarText: {
		fontSize: 38,
		fontWeight: "700",
		color: "#fff",
	},

	name: {
		fontSize: 28,
		fontWeight: "700",
		color: "#222",
	},

	email: {
		fontSize: 14,
		color: "#777",
		marginTop: 6,
	},

	badge: {
		backgroundColor: "#E8F5E9",

		paddingHorizontal: 16,
		paddingVertical: 8,

		borderRadius: 20,

		marginTop: 14,
	},

	badgeText: {
		fontWeight: "600",
		color: "#2E7D32",
	},

	city: {
		marginTop: 14,
		fontSize: 15,
		color: "#666",
	},

	bio: {
		marginTop: 10,
		fontSize: 15,
		color: "#444",
		textAlign: "center",
	},

	statsCard: {
		backgroundColor: "#fff",

		marginHorizontal: 20,
		marginTop: 16,
		marginBottom: 20,

		paddingVertical: 24,

		borderRadius: 24,

		flexDirection: "row",

		elevation: 3,
	},

	statItem: {
		flex: 1,
		alignItems: "center",
	},

	statNumber: {
		fontSize: 30,
		fontWeight: "700",
		color: "#2E7D32",
	},

	statLabel: {
		fontSize: 14,
		color: "#666",
		marginTop: 4,
	},

	divider: {
		width: 1,
		height: 45,
		backgroundColor: "#E0E0E0",
	},

	actionCard: {
		backgroundColor: "#fff",

		marginHorizontal: 20,
		marginBottom: 12,

		paddingHorizontal: 20,
		paddingVertical: 18,

		borderRadius: 18,

		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",

		elevation: 2,
	},

	actionText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#222",
	},

	arrow: {
		fontSize: 26,
		color: "#999",
	},

	logoutCard: {
		backgroundColor: "#FFEBEE",

		marginHorizontal: 20,
		marginTop: 8,

		paddingVertical: 18,

		borderRadius: 18,

		alignItems: "center",
	},

	logoutText: {
		fontSize: 16,
		fontWeight: "700",
		color: "#D32F2F",
	},
});
