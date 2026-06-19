import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import StarRating from "./StarRating";

const CampRatingCard = ({
	rating,
	onChangeRating,
	onSubmit,
	averageRating,
	ratingCount,
}) => {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>Kampı Değerlendir</Text>

			<StarRating rating={rating} onChange={onChangeRating} />

			<Text style={styles.average}>Ortalama Puan: {averageRating} ⭐</Text>

			<Text style={styles.count}>Toplam Değerlendirme: {ratingCount}</Text>

			<Button
				mode="contained"
				buttonColor="#2E7D32"
				onPress={onSubmit}
				style={styles.button}
			>
				Puan Ver
			</Button>
		</View>
	);
};

export default CampRatingCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 20,
		marginBottom: 20,
	},

	title: {
		fontSize: 18,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 15,
	},

	average: {
		textAlign: "center",
		marginTop: 15,
		fontSize: 15,
		fontWeight: "600",
	},

	count: {
		textAlign: "center",
		marginTop: 4,
		color: "#666",
	},

	button: {
		marginTop: 16,
	},
});
