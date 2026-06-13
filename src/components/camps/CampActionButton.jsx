import React from "react";
import { Button } from "react-native-paper";

const CampActionButton = ({ buttonConfig, onPress }) => {
	return (
		<Button
			mode="contained"
			buttonColor={buttonConfig.color}
			textColor={buttonConfig.textColor}
			style={{
				marginTop: 24,
				borderRadius: 14,
				paddingVertical: 6,
			}}
			onPress={() => {
				if (!buttonConfig.disabled) {
					onPress();
				}
			}}
		>
			{buttonConfig.text}
		</Button>
	);
};

export default CampActionButton;
