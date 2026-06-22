import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SERVER_URL } from "../../constants/apiConstants";
import { uploadImage } from "../../services/uploadService";

const resolveImageUri = (imageUri) => {
	if (!imageUri) return null;

	if (imageUri.startsWith("http") || imageUri.startsWith("file")) {
		return imageUri;
	}

	return `${SERVER_URL}${imageUri}`;
};

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

	const displayUri = resolveImageUri(imageUri);

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={pickImage}
			activeOpacity={0.9}
		>
			{displayUri ? (
				<>
					<Image source={{ uri: displayUri }} style={styles.image} />
					<View style={styles.editBadge}>
						<MaterialCommunityIcons
							name="camera-outline"
							size={16}
							color="#F4F7EF"
						/>
						<Text style={styles.editText}>Değiştir</Text>
					</View>
				</>
			) : (
				<View style={styles.placeholder}>
					<View style={styles.iconCircle}>
						<MaterialCommunityIcons
							name="account"
							size={36}
							color="#8DD69A"
						/>
					</View>
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
		width: 132,
		height: 132,
		borderRadius: 66,
		backgroundColor: "#0D1C10",
		overflow: "hidden",
		borderWidth: 2,
		borderColor: "#203A25",
	},

	image: {
		width: "100%",
		height: "100%",
	},

	editBadge: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
		backgroundColor: "rgba(0, 0, 0, 0.55)",
		paddingVertical: 8,
	},

	editText: {
		color: "#F4F7EF",
		fontSize: 11,
		fontWeight: "700",
	},

	placeholder: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 12,
	},

	iconCircle: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},

	text: {
		fontSize: 11,
		color: "#91A091",
		textAlign: "center",
		fontWeight: "600",
	},
});
