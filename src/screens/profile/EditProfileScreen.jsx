import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
	ScrollView,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import ProfileImagePicker from "../../components/profile/ProfileImagePicker";
import { SERVER_URL } from "../../constants/apiConstants";
import { setProfile } from "../../redux/slices/profileSlice";
import { getMyProfile, updateProfile } from "../../services/userService";

const EXPERIENCE_LEVELS = [
	{ label: "Başlangıç", value: 1 },
	{ label: "Orta Seviye", value: 2 },
	{ label: "İleri Seviye", value: 3 },
	{ label: "Profesyonel", value: 4 },
];

const EditProfileScreen = ({ navigation }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [city, setCity] = useState("");
	const [bio, setBio] = useState("");
	const [profileImageUrl, setProfileImageUrl] = useState("");
	const [experienceLevel, setExperienceLevel] = useState(1);
	const [profileImagePreview, setProfileImagePreview] = useState("");
	const [saving, setSaving] = useState(false);
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

			if (profile.profileImageUrl) {
				const preview = profile.profileImageUrl.startsWith("http")
					? profile.profileImageUrl
					: `${SERVER_URL}${profile.profileImageUrl}`;
				setProfileImagePreview(preview);
			} else {
				setProfileImagePreview("");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSave = async () => {
		try {
			setSaving(true);

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
		} finally {
			setSaving(false);
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
					activeOpacity={0.85}
				>
					<MaterialCommunityIcons
						name="arrow-left"
						size={22}
						color="#F4F7EF"
					/>
				</TouchableOpacity>

				<View style={styles.header}>
					<View style={styles.headerText}>
						<Text style={styles.title}>Profili Düzenle</Text>
						<Text style={styles.subtitle}>
							Bilgilerini güncelle ve kaydet
						</Text>
					</View>

					<View style={styles.headerIcon}>
						<MaterialCommunityIcons
							name="account-edit-outline"
							size={26}
							color="#8DD69A"
						/>
					</View>
				</View>

				<View style={styles.sectionCard}>
					<View style={styles.sectionHeader}>
						<MaterialCommunityIcons
							name="camera-outline"
							size={20}
							color="#6DA878"
						/>
						<Text style={styles.sectionTitle}>Profil Fotoğrafı</Text>
					</View>

					<ProfileImagePicker
						imageUri={profileImagePreview}
						onImageSelected={(localUri, serverUrl) => {
							setProfileImagePreview(localUri);
							setProfileImageUrl(serverUrl);
						}}
					/>
				</View>

				<View style={styles.sectionCard}>
					<View style={styles.sectionHeader}>
						<MaterialCommunityIcons
							name="account-outline"
							size={20}
							color="#6DA878"
						/>
						<Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
					</View>

					<View style={styles.inputWrap}>
						<MaterialCommunityIcons
							name="account"
							size={18}
							color="#6DA878"
						/>
						<TextInput
							style={styles.input}
							placeholder="Ad"
							placeholderTextColor="#91A091"
							value={firstName}
							onChangeText={setFirstName}
						/>
					</View>

					<View style={styles.inputWrap}>
						<MaterialCommunityIcons
							name="account"
							size={18}
							color="#6DA878"
						/>
						<TextInput
							style={styles.input}
							placeholder="Soyad"
							placeholderTextColor="#91A091"
							value={lastName}
							onChangeText={setLastName}
						/>
					</View>

					<View style={styles.inputWrap}>
						<MaterialCommunityIcons
							name="map-marker-outline"
							size={18}
							color="#6DA878"
						/>
						<TextInput
							style={styles.input}
							placeholder="Şehir"
							placeholderTextColor="#91A091"
							value={city}
							onChangeText={setCity}
						/>
					</View>

					<View style={[styles.inputWrap, styles.textAreaWrap]}>
						<MaterialCommunityIcons
							name="text-box-outline"
							size={18}
							color="#6DA878"
							style={styles.textAreaIcon}
						/>
						<TextInput
							style={[styles.input, styles.textArea]}
							placeholder="Biyografi"
							placeholderTextColor="#91A091"
							value={bio}
							onChangeText={setBio}
							multiline
							textAlignVertical="top"
						/>
					</View>
				</View>

				<View style={styles.sectionCard}>
					<View style={styles.sectionHeader}>
						<MaterialCommunityIcons
							name="medal-outline"
							size={20}
							color="#6DA878"
						/>
						<Text style={styles.sectionTitle}>Deneyim Seviyesi</Text>
					</View>

					<View style={styles.pickerWrap}>
						<Picker
							selectedValue={experienceLevel}
							onValueChange={(value) => setExperienceLevel(value)}
							style={styles.picker}
							dropdownIconColor="#8DD69A"
						>
							{EXPERIENCE_LEVELS.map((level) => (
								<Picker.Item
									key={level.value}
									label={level.label}
									value={level.value}
									color="#F4F7EF"
								/>
							))}
						</Picker>
					</View>
				</View>

				<TouchableOpacity
					style={[styles.saveButton, saving && styles.saveButtonDisabled]}
					onPress={handleSave}
					disabled={saving}
					activeOpacity={0.85}
				>
					<MaterialCommunityIcons
						name="content-save-outline"
						size={22}
						color="#F4F7EF"
					/>
					<Text style={styles.saveButtonText}>
						{saving ? "Kaydediliyor..." : "Kaydet"}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default EditProfileScreen;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#07130B",
	},

	container: {
		flex: 1,
	},

	scrollContent: {
		paddingHorizontal: 20,
		paddingTop: 8,
		paddingBottom: 40,
	},

	backButton: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},

	headerText: {
		flex: 1,
		paddingRight: 12,
	},

	title: {
		fontSize: 28,
		fontWeight: "900",
		color: "#F4F7EF",
		letterSpacing: -0.5,
	},

	subtitle: {
		fontSize: 14,
		color: "#91A091",
		marginTop: 4,
		fontWeight: "600",
	},

	headerIcon: {
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
	},

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
		marginBottom: 12,
		paddingHorizontal: 14,
		gap: 10,
	},

	textAreaWrap: {
		alignItems: "flex-start",
		paddingTop: 14,
	},

	textAreaIcon: {
		marginTop: 2,
	},

	input: {
		flex: 1,
		paddingVertical: 15,
		fontSize: 15,
		color: "#F4F7EF",
	},

	textArea: {
		minHeight: 96,
		paddingTop: 0,
		paddingBottom: 14,
		lineHeight: 22,
	},

	pickerWrap: {
		backgroundColor: "#0D1C10",
		borderRadius: 18,
		borderWidth: 1,
		borderColor: "#203A25",
		overflow: "hidden",
	},

	picker: {
		color: "#F4F7EF",
	},

	saveButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#2E7D32",
		borderRadius: 20,
		height: 56,
		marginTop: 8,
	},

	saveButtonDisabled: {
		opacity: 0.7,
	},

	saveButtonText: {
		fontSize: 16,
		fontWeight: "800",
		color: "#F4F7EF",
	},
});
