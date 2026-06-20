import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

import { useDispatch } from "react-redux";
import FeaturedCampCard from "../../components/home/FeaturedCampCard";
import HomeHeader from "../../components/home/HomeHeader";
import PopularCampCard from "../../components/home/PopularCampCard";
import SearchBar from "../../components/home/SearchBar";
import { useHomeCamps } from "../../hooks/useHomeCamps";
import { setUnreadCount } from "../../redux/slices/notificationSlice";
import { getUnreadCount } from "../../services/notificationService";

const HomeScreen = () => {
	const { upcomingCamps, popularCamps, searchText, setSearchText, loading } =
		useHomeCamps();
	const dispatch = useDispatch();

	useEffect(() => {
		loadUnreadCount();
	}, []);
	const loadUnreadCount = async () => {
		try {
			const response = await getUnreadCount();

			dispatch(setUnreadCount(response.data.data));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<HomeHeader />

				<SearchBar value={searchText} onChangeText={setSearchText} />

				<Text style={styles.sectionTitle}>Yaklaşan Kamplar</Text>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.horizontalList}
				>
					{upcomingCamps.map((camp) => (
						<FeaturedCampCard
							key={camp.id}
							title={camp.title}
							location={camp.location}
							image={camp.imageUrl}
						/>
					))}
				</ScrollView>
				<Text style={styles.sectionTitle}>Popüler Kamplar</Text>

				{popularCamps.map((camp) => (
					<PopularCampCard
						key={camp.id}
						title={camp.title}
						location={camp.location}
						date={new Date(camp.startDate).toLocaleDateString("tr-TR")}
						participants={`${camp.participantCount}/${camp.maxParticipantCount}`}
						image={camp.imageUrl}
					/>
				))}
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
