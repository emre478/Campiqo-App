import {
	CAMP_CATEGORIES,
	DEFAULT_CATEGORY_ICON,
} from "../constants/campCategories";

export const getCategoryName = (categoryId: number) => {
	return CAMP_CATEGORIES.find((x) => x.id === categoryId)?.name || "-";
};

export const getCategoryIcon = (categoryId: number) => {
	return (
		CAMP_CATEGORIES.find((x) => x.id === categoryId)?.icon ||
		DEFAULT_CATEGORY_ICON
	);
};
