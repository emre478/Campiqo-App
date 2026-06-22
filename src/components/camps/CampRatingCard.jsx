import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useCampRating } from "../../hooks/useCampRating";
import StarRating from "./StarRating";

const CampRatingCard = ({
	campId,
	myRating,
	averageRating,
	ratingCount,
	onRated,
}) => {
	const refreshCamp = async () => {
		if (onRated) {
			await onRated();
		}
	};

	const { selectedRating, setSelectedRating, handleRate, loading } =
		useCampRating(campId, myRating, refreshCamp);

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<MaterialCommunityIcons name="star-circle" size={22} color="#FFD34D" />
				<Text style={styles.title}>Kampı Değerlendir</Text>
			</View>

			<StarRating rating={selectedRating} onChange={setSelectedRating} />

			<View style={styles.statsRow}>
				<View style={styles.statPill}>
					<MaterialCommunityIcons name="star" size={14} color="#FFD34D" />
					<Text style={styles.statText}>
						{averageRating?.toFixed(1) ?? "0.0"}
					</Text>
				</View>
				<Text style={styles.count}>{ratingCount} değerlendirme</Text>
			</View>

			<TouchableOpacity
				style={[styles.button, loading && styles.buttonDisabled]}
				onPress={handleRate}
				disabled={loading}
				activeOpacity={0.85}
			>
				<Text style={styles.buttonText}>
					{loading ? "Gönderiliyor..." : "Puan Ver"}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CampRatingCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",
		borderRadius: 24,
		padding: 18,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		marginBottom: 8,
	},

	title: {
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	statsRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		marginTop: 12,
	},

	statPill: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#0D1C10",
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 14,
		gap: 4,
	},

	statText: {
		fontSize: 13,
		fontWeight: "800",
		color: "#C5CEC4",
	},

	count: {
		fontSize: 13,
		color: "#91A091",
		fontWeight: "600",
	},

	button: {
		marginTop: 16,
		backgroundColor: "#2E7D32",
		borderRadius: 18,
		height: 52,
		alignItems: "center",
		justifyContent: "center",
	},

	buttonDisabled: {
		opacity: 0.7,
	},

	buttonText: {
		color: "#F4F7EF",
		fontWeight: "800",
		fontSize: 15,
	},
});
