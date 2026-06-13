import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { uploadImage } from "../../services/uploadService";

const ImagePickerCard = ({ imageUri, onImageSelected }) => {
	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.8,
		});

		if (!result.canceled) {
			const uploadResponse = await uploadImage(result.assets[0].uri);

			onImageSelected(result.assets[0].uri, uploadResponse.data.url);
		}
	};

	return (
		<TouchableOpacity style={styles.container} onPress={pickImage}>
			{imageUri ? (
				<Image source={{ uri: imageUri }} style={styles.image} />
			) : (
				<View style={styles.placeholder}>
					<Text style={styles.icon}>📷</Text>
					<Text style={styles.text}>Kamp Fotoğrafı Seç</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

export default ImagePickerCard;

const styles = StyleSheet.create({
	container: {
		height: 220,
		backgroundColor: "#fff",
		borderRadius: 20,
		marginBottom: 20,
		overflow: "hidden",
	},

	image: {
		width: "100%",
		height: "100%",
	},

	placeholder: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	icon: {
		fontSize: 40,
		marginBottom: 10,
	},

	text: {
		fontSize: 16,
		fontWeight: "600",
		color: "#666",
	},
});
