import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfileHeader = ({ profile }) => {
	return (
		<View style={styles.profileCard}>
			<View style={styles.avatar}>
				<Text style={styles.avatarText}>
					{profile?.firstName?.charAt(0)}
				</Text>
			</View>

			<Text style={styles.name}>
				{profile?.firstName} {profile?.lastName}
			</Text>

			{profile?.email && <Text style={styles.email}>{profile.email}</Text>}

			<View style={styles.badge}>
				<Text style={styles.badgeText}>{profile?.experienceLevelName}</Text>
			</View>

			<Text style={styles.city}>📍 {profile?.city}</Text>

			<Text style={styles.bio}>{profile?.bio}</Text>
		</View>
	);
};

export default ProfileHeader;

const styles = StyleSheet.create({
	profileCard: {
		backgroundColor: "#2E6F37",
		paddingTop: 50,
		paddingBottom: 90,
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40,
		alignItems: "center",
	},

	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: "#4F8F5F",
	},

	avatarText: {
		fontSize: 42,
		fontWeight: "700",
		color: "#fff",
	},

	name: {
		fontSize: 32,
		fontWeight: "900",
		color: "#fff",
	},

	email: {
		fontSize: 15,
		color: "#D8E3D8",
		marginTop: 6,
	},

	badge: {
		marginTop: 12,
		backgroundColor: "rgba(255,255,255,0.15)",
		borderRadius: 18,
		paddingHorizontal: 14,
		paddingVertical: 8,
	},

	badgeText: {
		color: "#2E7D32",
		fontWeight: "700",
	},

	city: {
		marginTop: 10,
		color: "#DDE7DD",
	},

	bio: {
		marginTop: 10,
		fontSize: 16,
		color: "#D8E3D8",
		textAlign: "center",
	},
});
