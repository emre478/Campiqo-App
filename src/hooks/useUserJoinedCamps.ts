import { useEffect, useState } from "react";

import { getUserJoinedCamps } from "../services/userProfileService";

export const useUserJoinedCamps = (userId: string) => {
	const [camps, setCamps] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadCamps();
	}, []);

	const loadCamps = async () => {
		try {
			const response = await getUserJoinedCamps(userId);

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
