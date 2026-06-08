import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

const CreateCampScreen = () => {
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");

	const [category, setCategory] = useState(1);

	const [maxParticipantCount, setMaxParticipantCount] = useState(10);

	const [startDate, setStartDate] = useState(new Date());

	const [endDate, setEndDate] = useState(new Date());

	const [imageUrl, setImageUrl] = useState("");

	return (
		<ScrollView style={styles.container}>
			<Text>Create Camp</Text>
		</ScrollView>
	);
};

export default CreateCampScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F7FB",
	},
});
