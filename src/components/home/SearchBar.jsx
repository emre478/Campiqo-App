import React from "react";
import { Searchbar } from "react-native-paper";

import { useTheme } from "../../theme/ThemeContext";
import { darkTheme, lightTheme } from "../../theme/colors";

const SearchBar = ({ value, onChangeText }) => {
	const { isDark } = useTheme();

	const theme = isDark ? darkTheme : lightTheme;

	return (
		<Searchbar
			value={value}
			onChangeText={onChangeText}
			placeholder="Kamp alanı ara..."
			style={{
				marginHorizontal: 20,
				marginTop: 20,
				borderRadius: 18,
				backgroundColor: theme.card,
			}}
			inputStyle={{
				color: theme.text,
			}}
		/>
	);
};

export default SearchBar;
