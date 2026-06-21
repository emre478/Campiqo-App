import { useEffect, useState } from "react";

import {
	getUserCreatedCamps,
	getUserJoinedCamps,
	getUserProfile,
} from "../services/userProfileService";

export const useUserProfile = (userId: string) => {
	const [profile, setProfile] = useState(null);

	const [createdCamps, setCreatedCamps] = useState([]);

	const [joinedCamps, setJoinedCamps] = useState([]);

	const [loading, setLoading] = useState(true);

	const loadProfile = async () => {
		try {
			const [profileResponse, createdResponse, joinedResponse] =
				await Promise.all([
					getUserProfile(userId),
					getUserCreatedCamps(userId),
					getUserJoinedCamps(userId),
				]);

			setProfile(profileResponse.data);

			setCreatedCamps(createdResponse.data);

			setJoinedCamps(joinedResponse.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProfile();
	}, []);

	return {
		profile,
		createdCamps,
		joinedCamps,
		loading,
	};
};
