import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import CampCard from "../../components/camps/CampCard";

import { getFavoriteCamps } from "../../services/campService";

import { setFavorites } from "../../redux/slices/favoriteSlice";

const FavoritesScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const favorites = useSelector(
		(state) => state.favorite.items
	);

	useEffect(() => {
		loadFavorites();
	}, []);

	const loadFavorites = async () => {
		try {
			const response = await getFavoriteCamps();

			dispatch(setFavorites(response.data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Favorilerim
			</Text>

			<FlatList
				data={favorites}
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
							Henüz favori kampın yok.
						</Text>
					</View>
				}
			/>
		</View>
	);
};

export default FavoritesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		paddingTop: 20,
	},

	title: {
		fontSize: 28,
		fontWeight: "700",
		paddingHorizontal: 20,
		marginBottom: 20,
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