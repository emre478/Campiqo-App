import React from "react";
import { Button } from "react-native-paper";

const CreateCampButton = ({ onPress }) => {
	return (
		<Button
			mode="contained"
			buttonColor="#2E7D32"
			style={{
				borderRadius: 16,
				paddingVertical: 6,
			}}
			onPress={onPress}
		>
			🚀 Kampı Oluştur
		</Button>
	);
};

export default CreateCampButton;
