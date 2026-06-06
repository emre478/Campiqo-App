import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
} from "react-native";

import CampCard from "../../components/camps/CampCard";
import { getCamps } from "../../services/campService";

const CampsScreen = () => {
	const [camps, setCamps] = useState([]);

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

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Kamplar
			</Text>

			<FlatList
				data={camps}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<CampCard camp={item} />
				)}
				showsVerticalScrollIndicator={false}
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