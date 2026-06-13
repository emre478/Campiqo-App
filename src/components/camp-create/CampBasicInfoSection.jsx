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
				value={title}
				onChangeText={setTitle}
			/>

			<TextInput
				style={styles.input}
				placeholder="Lokasyon"
				value={location}
				onChangeText={setLocation}
			/>
		</View>
	);
};

export default CampBasicInfoSection;

const styles = StyleSheet.create({
	sectionCard: {
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 18,
		marginBottom: 18,

		elevation: 4,

		shadowColor: "#000",
		shadowOpacity: 0.06,
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
		marginBottom: 12,
	},

	input: {
		backgroundColor: "#F7F8FA",
		borderRadius: 14,
		paddingHorizontal: 16,
		paddingVertical: 14,
		fontSize: 16,
		marginTop: 12,
	},
});
