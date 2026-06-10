interface CreateCampValidationParams {
	title: string;
	description: string;
	location: string;
	startDate: Date;
	endDate: Date;
	maxParticipantCount: number;
}

export const validateCreateCamp = (
	data: CreateCampValidationParams
) => {
	const errors: Record<string, string> = {};

	if (!data.title.trim()) {
		errors.title = "Kamp başlığı zorunludur";
	}

	if (!data.description.trim()) {
		errors.description =
			"Açıklama zorunludur";
	}

	if (!data.location.trim()) {
		errors.location =
			"Lokasyon zorunludur";
	}

	if (data.startDate <= new Date()) {
		errors.startDate =
			"Başlangıç tarihi gelecekte olmalıdır";
	}

	if (data.endDate <= data.startDate) {
		errors.endDate =
			"Bitiş tarihi başlangıç tarihinden sonra olmalıdır";
	}

	if (data.maxParticipantCount <= 0) {
		errors.maxParticipantCount =
			"Katılımcı sayısı 0'dan büyük olmalıdır";
	}

	return errors;
};