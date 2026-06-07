import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";

import CampCard from "../../components/CampCard";
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

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator
					size="large"
					color="#2E7D32"
				/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Oluşturduğum Kamplar
			</Text>

			<FlatList
				data={camps}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<CampCard
						camp={item}
						onPress={() =>
							navigation.navigate(
								"CampDetail",
								{
									camp: item,
								}
							)
						}
					/>
				)}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							Henüz oluşturduğun bir kamp yok.
						</Text>
					</View>
				}
			/>
		</View>
	);
};

export default MyCreatedCampsScreen;

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