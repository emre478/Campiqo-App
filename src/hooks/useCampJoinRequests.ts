import { useEffect, useState } from "react";
import {
	approveJoinRequest,
	getPendingRequests,
	rejectJoinRequest,
} from "../services/campJoinRequestService";

export const useCampJoinRequests = (campId) => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadRequests();
	}, []);

	const loadRequests = async () => {
		try {
			const response = await getPendingRequests(campId);

			setRequests(response.data || []);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleApprove = async (requestId) => {
		try {
			await approveJoinRequest(requestId);

			setRequests((prev) => prev.filter((x) => x.id !== requestId));
		} catch (error) {
			console.log(error);
		}
	};

	const handleReject = async (requestId) => {
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
