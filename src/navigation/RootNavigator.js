import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { secureSessionStore } from "../api/sessionStore";
import { bootstrapSession } from "../features/auth/bootstrapSession";
import { loginSuccess, logout } from "../redux/slices/authSlice";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import CampDetailScreen from "../screens/camps/detail/CampDetailScreen";
import CampJoinRequestsScreen from "../screens/camps/request/CampJoinRequestsScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import MyCreatedCampsScreen from "../screens/profile/MyCreatedCampsScreen";
import MyJoinedCampsScreen from "../screens/profile/MyJoinedCampsScreen";
import UserCreatedCampsScreen from "../screens/profile/UserCreatedCampsScreen";
import UserJoinedCampsScreen from "../screens/profile/UserJoinedCampsScreen";
import UserProfileScreen from "../screens/profile/UserProfileScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

function SessionBootstrapView({ status, message, onRetry, onClearSession }) {
	if (status === "loading") {
		return (
			<View style={styles.bootstrapContainer}>
				<View style={styles.logoContainer}>
					<MaterialCommunityIcons name="tent" size={44} color="#8DD69A" />
				</View>

				<ActivityIndicator size="large" color="#8DD69A" />

				<Text style={styles.bootstrapTitle}>Campiqo hazırlanıyor</Text>

				<Text style={styles.bootstrapDescription}>
					Güvenli oturumun kontrol ediliyor.
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.bootstrapContainer}>
			<View style={styles.errorIconContainer}>
				<MaterialCommunityIcons
					name="cloud-alert-outline"
					size={40}
					color="#F4A4A4"
				/>
			</View>

			<Text style={styles.bootstrapTitle}>Oturum kontrol edilemedi</Text>

			<Text style={styles.bootstrapDescription}>{message}</Text>

			<TouchableOpacity
				style={styles.retryButton}
				onPress={onRetry}
				activeOpacity={0.85}
				accessibilityRole="button"
			>
				<MaterialCommunityIcons name="refresh" size={20} color="#F4F7EF" />

				<Text style={styles.retryButtonText}>Tekrar Dene</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.clearSessionButton}
				onPress={onClearSession}
				activeOpacity={0.85}
				accessibilityRole="button"
			>
				<Text style={styles.clearSessionButtonText}>
					Oturumu Temizle ve Giriş Yap
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default function RootNavigator() {
	const dispatch = useDispatch();

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const [bootstrapStatus, setBootstrapStatus] = useState("loading");
	const [bootstrapMessage, setBootstrapMessage] = useState("");

	const restoreStoredSession = useCallback(async () => {
		setBootstrapStatus("loading");
		setBootstrapMessage("");

		const result = await bootstrapSession();

		if (result.status === "authenticated") {
			dispatch(loginSuccess(result.user));
			setBootstrapStatus("ready");
			return;
		}

		if (result.status === "signedOut") {
			dispatch(logout());
			setBootstrapStatus("ready");
			return;
		}

		setBootstrapMessage(result.message);
		setBootstrapStatus("error");
	}, [dispatch]);

	useEffect(() => {
		restoreStoredSession();
	}, [restoreStoredSession]);

	const clearStoredSession = async () => {
		try {
			setBootstrapStatus("loading");
			setBootstrapMessage("");

			await secureSessionStore.clear();
			dispatch(logout());

			setBootstrapStatus("ready");
		} catch {
			setBootstrapMessage(
				"Güvenli oturum temizlenemedi. Lütfen tekrar dene."
			);
			setBootstrapStatus("error");
		}
	};

	if (bootstrapStatus !== "ready") {
		return (
			<SessionBootstrapView
				status={bootstrapStatus}
				message={bootstrapMessage}
				onRetry={restoreStoredSession}
				onClearSession={clearStoredSession}
			/>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator key={isAuthenticated ? "authenticated" : "guest"}>
				{isAuthenticated ? (
					<>
						<Stack.Screen
							name="Main"
							component={BottomTabNavigator}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="CampDetail"
							component={CampDetailScreen}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="MyCreatedCamps"
							component={MyCreatedCampsScreen}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="MyJoinedCamps"
							component={MyJoinedCampsScreen}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="EditProfile"
							component={EditProfileScreen}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="CampJoinRequests"
							component={CampJoinRequestsScreen}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="Notifications"
							component={NotificationsScreen}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="Chat"
							component={ChatScreen}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="UserProfile"
							component={UserProfileScreen}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="UserCreatedCamps"
							component={UserCreatedCampsScreen}
						/>

						<Stack.Screen
							name="UserJoinedCamps"
							component={UserJoinedCampsScreen}
						/>
					</>
				) : (
					<>
						<Stack.Screen
							name="Login"
							component={LoginScreen}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="Register"
							component={RegisterScreen}
							options={{
								headerShown: false,
							}}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	bootstrapContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#07130B",
		paddingHorizontal: 28,
	},

	logoContainer: {
		width: 82,
		height: 82,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#2E7D32",
		borderRadius: 41,
		marginBottom: 28,
	},

	errorIconContainer: {
		width: 76,
		height: 76,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#1A1212",
		borderWidth: 1,
		borderColor: "#8B2E2E",
		borderRadius: 38,
		marginBottom: 22,
	},

	bootstrapTitle: {
		color: "#F4F7EF",
		fontSize: 22,
		fontWeight: "800",
		textAlign: "center",
		marginTop: 18,
	},

	bootstrapDescription: {
		color: "#91A091",
		fontSize: 14,
		fontWeight: "600",
		lineHeight: 21,
		textAlign: "center",
		marginTop: 8,
		maxWidth: 340,
	},

	retryButton: {
		width: "100%",
		maxWidth: 340,
		height: 54,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#2E7D32",
		borderRadius: 18,
		marginTop: 28,
	},

	retryButtonText: {
		color: "#F4F7EF",
		fontSize: 15,
		fontWeight: "800",
	},

	clearSessionButton: {
		paddingHorizontal: 18,
		paddingVertical: 12,
		marginTop: 10,
	},

	clearSessionButtonText: {
		color: "#8DD69A",
		fontSize: 13,
		fontWeight: "700",
		textAlign: "center",
	},
});
