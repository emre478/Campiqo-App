import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const CampCard = ({ camp }) => {
	return (
		<TouchableOpacity style={styles.card}>
			<Image
				source={{ uri: camp.imageUrl }}
				style={styles.image}
			/>

			<View style={styles.content}>
				<Text style={styles.title}>
					{camp.title}
				</Text>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={16}
						color="#666"
					/>

					<Text style={styles.text}>
						{camp.location}
					</Text>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="account-group-outline"
						size={16}
						color="#666"
					/>

					<Text style={styles.text}>
						{camp.participantCount}/
						{camp.maxParticipantCount}
					</Text>
				</View>
			</View>

			<MaterialCommunityIcons
				name="bookmark-outline"
				size={24}
				color="#666"
			/>
		</TouchableOpacity>
	);
};

export default CampCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 10,
		marginBottom: 15,
		flexDirection: "row",
		alignItems: "center",
		elevation: 3,
	},

	image: {
		width: 110,
		height: 110,
		borderRadius: 15,
	},

	content: {
		flex: 1,
		marginLeft: 12,
	},

	title: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 10,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},

	text: {
		marginLeft: 5,
		color: "#666",
	},
});