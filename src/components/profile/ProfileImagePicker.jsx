import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { uploadImage } from "../../services/uploadService";

const ProfileImagePicker = ({ imageUri, onImageSelected }) => {
	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
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
					<Text style={styles.icon}>👤</Text>

					<Text style={styles.text}>Profil Fotoğrafı Seç</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

export default ProfileImagePicker;

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		width: 140,
		height: 140,
		borderRadius: 70,
		backgroundColor: "#fff",
		overflow: "hidden",
		marginBottom: 24,
	},

	image: {
		width: "100%",
		height: "100%",
	},

	placeholder: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	icon: {
		fontSize: 42,
		marginBottom: 6,
	},

	text: {
		fontSize: 12,
		color: "#666",
		textAlign: "center",
	},
});
