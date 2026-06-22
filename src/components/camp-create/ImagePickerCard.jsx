import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
		<TouchableOpacity
			style={styles.container}
			onPress={pickImage}
			activeOpacity={0.9}
		>
			{imageUri ? (
				<>
					<Image source={{ uri: imageUri }} style={styles.image} />
					<View style={styles.editBadge}>
						<MaterialCommunityIcons
							name="image-edit-outline"
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
							name="camera-plus-outline"
							size={32}
							color="#8DD69A"
						/>
					</View>
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
		height: 200,
		backgroundColor: "#0D1C10",
		borderRadius: 20,
		marginBottom: 4,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#203A25",
		borderStyle: "dashed",
	},

	image: {
		width: "100%",
		height: "100%",
	},

	editBadge: {
		position: "absolute",
		bottom: 12,
		right: 12,
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		backgroundColor: "rgba(0, 0, 0, 0.55)",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 14,
	},

	editText: {
		color: "#F4F7EF",
		fontSize: 12,
		fontWeight: "700",
	},

	placeholder: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},

	iconCircle: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
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
		fontWeight: "600",
	},
});
