import { useState } from "react";
import { useDispatch } from "react-redux";

import { setCamps } from "../redux/slices/campSlice";
import { createCamp, getCamps } from "../services/campService";
import { validateCreateCamp } from "../validations/createCampValidation";

export const useCreateCamp = (navigation: any) => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");
	const [showStartPicker, setShowStartPicker] = useState(false);
	const [showEndPicker, setShowEndPicker] = useState(false);
	const [category, setCategory] = useState(1);
	const [previewImage, setPreviewImage] = useState("");
	const [maxParticipantCount, setMaxParticipantCount] = useState(10);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [imageUrl, setImageUrl] = useState("");
	const [errors, setErrors] = useState({});

	const handleCreateCamp = async () => {
		const validationErrors = validateCreateCamp({
			title,
			description,
			location,
			startDate,
			endDate,
			maxParticipantCount,
		});

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setErrors({});

		try {
			await createCamp({
				title,
				description,
				location,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				maxParticipantCount,
				imageUrl,
				category,
			});

			const campsResponse = await getCamps(1, 10);

			dispatch(
				setCamps({
					items: campsResponse.data.items,
					page: campsResponse.data.page,
					totalCount: campsResponse.data.totalCount,
				})
			);

			navigation.navigate("Camps");
		} catch (error) {
			console.log(error);
		}
	};

	return {
		title,
		setTitle,

		location,
		setLocation,

		description,
		setDescription,

		showStartPicker,
		setShowStartPicker,

		showEndPicker,
		setShowEndPicker,

		category,
		setCategory,

		previewImage,
		setPreviewImage,

		maxParticipantCount,
		setMaxParticipantCount,

		startDate,
		setStartDate,

		endDate,
		setEndDate,

		imageUrl,
		setImageUrl,

		errors,

		handleCreateCamp,
	};
};
