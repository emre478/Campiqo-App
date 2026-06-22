import React, { useEffect } from "react";
import {
	ActivityIndicator,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import CampsListCard from "../../components/camps/CampsListCard";
import FeaturedCampCard from "../../components/home/FeaturedCampCard";
import HomeCategorySection from "../../components/home/HomeCategorySection";
import HomeEmptyState from "../../components/home/HomeEmptyState";
import HomeHeader from "../../components/home/HomeHeader";
import SearchBar from "../../components/home/SearchBar";
import { useHomeCamps } from "../../hooks/useHomeCamps";
import { setUnreadCount } from "../../redux/slices/notificationSlice";
import { getUnreadCount } from "../../services/notificationService";

const SectionHeader = ({ icon, title }) => (
	<View style={styles.sectionHeader}>
		<MaterialCommunityIcons name={icon} size={20} color="#6DA878" />
		<Text style={styles.sectionTitle}>{title}</Text>
	</View>
);

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
				<ActivityIndicator size="large" color="#8DD69A" />
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
						tintColor="#8DD69A"
						colors={["#8DD69A"]}
					/>
				}
			>
				<HomeHeader />

				<SearchBar
					value={searchText}
					onChangeText={setSearchText}
				/>

				<HomeCategorySection
					selectedCategory={selectedCategory}
					onSelectCategory={setSelectedCategory}
				/>

				<SectionHeader
					icon="calendar-clock"
					title="Yaklaşan Kamplar"
				/>

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
								participantCount={camp.participantCount}
								maxParticipantCount={camp.maxParticipantCount}
								categoryName={camp.categoryName}
								averageRating={camp.averageRating}
								ratingCount={camp.ratingCount}
								onPress={() =>
									navigation.navigate("CampDetail", { camp })
								}
							/>
						))}
					</ScrollView>
				)}

				<SectionHeader icon="fire" title="Popüler Kamplar" />

				{popularCamps.length === 0 ? (
					<HomeEmptyState />
				) : (
					<View style={styles.popularList}>
						{popularCamps.map((camp) => (
							<CampsListCard
								key={camp.id}
								camp={camp}
								onPress={() =>
									navigation.navigate("CampDetail", { camp })
								}
							/>
						))}
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#07130B",
	},

	content: {
		paddingBottom: 100,
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginTop: 24,
		marginBottom: 14,
		paddingHorizontal: 20,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	horizontalList: {
		paddingLeft: 20,
		paddingRight: 10,
		paddingBottom: 4,
	},

	popularList: {
		paddingHorizontal: 20,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#07130B",
	},

	loadingText: {
		marginTop: 12,
		color: "#91A091",
		fontWeight: "600",
	},
});
