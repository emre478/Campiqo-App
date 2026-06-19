export const getTimeAgo = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();

	const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diff < 60) return "Az önce";

	if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;

	if (diff < 86400) return `${Math.floor(diff / 3600)} saat önce`;

	if (diff < 604800) return `${Math.floor(diff / 86400)} gün önce`;

	return date.toLocaleDateString("tr-TR");
};

export const formatMessageTime = (dateString: string): string => {
	const date = new Date(dateString);

	return date.toLocaleTimeString("tr-TR", {
		hour: "2-digit",
		minute: "2-digit",
	});
};
