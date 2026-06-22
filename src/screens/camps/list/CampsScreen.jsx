import React, { useEffect, useState } from "react";
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import CampFilter from "../../../components/camps/CampFilter";
import CampsListCard from "../../../components/camps/CampsListCard";
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
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Kamplar</Text>

				<View style={styles.filterButton}>
					<MaterialCommunityIcons
						name="tune-variant"
						size={18}
						color="#6DA878"
					/>
					<Text style={styles.filterText}>Filtre</Text>
					<MaterialCommunityIcons
						name="chevron-down"
						size={18}
						color="#8DD69A"
					/>
				</View>
			</View>

			<View style={styles.searchBox}>
				<MaterialCommunityIcons
					name="magnify"
					size={22}
					color="#91A091"
				/>
				<Text style={styles.searchText}>Kamp ara...</Text>
			</View>

			<CampFilter selected={filter} onChange={setFilter} />

			<View style={styles.listHeader}>
				<Text style={styles.countText}>
					{filteredCamps.length} kamp bulundu
				</Text>

				<View style={styles.sortButton}>
					<Text style={styles.sortText}>Sırala</Text>
					<MaterialCommunityIcons
						name="chevron-down"
						size={16}
						color="#8DD69A"
					/>
				</View>
			</View>

			<FlatList
				data={filteredCamps}
				keyExtractor={(item) => item.id}
				onEndReached={loadMore}
				onEndReachedThreshold={0.5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<CampsListCard
						camp={item}
						onPress={() =>
							navigation.navigate("CampDetail", { camp: item })
						}
					/>
				)}
			/>
		</SafeAreaView>
	);
};

export default CampsScreen;

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

	filterButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#132617",
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 22,
		borderWidth: 1,
		borderColor: "#203A25",
		gap: 6,
	},

	filterText: {
		fontSize: 13,
		fontWeight: "700",
		color: "#F4F7EF",
	},

	searchBox: {
		height: 54,
		backgroundColor: "#132617",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#203A25",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		marginBottom: 14,
		gap: 10,
	},

	searchText: {
		fontSize: 14,
		color: "#91A091",
	},

	listHeader: {
		marginTop: 12,
		marginBottom: 14,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	countText: {
		fontSize: 13,
		fontWeight: "600",
		color: "#91A091",
	},

	sortButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},

	sortText: {
		fontSize: 13,
		fontWeight: "800",
		color: "#8DD69A",
	},

	listContent: {
		paddingBottom: 100,
	},
});
