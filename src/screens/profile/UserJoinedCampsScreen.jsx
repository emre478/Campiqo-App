import React from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";

import CampCard from "../../components/camps/CampCard";
import { useUserJoinedCamps } from "../../hooks/useUserJoinedCamps";

const UserJoinedCampsScreen = ({ navigation, route }) => {
	const { userId } = route.params;

	const { camps, loading } = useUserJoinedCamps(userId);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#2E7D32" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Katıldığı Kamplar</Text>

			<FlatList
				data={camps}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<CampCard
						camp={item}
						onPress={() =>
							navigation.navigate("CampDetail", {
								camp: item,
							})
						}
					/>
				)}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							Henüz katıldığı bir kamp yok.
						</Text>
					</View>
				}
			/>
		</View>
	);
};

export default UserJoinedCampsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F6FA",
		paddingTop: 20,
	},

	title: {
		fontSize: 28,
		fontWeight: "700",
		color: "#222",
		paddingHorizontal: 20,
		marginBottom: 20,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	emptyContainer: {
		marginTop: 80,
		alignItems: "center",
	},

	emptyText: {
		fontSize: 16,
		color: "#888",
	},
});
