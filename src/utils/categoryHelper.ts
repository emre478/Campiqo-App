import { CAMP_CATEGORIES } from "../constants/campCategories";

export const getCategoryName = (categoryId: number) => {
	return CAMP_CATEGORIES.find((x) => x.id === categoryId)?.name || "-";
};

export const getCategoryIcon = (categoryId: number) => {
	return CAMP_CATEGORIES.find((x) => x.id === categoryId)?.icon || "🏕️";
};
