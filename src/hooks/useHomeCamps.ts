import { useEffect, useMemo, useState } from "react";
import { getCamps } from "../services/campService";
import { Camp } from "../types/Camp";

export const useHomeCamps = () => {
	const [camps, setCamps] = useState<Camp[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [refreshing, setRefreshing] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<number | null>(
		null
	);

	useEffect(() => {
		loadCamps();
	}, []);

	const loadCamps = async () => {
		try {
			setLoading(true);

			const response = await getCamps();

			setCamps(response.data.items || []);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const filteredCamps = useMemo(() => {
		let result = camps;

		if (searchText.trim()) {
			const value = searchText.toLowerCase();

			result = result.filter(
				(camp) =>
					camp.title?.toLowerCase().includes(value) ||
					camp.location?.toLowerCase().includes(value)
			);
		}

		if (selectedCategory) {
			result = result.filter((camp) => camp.category === selectedCategory);
		}

		return result;
	}, [camps, searchText, selectedCategory]);

	const upcomingCamps = useMemo(() => {
		const now = new Date();

		return filteredCamps
			.filter((camp) => new Date(camp.startDate) >= now)
			.sort(
				(a, b) =>
					new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
			)
			.slice(0, 5);
	}, [filteredCamps]);

	const popularCamps = useMemo(() => {
		return [...filteredCamps]
			.sort((a, b) => (b.participantCount || 0) - (a.participantCount || 0))
			.slice(0, 5);
	}, [filteredCamps]);

	const refreshCamps = async () => {
		try {
			setRefreshing(true);

			await loadCamps();
		} finally {
			setRefreshing(false);
		}
	};

	return {
		loading,
		searchText,
		setSearchText,
		upcomingCamps,
		popularCamps,
		loadCamps,
		refreshing,
		refreshCamps,
		selectedCategory,
		setSelectedCategory,
	};
};
