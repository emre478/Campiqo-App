import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Button } from "react-native-paper";

import CategorySelector from "../../components/camp-create/CategorySelector";
import ParticipantCounter from "../../components/camp-create/ParticipantCounter";

import { createCamp } from "../../services/campService";

const CreateCampScreen = ({ navigation }) => {
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");

	const [category, setCategory] = useState(1);

	const [maxParticipantCount, setMaxParticipantCount] = useState(10);

	const [startDate, setStartDate] = useState(new Date());

	const [endDate, setEndDate] = useState(new Date());

	const [imageUrl, setImageUrl] = useState("");

	const handleCreateCamp = async () => {
		try {
			await createCamp({
				title,
				description,
				location,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				maxParticipantCount,
				imageUrl,
				category,
			});

			navigation.navigate("Camps");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<Text style={styles.title}>🏕️ Kamp Oluştur</Text>

			<View style={styles.sectionCard}>
				<Text style={styles.sectionTitle}>Kamp Bilgileri</Text>

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

			<View style={styles.sectionCard}>
				<Text style={styles.sectionTitle}>Kategori Seç</Text>

				<CategorySelector
					selectedCategory={category}
					onSelect={setCategory}
				/>
			</View>

			<View style={styles.sectionCard}>
				<Text style={styles.sectionTitle}>Maksimum Katılımcı</Text>

				<ParticipantCounter
					value={maxParticipantCount}
					onChange={setMaxParticipantCount}
				/>

				<Text
					style={[
						styles.sectionTitle,
						{
							marginTop: 24,
						},
					]}
				>
					Açıklama
				</Text>

				<TextInput
					style={styles.descriptionInput}
					multiline
					value={description}
					onChangeText={setDescription}
					placeholder="Kamp hakkında bilgi ver..."
				/>
			</View>

			<Button
				mode="contained"
				buttonColor="#2E7D32"
				style={styles.createButton}
				onPress={handleCreateCamp}
			>
				🚀 Kampı Oluştur
			</Button>

			<View style={{ height: 40 }} />
		</ScrollView>
	);
};

export default CreateCampScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F7FB",
		paddingHorizontal: 20,
		paddingTop: 60,
	},
	title: {
		fontSize: 30,
		fontWeight: "700",
		color: "#222",
		marginBottom: 24,
	},

	input: {
		backgroundColor: "#F7F8FA",

		borderRadius: 14,

		paddingHorizontal: 16,
		paddingVertical: 14,

		fontSize: 16,

		marginTop: 12,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 12,
		marginTop: 10,
		color: "#222",
	},

	descriptionInput: {
		backgroundColor: "#F7F8FA",

		borderRadius: 14,

		paddingHorizontal: 16,
		paddingVertical: 14,

		height: 120,

		marginTop: 12,

		textAlignVertical: "top",
	},

	createButton: {
		marginTop: 24,
		borderRadius: 14,
		paddingVertical: 6,
	},
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
	},
	createButton: {
		borderRadius: 16,

		marginTop: 10,

		paddingVertical: 6,
	},
});
