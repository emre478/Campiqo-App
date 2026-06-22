import React, { useEffect } from "react";
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import CampsListCard from "../../components/camps/CampsListCard";
import { getFavoriteCamps } from "../../services/campService";
import { setFavorites } from "../../redux/slices/favoriteSlice";

const FavoritesScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const favorites = useSelector((state) => state.favorite.items);

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
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View>
					<Text style={styles.title}>Favorilerim</Text>
					<Text style={styles.subtitle}>
						Beğendiğin kampları burada bul
					</Text>
				</View>

				<View style={styles.headerIcon}>
					<MaterialCommunityIcons
						name="heart"
						size={24}
						color="#E53935"
					/>
				</View>
			</View>

			<View style={styles.listHeader}>
				<Text style={styles.countText}>
					{favorites.length} favori kamp
				</Text>
			</View>

			<FlatList
				data={favorites}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					styles.listContent,
					favorites.length === 0 && styles.listContentEmpty,
				]}
				renderItem={({ item }) => (
					<CampsListCard
						camp={item}
						onPress={() =>
							navigation.navigate("CampDetail", { camp: item })
						}
					/>
				)}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<View style={styles.emptyIconWrap}>
							<MaterialCommunityIcons
								name="heart-outline"
								size={40}
								color="#8DD69A"
							/>
						</View>

						<Text style={styles.emptyTitle}>
							Henüz favori kampın yok
						</Text>

						<Text style={styles.emptyText}>
							Beğendiğin kampları favorilere ekleyerek burada
							görüntüleyebilirsin.
						</Text>
					</View>
				}
			/>
		</SafeAreaView>
	);
};

export default FavoritesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#07130B",
		paddingHorizontal: 20,
		paddingTop: 8,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},

	title: {
		fontSize: 32,
		fontWeight: "900",
		color: "#F4F7EF",
		letterSpacing: -0.5,
	},

	subtitle: {
		fontSize: 14,
		color: "#91A091",
		marginTop: 4,
		fontWeight: "600",
	},

	headerIcon: {
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
	},

	listHeader: {
		marginBottom: 14,
	},

	countText: {
		fontSize: 13,
		fontWeight: "600",
		color: "#91A091",
	},

	listContent: {
		paddingBottom: 100,
	},

	listContentEmpty: {
		flexGrow: 1,
	},

	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 30,
		paddingTop: 60,
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
