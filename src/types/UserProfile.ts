export interface UserProfile {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	bio: string;
	city: string;
	profileImageUrl: string;
	experienceLevel: number;
	experienceLevelName: string;
	createdCampCount: number;
	joinedCampCount: number;
}