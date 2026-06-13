import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";

import CampBasicInfoSection from "../../components/camp-create/CampBasicInfoSection";
import CampSettingsSection from "../../components/camp-create/CampSettingsSection";
import { useCreateCamp } from "../../hooks/useCreateCamp";

const CreateCampScreen = ({ navigation }) => {
	const {
		title,
		setTitle,
		location,
		setLocation,
		description,
		setDescription,
		showStartPicker,
		setShowStartPicker,
		showEndPicker,
		setShowEndPicker,
		category,
		setCategory,
		previewImage,
		setPreviewImage,
		maxParticipantCount,
		setMaxParticipantCount,
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		setImageUrl,
		handleCreateCamp,
	} = useCreateCamp(navigation);

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<Text style={styles.title}>🏕️ Kamp Oluştur</Text>

			<CampBasicInfoSection
				title={title}
				setTitle={setTitle}
				location={location}
				setLocation={setLocation}
				previewImage={previewImage}
				setPreviewImage={setPreviewImage}
				setImageUrl={setImageUrl}
			/>

			<CampSettingsSection
				category={category}
				setCategory={setCategory}
				maxParticipantCount={maxParticipantCount}
				setMaxParticipantCount={setMaxParticipantCount}
			/>

			<View style={styles.sectionCard}>
				<Text style={styles.sectionTitle}>Tarih Aralığı</Text>

				<View style={styles.dateContainer}>
					<TouchableOpacity
						style={styles.dateCard}
						onPress={() => setShowStartPicker(true)}
					>
						<Text style={styles.dateLabel}>Başlangıç</Text>

						<Text style={styles.dateValue}>
							{startDate.toLocaleDateString("tr-TR")}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.dateCard}
						onPress={() => setShowEndPicker(true)}
					>
						<Text style={styles.dateLabel}>Bitiş</Text>

						<Text style={styles.dateValue}>
							{endDate.toLocaleDateString("tr-TR")}
						</Text>
					</TouchableOpacity>
				</View>

				<Text
					style={[
						styles.sectionTitle,
						{
							marginTop: 8,
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

			{showStartPicker && (
				<DateTimePicker
					value={startDate}
					mode="date"
					display="default"
					onChange={(event, selectedDate) => {
						setShowStartPicker(false);

						if (selectedDate) {
							setStartDate(selectedDate);
						}
					}}
				/>
			)}

			{showEndPicker && (
				<DateTimePicker
					value={endDate}
					mode="date"
					display="default"
					onChange={(event, selectedDate) => {
						setShowEndPicker(false);

						if (selectedDate) {
							setEndDate(selectedDate);
						}
					}}
				/>
			)}

			<Button
				mode="contained"
				buttonColor="#2E7D32"
				style={styles.createButton}
				onPress={handleCreateCamp}
			>
				🚀 Kampı Oluştur
			</Button>

			<View style={{ height: 90 }} />
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
		borderRadius: 16,
		paddingVertical: 6,
	},

	dateContainer: {
		flexDirection: "row",
		gap: 12,
		marginBottom: 12,
	},

	dateCard: {
		flex: 1,
		backgroundColor: "#F7F8FA",
		padding: 16,
		borderRadius: 16,
	},

	dateLabel: {
		fontSize: 14,
		color: "#777",
		marginBottom: 8,
	},

	dateValue: {
		fontSize: 16,
		fontWeight: "600",
		color: "#222",
	},
});
