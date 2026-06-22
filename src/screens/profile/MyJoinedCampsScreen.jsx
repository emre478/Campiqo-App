import React, { useEffect, useState } from "react";

import ProfileCampsListLayout from "../../components/profile/ProfileCampsListLayout";
import { getMyJoinedCamps } from "../../services/myCampService";

const MyJoinedCampsScreen = ({ navigation }) => {
	const [camps, setCamps] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadCamps();
	}, []);

	const loadCamps = async () => {
		try {
			const response = await getMyJoinedCamps();

			setCamps(response.data || []);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ProfileCampsListLayout
			navigation={navigation}
			title="Katıldığım Kamplar"
			subtitle="Katıldığın kamp deneyimleri"
			headerIcon="handshake-outline"
			camps={camps}
			loading={loading}
			emptyIcon="handshake-outline"
			emptyTitle="Henüz katıldığın kamp yok"
			emptyDescription="Kamplara katılarak deneyimlerini burada takip edebilirsin."
		/>
	);
};

export default MyJoinedCampsScreen;
