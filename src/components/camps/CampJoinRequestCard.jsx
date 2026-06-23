import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getTimeAgo } from "../../utils/dateUtils";

const getDisplayName = (request) =>
	request.fullName || request.userFullName || "Kullanıcı";

const getInitials = (name) => {
	const parts = name.trim().split(/\s+/).filter(Boolean);

	if (parts.length === 0) return "?";

	if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

	return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
};

const CampJoinRequestCard = ({ request, onApprove, onReject }) => {
	const displayName = getDisplayName(request);
	const initials = getInitials(displayName);

	return (
		<View style={styles.card}>
			<View style={styles.topRow}>
				<View style={styles.userInfo}>
					<View style={styles.avatar}>
						<Text style={styles.avatarText}>{initials}</Text>
					</View>

					<View style={styles.textBlock}>
						<Text style={styles.name}>{displayName}</Text>

						{request.createdAt ? (
							<View style={styles.timeRow}>
								<MaterialCommunityIcons
									name="clock-outline"
									size={12}
									color="#91A091"
								/>
								<Text style={styles.timeText}>
									{getTimeAgo(request.createdAt)}
								</Text>
							</View>
						) : null}
					</View>
				</View>

				<View style={styles.pendingBadge}>
					<MaterialCommunityIcons
						name="timer-sand"
						size={12}
						color="#FFD34D"
					/>
					<Text style={styles.pendingText}>Bekliyor</Text>
				</View>
			</View>

			<View style={styles.divider} />

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.approveButton}
					onPress={() => onApprove(request.id)}
					activeOpacity={0.85}
				>
					<MaterialCommunityIcons
						name="check"
						size={18}
						color="#F4F7EF"
					/>
					<Text style={styles.approveButtonText}>Kabul Et</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.rejectButton}
					onPress={() => onReject(request.id)}
					activeOpacity={0.85}
				>
					<MaterialCommunityIcons
						name="close"
						size={18}
						color="#F4A4A4"
					/>
					<Text style={styles.rejectButtonText}>Reddet</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CampJoinRequestCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#132617",
		padding: 18,
		borderRadius: 20,
		marginBottom: 14,
		borderWidth: 1,
		borderColor: "#203A25",
	},

	topRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		gap: 12,
	},

	userInfo: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},

	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#0D1C10",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
	},

	avatarText: {
		fontSize: 16,
		fontWeight: "800",
		color: "#8DD69A",
	},

	textBlock: {
		flex: 1,
	},

	name: {
		fontSize: 17,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	timeRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginTop: 4,
	},

	timeText: {
		fontSize: 12,
		color: "#91A091",
		fontWeight: "600",
	},

	pendingBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		backgroundColor: "#0D1C10",
		borderWidth: 1,
		borderColor: "#203A25",
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 12,
	},

	pendingText: {
		fontSize: 11,
		fontWeight: "700",
		color: "#FFD34D",
	},

	divider: {
		height: 1,
		backgroundColor: "#203A25",
		marginVertical: 14,
	},

	buttonContainer: {
		flexDirection: "row",
		gap: 10,
	},

	approveButton: {
		flex: 1,
		backgroundColor: "#2E7D32",
		paddingVertical: 12,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		gap: 6,
	},

	approveButtonText: {
		color: "#F4F7EF",
		fontWeight: "800",
	},

	rejectButton: {
		flex: 1,
		backgroundColor: "#0D1C10",
		borderWidth: 1,
		borderColor: "#8B2E2E",
		paddingVertical: 12,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		gap: 6,
	},

	rejectButtonText: {
		color: "#F4A4A4",
		fontWeight: "800",
	},
});
