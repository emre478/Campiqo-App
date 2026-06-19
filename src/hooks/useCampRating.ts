import { useEffect, useState } from "react";
import { rateCamp } from "../services/campRatingService";

export const useCampRating = (campId: string, initialRating?: number) => {
	const [selectedRating, setSelectedRating] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (initialRating) {
			setSelectedRating(initialRating);
		}
	}, [initialRating]);

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
