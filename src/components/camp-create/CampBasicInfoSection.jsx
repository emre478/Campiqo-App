import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImagePickerCard from "./ImagePickerCard";

const CampBasicInfoSection = ({
	title,
	setTitle,
	location,
	setLocation,
	previewImage,
	setPreviewImage,
	setImageUrl,
}) => {
	return (
		<View style={styles.sectionCard}>
			<View style={styles.sectionHeader}>
				<MaterialCommunityIcons
					name="information-outline"
					size={20}
					color="#6DA878"
				/>
				<Text style={styles.sectionTitle}>Kamp Bilgileri</Text>
			</View>

			<ImagePickerCard
				imageUri={previewImage}
				onImageSelected={(localUri, uploadedUrl) => {
					setPreviewImage(localUri);
					setImageUrl(uploadedUrl);
				}}
			/>

			<View style={styles.inputWrap}>
				<MaterialCommunityIcons
					name="format-title"
					size={18}
					color="#6DA878"
					style={styles.inputIcon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Kamp Başlığı"
					placeholderTextColor="#91A091"
					value={title}
					onChangeText={setTitle}
				/>
			</View>

			<View style={styles.inputWrap}>
				<MaterialCommunityIcons
					name="map-marker-outline"
					size={18}
					color="#6DA878"
					style={styles.inputIcon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Lokasyon"
					placeholderTextColor="#91A091"
					value={location}
					onChangeText={setLocation}
				/>
			</View>
		</View>
	);
};

export default CampBasicInfoSection;

const styles = StyleSheet.create({
	sectionCard: {
		backgroundColor: "#132617",
		borderRadius: 24,
		padding: 18,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 16,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	inputWrap: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#0D1C10",
		borderRadius: 18,
		borderWidth: 1,
		borderColor: "#203A25",
		marginTop: 12,
		paddingHorizontal: 14,
	},

	inputIcon: {
		marginRight: 4,
	},

	input: {
		flex: 1,
		paddingVertical: 15,
		fontSize: 15,
		color: "#F4F7EF",
	},
});
