import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CampCard from "../../../components/camps/CampCard";
import CampFilter from "../../../components/camps/CampFilter";
import { appendCamps, setCamps } from "../../../redux/slices/campSlice";
import { getCamps } from "../../../services/campService";

const CampsScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const camps = useSelector((state) => state.camp.items);
	const page = useSelector((state) => state.camp.page);
	const totalCount = useSelector((state) => state.camp.totalCount);
	const [filter, setFilter] = useState("all");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadFirstPage();
	}, []);

	const loadFirstPage = async () => {
		try {
			const response = await getCamps(1, 10);

			dispatch(
				setCamps({
					items: response.data.items,
					page: response.data.page,
					totalCount: response.data.totalCount,
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	const loadMore = async () => {
		if (loading) return;

		if (camps.length >= totalCount) return;

		setLoading(true);

		try {
			const nextPage = page + 1;

			const response = await getCamps(nextPage, 10);

			dispatch(
				appendCamps({
					items: response.data.items,
					page: response.data.page,
					totalCount: response.data.totalCount,
				})
			);
		} catch (error) {
			console.log(error);
		}

		setLoading(false);
	};
	const filteredCamps =
		filter === "all"
			? camps
			: camps.filter((camp) => new Date(camp.startDate) > new Date());

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Kampları Keşfet</Text>

				<Text style={styles.subtitle}>Sana uygun kampı bul ve katıl</Text>
			</View>

			<FlatList
				data={filteredCamps}
				keyExtractor={(item) => item.id}
				onEndReached={loadMore}
				onEndReachedThreshold={0.5}
				ListHeaderComponent={
					<CampFilter selected={filter} onChange={setFilter} />
				}
				renderItem={({ item }) => (
					<CampCard
						camp={item}
						onPress={() =>
							navigation.navigate("CampDetail", { camp: item })
						}
					/>
				)}
			/>
		</View>
	);
};

export default CampsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		padding: 20,
	},

	title: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 20,
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 20,
		marginBottom: 12,
	},

	title: {
		fontSize: 34,
		fontWeight: "900",
		color: "#1F1F1F",
	},

	subtitle: {
		marginTop: 4,
		fontSize: 14,
		color: "#777",
	},
});
