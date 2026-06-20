import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const PopularCampCard = ({ title, location, date, participants, image }) => {
	return (
		<View style={styles.card}>
			<Image
				source={{
					uri:
						image && image !== "string"
							? image
							: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
				}}
				style={styles.image}
			/>

			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={16}
						color="#666"
					/>

					<Text style={styles.text}>{location}</Text>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons name="calendar" size={16} color="#666" />

					<Text style={styles.text}>{date}</Text>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="account-group-outline"
						size={16}
						color="#666"
					/>

					<Text style={styles.text}>Katılım: {participants}</Text>
				</View>
			</View>
		</View>
	);
};

export default PopularCampCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 20,
		marginHorizontal: 20,
		marginBottom: 15,
		flexDirection: "row",
		padding: 10,
		elevation: 3,
	},

	image: {
		width: 120,
		height: 120,
		borderRadius: 16,
	},

	content: {
		flex: 1,
		marginLeft: 12,
		justifyContent: "center",
	},

	title: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 10,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},

	text: {
		marginLeft: 5,
		color: "#666",
	},
});
