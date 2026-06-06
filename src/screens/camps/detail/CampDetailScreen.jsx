import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
} from "react-native";

import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CampDetailScreen = ({ route }) => {
	const { camp } = route.params;

	const imageSource =
		camp.imageUrl &&
		camp.imageUrl !== "string"
			? { uri: camp.imageUrl }
			: {
					uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
			  };

	return (
		<ScrollView style={styles.container}>
			<Image
				source={imageSource}
				style={styles.image}
			/>

			<View style={styles.content}>
				<Text style={styles.title}>
					{camp.title}
				</Text>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="map-marker-outline"
						size={20}
						color="#666"
					/>

					<Text style={styles.text}>
						{camp.location}
					</Text>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="calendar-month-outline"
						size={20}
						color="#666"
					/>

					<Text style={styles.text}>
						{new Date(
							camp.startDate
						).toLocaleDateString("tr-TR")}
					</Text>
				</View>

				<View style={styles.row}>
					<MaterialCommunityIcons
						name="account-group-outline"
						size={20}
						color="#666"
					/>

					<Text style={styles.text}>
						{camp.participantCount}/
						{camp.maxParticipantCount}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						Kategori
					</Text>

					<Text style={styles.sectionText}>
						{camp.categoryName}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						Oluşturan
					</Text>

					<Text style={styles.sectionText}>
						{camp.ownerName}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						Açıklama
					</Text>

					<Text style={styles.sectionText}>
						{camp.description}
					</Text>
				</View>

				<Button
					mode="contained"
					style={styles.joinButton}
				>
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
		backgroundColor: "#fff",
	},

	image: {
		width: "100%",
		height: 250,
	},

	content: {
		padding: 20,
	},

	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},

	text: {
		marginLeft: 8,
		fontSize: 16,
		color: "#555",
	},

	section: {
		marginTop: 24,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 8,
	},

	sectionText: {
		fontSize: 16,
		lineHeight: 24,
		color: "#555",
	},

	joinButton: {
		marginTop: 32,
		borderRadius: 12,
		paddingVertical: 6,
	},
});