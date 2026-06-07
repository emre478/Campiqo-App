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

			<Text style={styles.email}>{profile?.email}</Text>

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
		backgroundColor: "#fff",
		marginHorizontal: 20,
		marginTop: 20,
		padding: 28,
		borderRadius: 28,
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
		width: 110,
		height: 110,
		borderRadius: 55,
		backgroundColor: "#2E7D32",

		justifyContent: "center",
		alignItems: "center",

		marginBottom: 18,
	},

	avatarText: {
		fontSize: 42,
		fontWeight: "700",
		color: "#fff",
	},

	name: {
		fontSize: 32,
		fontWeight: "700",
		color: "#222",
	},

	email: {
		fontSize: 15,
		color: "#777",
		marginTop: 6,
	},

	badge: {
		backgroundColor: "#E8F5E9",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		marginTop: 16,
	},

	badgeText: {
		color: "#2E7D32",
		fontWeight: "700",
	},

	city: {
		marginTop: 16,
		fontSize: 16,
		color: "#666",
	},

	bio: {
		marginTop: 10,
		fontSize: 16,
		color: "#444",
		textAlign: "center",
	},
});
