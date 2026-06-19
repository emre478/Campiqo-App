import { useState } from "react";
import { rateCamp } from "../services/campRatingService";

export const useCampRating = (campId: string) => {
	const [selectedRating, setSelectedRating] = useState(0);
	const [loading, setLoading] = useState(false);

	const handleRate = async () => {
		if (!selectedRating) return;

		try {
			setLoading(true);

			await rateCamp(campId, selectedRating);

			return true;
		} catch (error) {
			console.log(error);
			return false;
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
