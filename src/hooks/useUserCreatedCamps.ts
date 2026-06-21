import { useEffect, useState } from "react";

import { getUserCreatedCamps } from "../services/userProfileService";

export const useUserCreatedCamps = (userId: string) => {
	const [camps, setCamps] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadCamps();
	}, []);

	const loadCamps = async () => {
		try {
			const response = await getUserCreatedCamps(userId);

			setCamps(response.data || []);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return {
		camps,
		loading,
	};
};
