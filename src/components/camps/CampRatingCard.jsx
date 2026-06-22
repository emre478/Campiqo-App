import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useCampRating } from "../../hooks/useCampRating";
import StarRating from "./StarRating";

const CampRatingCard = ({
	campId,
	myRating,
	averageRating,
	ratingCount,
	onRated,
}) => {
	const refreshCamp = async () => {
		if (onRated) {
			await onRated();
		}
	};
	const { selectedRating, setSelectedRating, handleRate, loading } =
		useCampRating(campId, myRating, refreshCamp);

	return (
		<View style={styles.card}>
			<Text style={styles.title}>Kampı Değerlendir</Text>

			<StarRating rating={selectedRating} onChange={setSelectedRating} />

			<Text style={styles.average}>Ortalama Puan: {averageRating} ⭐</Text>

			<Text style={styles.count}>Toplam Değerlendirme: {ratingCount}</Text>

			<Button
				mode="contained"
				buttonColor="#2E7D32"
				onPress={handleRate}
				loading={loading}
				disabled={loading}
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
		backgroundColor: "#132617",
		borderRadius: 22,
		padding: 20,
		marginTop: 14,
		marginBottom: 14,

		borderWidth: 1,
		borderColor: "#203A25",
	},

	title: {
		fontSize: 20,
		fontWeight: "800",
		textAlign: "center",
		color: "#F4F7EF",
		marginBottom: 18,
	},

	average: {
		textAlign: "center",
		marginTop: 18,
		fontSize: 18,
		fontWeight: "800",
		color: "#FFD34D",
	},

	count: {
		textAlign: "center",
		marginTop: 4,
		color: "#91A091",
	},

	button: {
		marginTop: 18,
		borderRadius: 16,
	},
});
