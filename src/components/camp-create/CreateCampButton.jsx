import React from "react";
import { Button } from "react-native-paper";

const CreateCampButton = ({ onPress }) => {
	return (
		<Button
			mode="contained"
			buttonColor="#4F8F5F"
			textColor="#fff"
			style={{
				borderRadius: 18,
				paddingVertical: 7,
			}}
			labelStyle={{
				fontSize: 15,
				fontWeight: "800",
			}}
			onPress={onPress}
		>
			Kampı Oluştur
		</Button>
	);
};

export default CreateCampButton;
