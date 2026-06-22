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
				placeholderTextColor="#7F907F"
			/>
		</View>
	);
};

export default CampDateSection;

const styles = StyleSheet.create({
	sectionCard: {
		backgroundColor: "#0D1C10",
		borderRadius: 24,
		padding: 18,
		marginBottom: 18,
		borderWidth: 1,
		borderColor: "#1C3320",
	},

	sectionTitle: {
		fontSize: 20,
		fontWeight: "800",
		color: "#F4F7EF",
		marginBottom: 14,
	},

	dateContainer: {
		flexDirection: "row",
		gap: 12,
		marginBottom: 22,
	},

	dateCard: {
		flex: 1,
		backgroundColor: "#132617",
		padding: 16,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	dateLabel: {
		fontSize: 13,
		color: "#91A091",
		marginBottom: 8,
	},

	dateValue: {
		fontSize: 15,
		fontWeight: "700",
		color: "#F4F7EF",
	},

	descriptionInput: {
		backgroundColor: "#132617",
		borderRadius: 16,
		paddingHorizontal: 16,
		paddingVertical: 14,
		height: 120,
		marginTop: 12,
		textAlignVertical: "top",
		color: "#F4F7EF",
		borderWidth: 1,
		borderColor: "#203A25",
	},
});
