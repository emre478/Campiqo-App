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
		<>
			<View style={styles.row}>
				<MaterialCommunityIcons
					name="map-marker-outline"
					size={20}
					color="#666"
				/>

				<Text style={styles.text}>{location}</Text>
			</View>

			<View style={styles.row}>
				<MaterialCommunityIcons
					name="calendar-range"
					size={20}
					color="#666"
				/>

				<Text style={styles.text}>
					{formattedStartDate} - {formattedEndDate}
				</Text>
			</View>

			<View style={styles.row}>
				<MaterialCommunityIcons
					name="account-group-outline"
					size={20}
					color="#666"
				/>

				<Text style={styles.text}>
					{participantCount}/{maxParticipantCount}
				</Text>
			</View>
		</>
	);
};

export default CampMetaInfo;

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},

	text: {
		marginLeft: 8,
		fontSize: 16,
		color: "#666",
	},
});
