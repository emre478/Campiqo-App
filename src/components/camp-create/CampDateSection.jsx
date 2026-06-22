import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
			<View style={styles.sectionHeader}>
				<MaterialCommunityIcons
					name="calendar-range"
					size={20}
					color="#6DA878"
				/>
				<Text style={styles.sectionTitle}>Tarih Aralığı</Text>
			</View>

			<View style={styles.dateContainer}>
				<TouchableOpacity
					style={styles.dateCard}
					onPress={() => setShowStartPicker(true)}
					activeOpacity={0.85}
				>
					<View style={styles.dateIconWrap}>
						<MaterialCommunityIcons
							name="calendar-start"
							size={18}
							color="#8DD69A"
						/>
					</View>
					<Text style={styles.dateLabel}>Başlangıç</Text>
					<Text style={styles.dateValue}>
						{startDate.toLocaleDateString("tr-TR")}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.dateCard}
					onPress={() => setShowEndPicker(true)}
					activeOpacity={0.85}
				>
					<View style={styles.dateIconWrap}>
						<MaterialCommunityIcons
							name="calendar-end"
							size={18}
							color="#8DD69A"
						/>
					</View>
					<Text style={styles.dateLabel}>Bitiş</Text>
					<Text style={styles.dateValue}>
						{endDate.toLocaleDateString("tr-TR")}
					</Text>
				</TouchableOpacity>
			</View>

			<View style={[styles.sectionHeader, styles.descriptionHeader]}>
				<MaterialCommunityIcons
					name="text-box-outline"
					size={20}
					color="#6DA878"
				/>
				<Text style={styles.sectionTitle}>Açıklama</Text>
			</View>

			<TextInput
				style={styles.descriptionInput}
				multiline
				value={description}
				onChangeText={setDescription}
				placeholder="Kamp hakkında bilgi ver..."
				placeholderTextColor="#91A091"
			/>
		</View>
	);
};

export default CampDateSection;

const styles = StyleSheet.create({
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
		marginBottom: 14,
	},

	descriptionHeader: {
		marginTop: 4,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	dateContainer: {
		flexDirection: "row",
		gap: 12,
		marginBottom: 8,
	},

	dateCard: {
		flex: 1,
		backgroundColor: "#0D1C10",
		padding: 14,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	dateIconWrap: {
		width: 34,
		height: 34,
		borderRadius: 17,
		backgroundColor: "#132617",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
	},

	dateLabel: {
		fontSize: 11,
		fontWeight: "600",
		color: "#91A091",
		marginBottom: 6,
		textTransform: "uppercase",
		letterSpacing: 0.4,
	},

	dateValue: {
		fontSize: 14,
		fontWeight: "700",
		color: "#F4F7EF",
	},

	descriptionInput: {
		backgroundColor: "#0D1C10",
		borderRadius: 18,
		paddingHorizontal: 16,
		paddingVertical: 14,
		minHeight: 120,
		textAlignVertical: "top",
		color: "#F4F7EF",
		borderWidth: 1,
		borderColor: "#203A25",
		fontSize: 15,
		lineHeight: 22,
	},
});
