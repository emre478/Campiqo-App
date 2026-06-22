import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const CampMetaInfo = ({
	location,
	formattedStartDate,
	formattedEndDate,
	participantCount,
	maxParticipantCount,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.infoCard}>
				<MaterialCommunityIcons
					name="map-marker-outline"
					size={18}
					color="#6DA878"
				/>

				<Text style={styles.text}>{location}</Text>
			</View>

			<View style={styles.infoCard}>
				<MaterialCommunityIcons
					name="calendar-range"
					size={18}
					color="#6DA878"
				/>

				<Text style={styles.text}>{formattedStartDate}</Text>
			</View>

			<View style={styles.infoCard}>
				<MaterialCommunityIcons
					name="account-group-outline"
					size={18}
					color="#6DA878"
				/>

				<Text style={styles.text}>
					{participantCount}/{maxParticipantCount}
				</Text>
			</View>
		</View>
	);
};

export default CampMetaInfo;

const styles = StyleSheet.create({
	container: {
		marginTop: 18,
	},
	infoCard: {
		flexDirection: "row",
		alignItems: "center",

		backgroundColor: "#132617",

		paddingVertical: 12,
		paddingHorizontal: 14,

		borderRadius: 16,

		marginBottom: 10,

		borderWidth: 1,
		borderColor: "#203A25",
	},
	text: {
		marginLeft: 10,
		fontSize: 14,
		fontWeight: "600",
		color: "#D7DED7",
	},
});
