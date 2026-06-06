import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import HomeHeader from "../../components/home/HomeHeader";
import SearchBar from "../../components/home/SearchBar";

const HomeScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<HomeHeader />

			<SearchBar />
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},
});