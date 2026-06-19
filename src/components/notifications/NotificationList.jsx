import React from "react";
import { FlatList } from "react-native";

import NotificationCard from "./NotificationCard";

const NotificationList = ({ notifications, onNotificationPress }) => {
	return (
		<FlatList
			data={notifications}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => (
				<NotificationCard
					notification={item}
					onPress={onNotificationPress}
				/>
			)}
		/>
	);
};

export default NotificationList;
