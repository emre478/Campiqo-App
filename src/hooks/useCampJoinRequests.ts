import { useEffect, useState } from "react";
import {
	approveJoinRequest,
	getPendingJoinRequests,
	rejectJoinRequest,
} from "../services/campJoinRequestService";
import { CampJoinRequest } from "../types/CampJoinRequest";

export const useCampJoinRequests = (campId: string) => {
	const [requests, setRequests] = useState<CampJoinRequest[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadRequests();
	}, []);

	const loadRequests = async () => {
		try {
			const response = await getPendingJoinRequests(campId);

			setRequests(response.data || []);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleApprove = async (requestId: string) => {
		try {
			await approveJoinRequest(requestId);

			setRequests((prev) => prev.filter((x) => x.id !== requestId));
		} catch (error) {
			console.log(error);
		}
	};

	const handleReject = async (requestId: string) => {
		try {
			await rejectJoinRequest(requestId);

			setRequests((prev) => prev.filter((x) => x.id !== requestId));
		} catch (error) {
			console.log(error);
		}
	};

	return {
		requests,
		loading,
		handleApprove,
		handleReject,
		loadRequests,
	};
};
