import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.scrollContent}
		>
			<View style={styles.header}>
				<View>
					<Text style={styles.title}>Kamp Oluştur</Text>
					<Text style={styles.subtitle}>
						Yeni bir kamp deneyimi planla
					</Text>
				</View>

				<View style={styles.headerIcon}>
					<MaterialCommunityIcons
						name="tent"
						size={26}
						color="#8DD69A"
					/>
				</View>
			</View>

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
		</ScrollView>
	);
};

export default CreateCampScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#07130B",
	},

	scrollContent: {
		paddingHorizontal: 20,
		paddingTop: 56,
		paddingBottom: 100,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 24,
	},

	title: {
		fontSize: 32,
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
});
