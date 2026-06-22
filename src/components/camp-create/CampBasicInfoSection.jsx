import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
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
			<Text style={styles.sectionTitle}>Kamp Bilgileri</Text>

			<ImagePickerCard
				imageUri={previewImage}
				onImageSelected={(localUri, uploadedUrl) => {
					setPreviewImage(localUri);
					setImageUrl(uploadedUrl);
				}}
			/>

			<TextInput
				style={styles.input}
				placeholder="Kamp Başlığı"
				placeholderTextColor="#7F907F"
				value={title}
				onChangeText={setTitle}
			/>

			<TextInput
				style={styles.input}
				placeholder="Lokasyon"
				placeholderTextColor="#7F907F"
				value={location}
				onChangeText={setLocation}
			/>
		</View>
	);
};

export default CampBasicInfoSection;

const styles = StyleSheet.create({
	sectionCard: {
		backgroundColor: "#0D1C10",
		borderRadius: 24,
		padding: 18,
		marginBottom: 18,
		borderWidth: 1,
		borderColor: "#1C3320",
	},

	sectionTitle: {
		fontSize: 20,
		fontWeight: "800",
		color: "#F4F7EF",
		marginBottom: 14,
	},

	input: {
		backgroundColor: "#132617",
		borderRadius: 16,
		paddingHorizontal: 16,
		paddingVertical: 15,
		fontSize: 15,
		marginTop: 12,
		color: "#F4F7EF",
		borderWidth: 1,
		borderColor: "#203A25",
	},
});
