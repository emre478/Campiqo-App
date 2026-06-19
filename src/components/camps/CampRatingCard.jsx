import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useCampRating } from "../../hooks/useCampRating";
import StarRating from "./StarRating";

const CampRatingCard = ({ campId, myRating, averageRating, ratingCount }) => {
	const [campData, setCampData] = useState({
		averageRating,
		ratingCount,
	});
	const { selectedRating, setSelectedRating, handleRate, loading } =
		useCampRating(campId, myRating);
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
