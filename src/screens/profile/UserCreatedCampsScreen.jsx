import React from "react";

import ProfileCampsListLayout from "../../components/profile/ProfileCampsListLayout";
import { useUserCreatedCamps } from "../../hooks/useUserCreatedCamps";

const UserCreatedCampsScreen = ({ navigation, route }) => {
	const { userId } = route.params;
	const { camps, loading } = useUserCreatedCamps(userId);

	return (
		<ProfileCampsListLayout
			navigation={navigation}
			title="Oluşturduğu Kamplar"
			subtitle="Kullanıcının organize ettiği kamplar"
			headerIcon="tent"
			camps={camps}
			loading={loading}
			emptyIcon="tent"
			emptyTitle="Henüz kamp oluşturmamış"
			emptyDescription="Bu kullanıcı henüz herhangi bir kamp oluşturmamış."
		/>
	);
};

export default UserCreatedCampsScreen;
