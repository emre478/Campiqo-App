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
		marginTop: -50,
		marginHorizontal: 20,

		backgroundColor: "#132617",

		borderRadius: 28,

		paddingVertical: 28,

		flexDirection: "row",

		borderWidth: 1,
		borderColor: "#203A25",
	},

	statItem: {
		flex: 1,
		alignItems: "center",
	},

	statNumber: {
		fontSize: 34,
		fontWeight: "900",
		color: "#fff",
	},

	statLabel: {
		color: "#AEBDAE",
	},

	divider: {
		width: 1,
		height: 45,
		backgroundColor: "#E5E5E5",
	},
});
