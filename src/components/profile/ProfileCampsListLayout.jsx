import React from "react";
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CampsListCard from "../camps/CampsListCard";

const ProfileCampsListLayout = ({
	navigation,
	title,
	subtitle,
	headerIcon,
	headerIconColor = "#8DD69A",
	camps,
	loading,
	emptyIcon,
	emptyTitle,
	emptyDescription,
}) => {
	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#8DD69A" />
				<Text style={styles.loadingText}>Kamplar yükleniyor...</Text>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.topBar}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
					activeOpacity={0.85}
				>
					<MaterialCommunityIcons
						name="arrow-left"
						size={22}
						color="#F4F7EF"
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.header}>
				<View style={styles.headerText}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.subtitle}>{subtitle}</Text>
				</View>

				<View style={styles.headerIcon}>
					<MaterialCommunityIcons
						name={headerIcon}
						size={24}
						color={headerIconColor}
					/>
				</View>
			</View>

			<View style={styles.listHeader}>
				<Text style={styles.countText}>{camps.length} kamp</Text>
			</View>

			<FlatList
				data={camps}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					styles.listContent,
					camps.length === 0 && styles.listContentEmpty,
				]}
				renderItem={({ item }) => (
					<CampsListCard
						camp={item}
						onPress={() =>
							navigation.navigate("CampDetail", { camp: item })
						}
					/>
				)}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<View style={styles.emptyIconWrap}>
							<MaterialCommunityIcons
								name={emptyIcon}
								size={40}
								color="#8DD69A"
							/>
						</View>

						<Text style={styles.emptyTitle}>{emptyTitle}</Text>

						<Text style={styles.emptyText}>{emptyDescription}</Text>
					</View>
				}
			/>
		</SafeAreaView>
	);
};

export default ProfileCampsListLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#07130B",
		paddingHorizontal: 20,
	},

	loadingContainer: {
		flex: 1,
		backgroundColor: "#07130B",
		justifyContent: "center",
		alignItems: "center",
	},

	loadingText: {
		marginTop: 12,
		color: "#91A091",
		fontWeight: "600",
	},

	topBar: {
		paddingTop: 8,
		marginBottom: 8,
	},

	backButton: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "flex-start",
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},

	headerText: {
		flex: 1,
		paddingRight: 12,
	},

	title: {
		fontSize: 28,
		fontWeight: "900",
		color: "#F4F7EF",
		letterSpacing: -0.5,
	},

	subtitle: {
		fontSize: 14,
		color: "#91A091",
		marginTop: 4,
		fontWeight: "600",
	},

	headerIcon: {
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
	},

	listHeader: {
		marginBottom: 14,
	},

	countText: {
		fontSize: 13,
		fontWeight: "600",
		color: "#91A091",
	},

	listContent: {
		paddingBottom: 40,
	},

	listContentEmpty: {
		flexGrow: 1,
	},

	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 30,
		paddingTop: 60,
	},

	emptyIconWrap: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},

	emptyTitle: {
		fontSize: 20,
		fontWeight: "800",
		color: "#F4F7EF",
		marginBottom: 8,
		textAlign: "center",
	},

	emptyText: {
		fontSize: 14,
		color: "#91A091",
		textAlign: "center",
		lineHeight: 22,
	},
});
