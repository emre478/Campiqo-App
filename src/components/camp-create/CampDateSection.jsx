import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const CampDateSection = ({
	startDate,
	endDate,
	setShowStartPicker,
	setShowEndPicker,
	description,
	setDescription,
}) => {
	return (
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

			<Text style={styles.sectionTitle}>Açıklama</Text>

			<TextInput
				style={styles.descriptionInput}
				multiline
				value={description}
				onChangeText={setDescription}
				placeholder="Kamp hakkında bilgi ver..."
			/>
		</View>
	);
};

export default CampDateSection;

const styles = StyleSheet.create({
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

	dateContainer: {
		flexDirection: "row",
		gap: 12,
		marginBottom: 20,
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

	descriptionInput: {
		backgroundColor: "#F7F8FA",
		borderRadius: 14,
		paddingHorizontal: 16,
		paddingVertical: 14,
		height: 120,
		marginTop: 12,
		textAlignVertical: "top",
	},
});
