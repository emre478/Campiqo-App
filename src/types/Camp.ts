export interface Camp {
	id: string;
	title: string;
	description: string;
	location: string;
	startDate: string;
	endDate: string;
	participantCount: number;
	maxParticipantCount: number;
	ownerName: string;
	imageUrl: string;
	category: number;
	categoryName: string;
	isOwner: boolean;
	isParticipant: boolean;
	isFavorited: boolean;
	hasPendingRequest: boolean;
	isFull: boolean;
	statusId: number;
	statusName: string;
	averageRating: number;
	ratingCount: number;
	isCompleted: boolean;
}