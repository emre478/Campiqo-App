import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfileStats = ({ createdCount, joinedCount }) => {
	return (
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
	);
};

export default ProfileStats;

const styles = StyleSheet.create({
	statsCard: {
		backgroundColor: "#fff",

		marginHorizontal: 20,
		marginTop: 18,

		paddingVertical: 24,

		borderRadius: 24,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",

		elevation: 4,

		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: 4,
		},
	},

	statItem: {
		flex: 1,
		alignItems: "center",
	},

	statNumber: {
		fontSize: 34,
		fontWeight: "700",
		color: "#2E7D32",
	},

	statLabel: {
		fontSize: 15,
		color: "#666",
		marginTop: 6,
	},

	divider: {
		width: 1,
		height: 45,
		backgroundColor: "#E5E5E5",
	},
});
