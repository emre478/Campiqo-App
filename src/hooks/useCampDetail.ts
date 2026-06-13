import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Camp } from "../types/Camp";

import { addFavorite, removeFavorite } from "../redux/slices/favoriteSlice";

import { addPendingRequest } from "../redux/slices/joinRequestSlice";

import { favoriteCamp, unfavoriteCamp } from "../services/campService";

import { requestJoinCamp } from "../services/campJoinRequestService";

export const useCampDetail = (camp: Camp) => {
	const dispatch = useDispatch();

	const [isFavorited, setIsFavorited] = useState(camp.isFavorited);

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

	const buttonConfig = (() => {
		if (camp.isOwner) {
			return {
				text: "👑 Kamp Sahibi",
				color: "#E8F5E9",
				textColor: "#2E7D32",
				disabled: true,
			};
		}

		if (camp.isParticipant) {
			return {
				text: "✓ Katıldın",
				color: "#E8F5E9",
				textColor: "#2E7D32",
				disabled: true,
			};
		}

		if (hasPendingRequest) {
			return {
				text: "⏳ Katılma İsteği Gönderildi",
				color: "#FFF8E1",
				textColor: "#F9A825",
				disabled: true,
			};
		}

		if (camp.isFull) {
			return {
				text: "⚠ Kamp Dolu",
				color: "#FFF3E0",
				textColor: "#EF6C00",
				disabled: true,
			};
		}

		return {
			text: "Katıl",
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
	};
};
