import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import CampBasicInfoSection from "../../components/camp-create/CampBasicInfoSection";
import CampDateSection from "../../components/camp-create/CampDateSection";
import CampSettingsSection from "../../components/camp-create/CampSettingsSection";
import CreateCampButton from "../../components/camp-create/CreateCampButton";
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

			<CampDateSection
				startDate={startDate}
				endDate={endDate}
				setShowStartPicker={setShowStartPicker}
				setShowEndPicker={setShowEndPicker}
				description={description}
				setDescription={setDescription}
			/>

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
			<CreateCampButton onPress={handleCreateCamp} />

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

});
