import React from "react";
import { Searchbar } from "react-native-paper";

const SearchBar = ({ value, onChangeText }) => {
	return (
		<Searchbar
			value={value}
			onChangeText={onChangeText}
			placeholder="Kamp ara..."
			style={{
				marginHorizontal: 20,
				marginTop: 20,
				borderRadius: 16,
			}}
		/>
	);
};

export default SearchBar;
