import React from "react";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	ScrollView,
} from "react-native";

import HomeHeader from "../../components/home/HomeHeader";
import SearchBar from "../../components/home/SearchBar";
import FeaturedCampCard from "../../components/home/FeaturedCampCard";

const featuredCamps = [
	{
		id: 1,
		title: "Kaçkarlar Kampı",
		location: "Rize",
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb",
	},
	{
		id: 2,
		title: "Yedigöller Kampı",
		location: "Bolu",
		image:
			"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
	},
	{
		id: 3,
		title: "Kaz Dağları Kampı",
		location: "Balıkesir",
		image:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
	},
];

const HomeScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<HomeHeader />

				<SearchBar />

				<Text style={styles.sectionTitle}>
					Yaklaşan Kamplar
				</Text>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.horizontalList}
				>
					{featuredCamps.map((camp) => (
						<FeaturedCampCard
							key={camp.id}
							title={camp.title}
							location={camp.location}
							image={camp.image}
						/>
					))}
				</ScrollView>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},

	sectionTitle: {
		fontSize: 22,
		fontWeight: "700",
		color: "#222",
		marginTop: 25,
		marginBottom: 15,
		paddingHorizontal: 20,
	},

	horizontalList: {
		paddingLeft: 20,
		paddingBottom: 10,
	},
});