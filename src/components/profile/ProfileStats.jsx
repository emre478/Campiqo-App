import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileStats = ({ createdCount, joinedCount }) => {
	return (
		<View style={styles.statsCard}>
			<View style={styles.statItem}>
				<View style={styles.statIconWrap}>
					<MaterialCommunityIcons name="tent" size={18} color="#8DD69A" />
				</View>
				<Text style={styles.statNumber}>{createdCount}</Text>
				<Text style={styles.statLabel}>Oluşturduğum</Text>
			</View>

			<View style={styles.divider} />

			<View style={styles.statItem}>
				<View style={styles.statIconWrap}>
					<MaterialCommunityIcons
						name="handshake-outline"
						size={18}
						color="#8DD69A"
					/>
				</View>
				<Text style={styles.statNumber}>{joinedCount}</Text>
				<Text style={styles.statLabel}>Katıldığım</Text>
			</View>
		</View>
	);
};

export default ProfileStats;

const styles = StyleSheet.create({
	statsCard: {
		marginTop: 16,
		backgroundColor: "#132617",
		borderRadius: 24,
		paddingVertical: 22,
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "#203A25",
	},

	statItem: {
		flex: 1,
		alignItems: "center",
	},

	statIconWrap: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#0D1C10",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},

	statNumber: {
		fontSize: 28,
		fontWeight: "900",
		color: "#8DD69A",
	},

	statLabel: {
		marginTop: 4,
		fontSize: 12,
		fontWeight: "600",
		color: "#91A091",
	},

	divider: {
		width: 1,
		height: 72,
		backgroundColor: "#203A25",
		alignSelf: "center",
	},
});
