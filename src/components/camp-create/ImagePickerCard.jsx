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
					<Text style={styles.subText}>16:9 oranında görsel önerilir</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

export default ImagePickerCard;

const styles = StyleSheet.create({
	container: {
		height: 220,
		backgroundColor: "#132617",
		borderRadius: 22,
		marginBottom: 20,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#203A25",
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
		fontSize: 42,
		marginBottom: 10,
	},

	text: {
		fontSize: 16,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	subText: {
		marginTop: 6,
		fontSize: 12,
		color: "#91A091",
	},
});
