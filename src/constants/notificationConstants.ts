export const getNotificationConfig = (type: number) => {
	switch (type) {
		case 1:
			return {
				icon: "account-group",
				color: "#1976D2",
				label: "Katılım",
			};

		case 2:
			return {
				icon: "heart",
				color: "#E53935",
				label: "Favori",
			};

		case 3:
			return {
				icon: "comment-text",
				color: "#FB8C00",
				label: "Yorum",
			};

		case 4:
			return {
				icon: "star",
				color: "#FBC02D",
				label: "Puanlama",
			};

		case 5:
			return {
				icon: "cancel",
				color: "#757575",
				label: "İptal",
			};

		default:
			return {
				icon: "bell",
				color: "#2E7D32",
				label: "Bildirim",
			};
	}
};
