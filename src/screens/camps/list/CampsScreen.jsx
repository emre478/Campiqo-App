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
				<View>
					<Text style={styles.title}>Kamplar</Text>
				</View>

				<View style={styles.filterButton}>
					<Text style={styles.filterIcon}>☰</Text>
					<Text style={styles.filterText}>Filtre</Text>
					<Text style={styles.filterArrow}>⌄</Text>
				</View>
			</View>

			<View style={styles.searchBox}>
				<Text style={styles.searchIcon}>⌕</Text>
				<Text style={styles.searchText}>Kamp ara...</Text>
			</View>

			<CampFilter selected={filter} onChange={setFilter} />

			<View style={styles.listHeader}>
				<Text style={styles.countText}>
					{filteredCamps.length} kamp bulundu
				</Text>

				<Text style={styles.sortText}>Sırala⌄</Text>
			</View>

			<FlatList
				data={filteredCamps}
				keyExtractor={(item) => item.id}
				onEndReached={loadMore}
				onEndReachedThreshold={0.5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
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
		backgroundColor: "#EAF7EF",
		paddingHorizontal: 18,
		paddingTop: 50,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 18,
	},

	title: {
		fontSize: 30,
		fontWeight: "900",
		color: "#003B24",
	},

	filterButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 22,
		borderWidth: 1,
		borderColor: "#CDEBD8",
	},

	filterIcon: {
		fontSize: 16,
		color: "#003B24",
		marginRight: 8,
	},

	filterText: {
		fontSize: 13,
		fontWeight: "700",
		color: "#003B24",
		marginRight: 6,
	},

	filterArrow: {
		fontSize: 16,
		color: "#2E7D32",
	},

	searchBox: {
		height: 56,
		backgroundColor: "#FFFFFF",
		borderRadius: 18,
		borderWidth: 1,
		borderColor: "#CDEBD8",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		marginBottom: 16,
	},

	searchIcon: {
		fontSize: 22,
		color: "#607D6B",
		marginRight: 10,
	},

	searchText: {
		fontSize: 14,
		color: "#8A9A90",
	},

	listHeader: {
		marginTop: 14,
		marginBottom: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	countText: {
		fontSize: 13,
		fontWeight: "600",
		color: "#607D6B",
	},

	sortText: {
		fontSize: 13,
		fontWeight: "800",
		color: "#2E7D32",
	},

	listContent: {
		paddingBottom: 90,
	},
});
