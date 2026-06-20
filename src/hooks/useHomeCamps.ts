import { useEffect, useMemo, useState } from "react";
import { getCamps } from "../services/campService";
import { Camp } from "../types/Camp";

export const useHomeCamps = () => {
	const [camps, setCamps] = useState<Camp[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		loadCamps();
	}, []);

	const loadCamps = async () => {
		try {
			setLoading(true);

			const response = await getCamps();

			setCamps(response.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const filteredCamps = useMemo(() => {
		if (!searchText.trim()) {
			return camps;
		}

		const value = searchText.toLowerCase();

		return camps.filter(
			(camp) =>
				camp.title?.toLowerCase().includes(value) ||
				camp.location?.toLowerCase().includes(value)
		);
	}, [camps, searchText]);

	const upcomingCamps = useMemo(() => {
		const now = new Date();

		return filteredCamps
			.filter((camp) => new Date(camp.startDate) >= now)
			.sort(
				(a, b) =>
					new Date(a.startDate).getTime() -
					new Date(b.startDate).getTime()
			)
			.slice(0, 5);
	}, [filteredCamps]);

	const popularCamps = useMemo(() => {
		return [...filteredCamps]
			.sort(
				(a, b) =>
					(b.participantCount || 0) -
					(a.participantCount || 0)
			)
			.slice(0, 5);
	}, [filteredCamps]);

	return {
		loading,
		searchText,
		setSearchText,
		upcomingCamps,
		popularCamps,
		loadCamps,
	};
};