import React from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";

import CampJoinRequestCard from "../../../components/camps/CampJoinRequestCard";
import { useCampJoinRequests } from "../../../hooks/useCampJoinRequests";

const CampJoinRequestsScreen = ({ route }) => {
	const { campId } = route.params;

	const { requests, loading, handleApprove, handleReject } =
		useCampJoinRequests(campId);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#2E7D32" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Katılım İstekleri</Text>

			<FlatList
				data={requests}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<CampJoinRequestCard
						request={item}
						onApprove={handleApprove}
						onReject={handleReject}
					/>
				)}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							Bekleyen istek bulunmuyor.
						</Text>
					</View>
				}
			/>
		</View>
	);
};

export default CampJoinRequestsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F6FA",
		padding: 20,
	},

	title: {
		fontSize: 28,
		fontWeight: "700",
		color: "#222",
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
