import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const PopularCampCard = ({
	title,
	location,
	date,
	participants,
	image,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={styles.card}
			onPress={onPress}
			activeOpacity={0.9}
		>
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
						color="#7FB28A"
					/>

					<Text style={styles.text}>{location}</Text>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons name="calendar" size={16} color="#7FB28A" />

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
		</TouchableOpacity>
	);
};

export default PopularCampCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",
		borderRadius: 22,
		marginHorizontal: 20,
		marginBottom: 14,
		flexDirection: "row",
		padding: 12,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	image: {
		width: 110,
		height: 110,
		borderRadius: 18,
	},

	content: {
		flex: 1,
		marginLeft: 12,
		justifyContent: "center",
	},

	title: {
		fontSize: 19,
		fontWeight: "800",
		color: "#F4F7EF",
		marginBottom: 10,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},

	text: {
		marginLeft: 6,
		color: "#AEBDAE",
	},
});
