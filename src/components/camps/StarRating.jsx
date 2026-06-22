import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const StarRating = ({ rating, onChange, disabled = false }) => {
	return (
		<View style={styles.container}>
			{[1, 2, 3, 4, 5].map((star) => (
				<TouchableOpacity
					key={star}
					disabled={disabled}
					onPress={() => onChange(star)}
				>
					<MaterialCommunityIcons
						name={star <= rating ? "star" : "star-outline"}
						size={32}
						color="#FFD34D"
					/>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default StarRating;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 8,
		marginVertical: 6,
	},
});
