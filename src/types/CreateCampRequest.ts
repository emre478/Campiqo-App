export interface CreateCampRequest {
	title: string;
	description: string;
	location: string;
	startDate: string;
	endDate: string;
	maxParticipantCount: number;
	imageUrl: string;
	category: number;
}