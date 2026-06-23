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

import CampJoinRequestCard from "../../../components/camps/CampJoinRequestCard";
import { useCampJoinRequests } from "../../../hooks/useCampJoinRequests";

const CampJoinRequestsScreen = ({ route, navigation }) => {
	const { campId, campTitle } = route.params;

	const { requests, loading, handleApprove, handleReject } =
		useCampJoinRequests(campId);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#8DD69A" />
				<Text style={styles.loadingText}>İstekler yükleniyor...</Text>
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
					<Text style={styles.title}>Katılım İstekleri</Text>
					<Text style={styles.subtitle}>
						{campTitle
							? `${campTitle} kampına gelen istekler`
							: "Bekleyen katılım taleplerini yönet"}
					</Text>
				</View>

				<View style={styles.headerIcon}>
					<MaterialCommunityIcons
						name="account-clock-outline"
						size={24}
						color="#8DD69A"
					/>
					{requests.length > 0 && (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>
								{requests.length > 99 ? "99+" : requests.length}
							</Text>
						</View>
					)}
				</View>
			</View>

			<View style={styles.listHeader}>
				<Text style={styles.countText}>
					{requests.length > 0
						? `${requests.length} bekleyen istek`
						: "Bekleyen istek yok"}
				</Text>
			</View>

			<FlatList
				data={requests}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					styles.listContent,
					requests.length === 0 && styles.listContentEmpty,
				]}
				renderItem={({ item }) => (
					<CampJoinRequestCard
						request={item}
						onApprove={handleApprove}
						onReject={handleReject}
					/>
				)}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<View style={styles.emptyIconWrap}>
							<MaterialCommunityIcons
								name="account-check-outline"
								size={40}
								color="#8DD69A"
							/>
						</View>

						<Text style={styles.emptyTitle}>
							Bekleyen istek yok
						</Text>

						<Text style={styles.emptyText}>
							Yeni katılım talepleri geldiğinde burada
							görüntüleyebilir ve onaylayabilirsin.
						</Text>
					</View>
				}
			/>
		</SafeAreaView>
	);
};

export default CampJoinRequestsScreen;

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

	badge: {
		position: "absolute",
		top: -2,
		right: -2,
		minWidth: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: "#2E7D32",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 4,
	},

	badgeText: {
		color: "#F4F7EF",
		fontSize: 10,
		fontWeight: "700",
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
