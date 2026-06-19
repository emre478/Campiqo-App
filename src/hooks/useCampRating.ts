import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { rateCamp } from "../services/campRatingService";

export const useCampRating = (
	campId: string,
	initialRating?: number,
	onSuccess?: () => void
) => {
	const [selectedRating, setSelectedRating] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (initialRating !== null && initialRating !== undefined) {
			setSelectedRating(initialRating);
		}
	}, [initialRating]);

	const handleRate = async () => {
		if (!selectedRating) {
			Alert.alert("Uyarı", "Lütfen bir puan seç.");
			return;
		}

		try {
			setLoading(true);

			await rateCamp(campId, selectedRating);

			Alert.alert("Başarılı", "Puanınız kaydedildi.");

			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			console.log(error);
			Alert.alert("Hata", "Puan verilirken bir hata oluştu.");
		} finally {
			setLoading(false);
		}
	};

	return {
		selectedRating,
		setSelectedRating,
		handleRate,
		loading,
	};
};
