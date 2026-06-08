import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/slices/profileSlice";
import { getMyProfile, updateProfile } from "../../services/userService";

const EditProfileScreen = ({ navigation }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [city, setCity] = useState("");
	const [bio, setBio] = useState("");
	const [profileImageUrl, setProfileImageUrl] = useState("");
	const [experienceLevel, setExperienceLevel] = useState(1);
	const dispatch = useDispatch();

	useEffect(() => {
		loadProfile();
	}, []);

	const loadProfile = async () => {
		try {
			const response = await getMyProfile();
			const profile = response.data;

			setFirstName(profile.firstName || "");
			setLastName(profile.lastName || "");
			setCity(profile.city || "");
			setBio(profile.bio || "");
			setProfileImageUrl(profile.profileImageUrl || "");
			setExperienceLevel(profile.experienceLevel || 1);
		} catch (error) {
			console.log(error);
		}
	};
	const handleSave = async () => {
		try {
			await updateProfile({
				firstName,
				lastName,
				bio,
				city,
				profileImageUrl,
				experienceLevel,
			});

			const updatedProfile = await getMyProfile();

			dispatch(setProfile(updatedProfile.data));

			navigation.goBack();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Profili Düzenle</Text>

			<TextInput
				style={styles.input}
				placeholder="Ad"
				value={firstName}
				onChangeText={setFirstName}
			/>

			<TextInput
				style={styles.input}
				placeholder="Soyad"
				value={lastName}
				onChangeText={setLastName}
			/>

			<TextInput
				style={styles.input}
				placeholder="Şehir"
				value={city}
				onChangeText={setCity}
			/>

			<TextInput
				style={styles.input}
				placeholder="Biyografi"
				value={bio}
				onChangeText={setBio}
				multiline
			/>

			<View style={styles.pickerContainer}>
				<Picker
					selectedValue={experienceLevel}
					onValueChange={(value) => setExperienceLevel(value)}
				>
					<Picker.Item label="Başlangıç" value={1} />

					<Picker.Item label="Orta Seviye" value={2} />

					<Picker.Item label="İleri Seviye" value={3} />

					<Picker.Item label="Profesyonel" value={4} />
				</Picker>
				<Button
					mode="contained"
					buttonColor="#2E7D32"
					style={{
						marginTop: 24,
						borderRadius: 12,
					}}
					onPress={handleSave}
				>
					Kaydet
				</Button>
			</View>
		</ScrollView>
	);
};

export default EditProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F7FB",
		padding: 20,
	},

	title: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 25,
		color: "#222",
	},

	input: {
		backgroundColor: "#fff",
		borderRadius: 14,
		paddingHorizontal: 16,
		paddingVertical: 14,
		marginBottom: 16,
		fontSize: 16,
	},

	pickerContainer: {
		backgroundColor: "#fff",
		borderRadius: 14,
		overflow: "hidden",
	},
});
