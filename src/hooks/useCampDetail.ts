import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Camp } from "../types/Camp";

import { addFavorite, removeFavorite } from "../redux/slices/favoriteSlice";

import { addPendingRequest } from "../redux/slices/joinRequestSlice";

import { favoriteCamp, unfavoriteCamp } from "../services/campService";

import {
	addCampComment,
	deleteCampComment,
	getCampComments,
} from "../services/campCommentService";
import { requestJoinCamp } from "../services/campJoinRequestService";

export const useCampDetail = (camp: Camp) => {
	const dispatch = useDispatch();

	const [isFavorited, setIsFavorited] = useState(camp.isFavorited);
	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [commentsLoading, setCommentsLoading] = useState(false);

	useEffect(() => {
		if (camp?.isCompleted) {
			loadComments();
		}
	}, [camp.id, camp.isCompleted]);
	const pendingCampIds = useSelector(
		(state: any) => state.joinRequest.pendingCampIds
	);

	const hasPendingRequest =
		camp.hasPendingRequest || pendingCampIds.includes(camp.id);

	const handleFavorite = async () => {
		try {
			if (isFavorited) {
				await unfavoriteCamp(camp.id);

				dispatch(removeFavorite(camp.id));

				setIsFavorited(false);
			} else {
				await favoriteCamp(camp.id);

				dispatch(
					addFavorite({
						...camp,
						isFavorited: true,
					})
				);

				setIsFavorited(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleJoin = async () => {
		try {
			await requestJoinCamp(camp.id);

			dispatch(addPendingRequest(camp.id));
		} catch (error: any) {
			if (error.response?.data?.message === "Zaten istek gönderdiniz") {
				dispatch(addPendingRequest(camp.id));
			}
		}
	};

	const loadComments = async () => {
		try {
			setCommentsLoading(true);

			const response = await getCampComments(camp.id);

			setComments(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setCommentsLoading(false);
		}
	};

	const handleAddComment = async () => {
		if (!commentText.trim()) return;

		try {
			await addCampComment(camp.id, commentText);

			setCommentText("");

			await loadComments();
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteComment = async (commentId: string) => {
		try {
			await deleteCampComment(commentId);

			await loadComments();
		} catch (error) {
			console.log(error);
		}
	};

	const buttonConfig = (() => {
		if (camp.isOwner) {
			return {
				text: "Kamp Sahibi",
				icon: "crown",
				color: "#E8F5E9",
				textColor: "#2E7D32",
				disabled: true,
			};
		}

		if (camp.isParticipant) {
			return {
				text: "Katıldın",
				icon: "check-circle",
				color: "#E8F5E9",
				textColor: "#2E7D32",
				disabled: true,
			};
		}

		if (hasPendingRequest) {
			return {
				text: "Katılma İsteği Gönderildi",
				icon: "clock-outline",
				color: "#FFF8E1",
				textColor: "#F9A825",
				disabled: true,
			};
		}

		if (camp.isFull) {
			return {
				text: "Kamp Dolu",
				icon: "alert-circle-outline",
				color: "#FFF3E0",
				textColor: "#EF6C00",
				disabled: true,
			};
		}

		return {
			text: "Katıl",
			icon: "account-plus-outline",
			color: "#2E7D32",
			textColor: "#FFFFFF",
			disabled: false,
		};
	})();

	return {
		isFavorited,
		handleFavorite,
		handleJoin,
		buttonConfig,
		comments,
		commentText,
		setCommentText,
		handleAddComment,
		handleDeleteComment,
		commentsLoading,
	};
};
