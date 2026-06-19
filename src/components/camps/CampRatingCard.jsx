import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useCampRating } from "../../hooks/useCampRating";
import { getCampById } from "../../services/campService";
import StarRating from "./StarRating";

const CampRatingCard = ({ campId, myRating, averageRating, ratingCount }) => {
	const [campData, setCampData] = useState({
		averageRating,
		ratingCount,
	});
	const refreshCamp = async () => {
		try {
			const response = await getCampById(campId);

			setCampData({
				averageRating: response.data.averageRating,
				ratingCount: response.data.ratingCount,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const { selectedRating, setSelectedRating, handleRate, loading } =
		useCampRating(campId, myRating, refreshCamp);

	return (
		<View style={styles.card}>
			<Text style={styles.title}>Kampı Değerlendir</Text>

			<StarRating rating={selectedRating} onChange={setSelectedRating} />

			<Text style={styles.average}>
				Ortalama Puan: {campData.averageRating} ⭐
			</Text>

			<Text style={styles.count}>
				Toplam Değerlendirme: {campData.ratingCount}
			</Text>

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
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 20,
		marginTop: 12,
		marginBottom: 12,

		elevation: 4,

		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},

	title: {
		fontSize: 18,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 16,
	},

	average: {
		textAlign: "center",
		marginTop: 16,
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
		borderRadius: 12,
	},
});
