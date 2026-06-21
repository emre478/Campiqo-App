import React from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";

import CampCard from "../../components/camps/CampCard";
import { useUserCreatedCamps } from "../../hooks/useUserCreatedCamps";

const UserCreatedCampsScreen = ({ navigation, route }) => {
	const { userId } = route.params;
	const { camps, loading } = useUserCreatedCamps(userId);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#2E7D32" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Oluşturduğu Kamplar</Text>

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
							Henüz oluşturduğu bir kamp yok.
						</Text>
					</View>
				}
			/>
		</View>
	);
};

export default UserCreatedCampsScreen;

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
