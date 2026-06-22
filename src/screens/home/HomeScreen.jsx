import React, { useEffect } from "react";
import {
	ActivityIndicator,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import FeaturedCampCard from "../../components/home/FeaturedCampCard";
import HomeCategorySection from "../../components/home/HomeCategorySection";
import HomeEmptyState from "../../components/home/HomeEmptyState";
import HomeHeader from "../../components/home/HomeHeader";
import PopularCampCard from "../../components/home/PopularCampCard";
import SearchBar from "../../components/home/SearchBar";
import { useHomeCamps } from "../../hooks/useHomeCamps";
import { setUnreadCount } from "../../redux/slices/notificationSlice";
import { getUnreadCount } from "../../services/notificationService";

const HomeScreen = () => {
	const navigation = useNavigation();
	const {
		upcomingCamps,
		popularCamps,
		searchText,
		setSearchText,
		loading,
		refreshing,
		refreshCamps,
		selectedCategory,
		setSelectedCategory,
	} = useHomeCamps();

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

	if (loading) {
		return (
			<SafeAreaView style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#F59E0B" />

				<Text style={styles.loadingText}>Kamplar yükleniyor...</Text>
			</SafeAreaView>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.content}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={refreshCamps}
						colors={["#F59E0B"]}
					/>
				}
			>
				<HomeHeader />

				<SearchBar value={searchText} onChangeText={setSearchText} />
				<HomeCategorySection
					selectedCategory={selectedCategory}
					onSelectCategory={setSelectedCategory}
				/>
				<Text style={styles.sectionTitle}>Yaklaşan Kamplar</Text>

				{upcomingCamps.length === 0 ? (
					<HomeEmptyState />
				) : (
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
								onPress={() =>
									navigation.navigate("CampDetail", {
										camp,
									})
								}
							/>
						))}
					</ScrollView>
				)}
				<Text style={styles.sectionTitle}>Popüler Kamplar</Text>

				{popularCamps.length === 0 ? (
					<HomeEmptyState />
				) : (
					popularCamps.map((camp) => (
						<PopularCampCard
							key={camp.id}
							title={camp.title}
							location={camp.location}
							date={new Date(camp.startDate).toLocaleDateString("tr-TR")}
							participants={`${camp.participantCount}/${camp.maxParticipantCount}`}
							image={camp.imageUrl}
							onPress={() =>
								navigation.navigate("CampDetail", {
									camp,
								})
							}
						/>
					))
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FAF8F2",
	},

	sectionTitle: {
		fontSize: 20,
		fontWeight: "900",
		color: "#1F1F1F",
		marginTop: 24,
		marginBottom: 14,
		paddingHorizontal: 20,
	},

	horizontalList: {
		paddingLeft: 20,
		paddingRight: 10,
		paddingBottom: 12,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FAF8F2",
	},

	loadingText: {
		marginTop: 12,
		color: "#777",
	},

	content: {
		paddingBottom: 40,
	},
});
