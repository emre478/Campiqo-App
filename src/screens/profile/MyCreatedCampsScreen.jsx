import React, { useEffect, useState } from "react";

import ProfileCampsListLayout from "../../components/profile/ProfileCampsListLayout";
import { getMyCreatedCamps } from "../../services/myCampService";

const MyCreatedCampsScreen = ({ navigation }) => {
	const [camps, setCamps] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadCamps();
	}, []);

	const loadCamps = async () => {
		try {
			const response = await getMyCreatedCamps();

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
			title="Oluşturduğum Kamplar"
			subtitle="Organize ettiğin kamp etkinlikleri"
			headerIcon="tent"
			camps={camps}
			loading={loading}
			emptyIcon="tent"
			emptyTitle="Henüz kamp oluşturmadın"
			emptyDescription="Yeni bir kamp oluşturarak maceranı burada listeleyebilirsin."
		/>
	);
};

export default MyCreatedCampsScreen;
