import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const CategoryIcon = ({ name, size = 28, color = "#8DD69A", style }) => {
	return (
		<MaterialCommunityIcons
			name={name}
			size={size}
			color={color}
			style={style}
		/>
	);
};

export default CategoryIcon;
