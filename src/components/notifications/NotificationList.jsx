import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NotificationCard from "./NotificationCard";

const NotificationList = ({ notifications, onNotificationPress }) => {
	return (
		<FlatList
			data={notifications}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={[
				styles.listContent,
				notifications.length === 0 && styles.listContentEmpty,
			]}
			renderItem={({ item }) => (
				<NotificationCard
					notification={item}
					onPress={onNotificationPress}
				/>
			)}
			ListEmptyComponent={
				<View style={styles.emptyContainer}>
					<View style={styles.emptyIconWrap}>
						<MaterialCommunityIcons
							name="bell-off-outline"
							size={40}
							color="#8DD69A"
						/>
					</View>

					<Text style={styles.emptyTitle}>Bildirim yok</Text>

					<Text style={styles.emptyText}>
						Yeni kamp aktiviteleri olduğunda bildirimlerin burada
						görünecek.
					</Text>
				</View>
			}
		/>
	);
};

export default NotificationList;

const styles = StyleSheet.create({
	listContent: {
		paddingBottom: 40,
	},

	listContentEmpty: {
		flexGrow: 1,
	},

	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 30,
		paddingTop: 80,
	},

	emptyIconWrap: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},

	emptyTitle: {
		fontSize: 20,
		fontWeight: "800",
		color: "#F4F7EF",
		marginBottom: 8,
	},

	emptyText: {
		fontSize: 14,
		color: "#91A091",
		textAlign: "center",
		lineHeight: 22,
	},
});
