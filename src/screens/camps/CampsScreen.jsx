import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import CampCard from "../../components/camps/CampCard";
import CampFilter from "../../components/camps/CampFilter";
import { getCamps } from "../../services/campService";

const CampsScreen = () => {
	const [camps, setCamps] = useState([]);
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		loadCamps();
	}, []);

	const loadCamps = async () => {
		try {
			const response = await getCamps();

			console.log(response);

			setCamps(response.data.items);
		} catch (error) {
			console.log(error);
		}
	};

	const filteredCamps =
		filter === "all"
			? camps
			: camps.filter((camp) => new Date(camp.startDate) > new Date());

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Kamplar</Text>

			<FlatList
				data={filteredCamps}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={
					<CampFilter selected={filter} onChange={setFilter} />
				}
				renderItem={({ item }) => <CampCard camp={item} />}
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
});
