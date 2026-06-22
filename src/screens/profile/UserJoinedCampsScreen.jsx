import React from "react";

import ProfileCampsListLayout from "../../components/profile/ProfileCampsListLayout";
import { useUserJoinedCamps } from "../../hooks/useUserJoinedCamps";

const UserJoinedCampsScreen = ({ navigation, route }) => {
	const { userId } = route.params;
	const { camps, loading } = useUserJoinedCamps(userId);

	return (
		<ProfileCampsListLayout
			navigation={navigation}
			title="Katıldığı Kamplar"
			subtitle="Kullanıcının katıldığı kamp etkinlikleri"
			headerIcon="handshake-outline"
			camps={camps}
			loading={loading}
			emptyIcon="handshake-outline"
			emptyTitle="Henüz katıldığı kamp yok"
			emptyDescription="Bu kullanıcı henüz herhangi bir kampa katılmamış."
		/>
	);
};

export default UserJoinedCampsScreen;
