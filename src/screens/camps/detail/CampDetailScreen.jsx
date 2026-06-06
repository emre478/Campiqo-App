import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const categoryMap = {
	Nature: "Doğa",
	Caravan: "Karavan",
	Mountain: "Dağ",
	Sea: "Deniz",
	Winter: "Kış",
	Survival: "Hayatta Kalma",
};

const CampDetailScreen = ({ route }) => {
	const { camp } = route.params;

	const imageSource =
		camp.imageUrl && camp.imageUrl !== "string"
			? { uri: camp.imageUrl }
			: {
					uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
				};

	const startDate = new Date(camp.startDate);
	const endDate = new Date(camp.endDate);

	const formattedStartDate = startDate.toLocaleDateString("tr-TR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const formattedEndDate = endDate.toLocaleDateString("tr-TR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<ScrollView style={styles.container}>
			<Image source={imageSource} style={styles.image} />

			<View style={styles.content}>
				<Text style={styles.title}>{camp.title}</Text>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={20}
						color="#666"
					/>

					<Text style={styles.text}>{camp.location}</Text>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="calendar-range"
						size={20}
						color="#666"
					/>

					<Text style={styles.text}>
						{formattedStartDate} - {formattedEndDate}
					</Text>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="account-group-outline"
						size={20}
						color="#666"
					/>

					<Text style={styles.text}>
						{camp.participantCount}/{camp.maxParticipantCount}
					</Text>
				</View>

				<View style={styles.infoCard}>
					<Text style={styles.sectionTitle}>Kategori</Text>

					<Text style={styles.sectionValue}>
						{categoryMap[camp.categoryName] ||
							camp.categoryName ||
							camp.category}
					</Text>

					<Text style={styles.sectionTitle}>Oluşturan</Text>

					<Text style={styles.sectionValue}>{camp.ownerName}</Text>

					<Text style={styles.sectionTitle}>Açıklama</Text>

					<Text style={styles.description}>{camp.description}</Text>
				</View>

				<Button mode="contained" style={styles.joinButton}>
					Katıl
				</Button>
			</View>
		</ScrollView>
	);
};

export default CampDetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},

	image: {
		width: "100%",
		height: 260,
	},

	content: {
		padding: 20,
	},

	title: {
		fontSize: 30,
		fontWeight: "700",
		marginBottom: 20,
		color: "#222",
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},

	text: {
		marginLeft: 8,
		fontSize: 16,
		color: "#666",
	},

	infoCard: {
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 20,
		marginTop: 20,

		elevation: 4,

		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#222",
		marginBottom: 6,
		marginTop: 16,
	},

	sectionValue: {
		fontSize: 16,
		color: "#666",
	},

	description: {
		fontSize: 16,
		lineHeight: 24,
		color: "#555",
	},

	joinButton: {
		marginTop: 24,
		marginBottom: 30,
		borderRadius: 14,
		paddingVertical: 6,
	},
});
