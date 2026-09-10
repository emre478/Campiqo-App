import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useDispatch } from "react-redux";
import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import SocialAuthButton from "../../components/auth/SocialAuthButton";
import { loginWithPassword } from "../../features/auth/login";
import { loginSuccess } from "../../redux/slices/authSlice";

const LoginScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const showError = (message) => {
		setErrorMessage(message);
	};

	const handleLogin = async () => {
		try {
			setErrorMessage("");
			setLoading(true);

			const result = await loginWithPassword(email, password);

			if (!result.ok) {
				showError(result.message);
				return;
			}

			dispatch(loginSuccess(result.user));
		} catch {
			showError("Giriş sırasında beklenmeyen bir hata oluştu.");
		} finally {
			setLoading(false);
		}
	};

	const handleSocialLogin = (provider) => {
		showError(`${provider} ile giriş özelliği yakında eklenecek.`);
	};

	return (
		<View style={styles.container}>
			<AuthHeader />

			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
				>
					<AuthCard
						title="Giriş Yap"
						subtitle="Hesabına giriş yap ve kampları keşfet"
					>
						{errorMessage ? (
							<View style={styles.errorBanner}>
								<MaterialCommunityIcons
									name="alert-circle-outline"
									size={18}
									color="#F4A4A4"
								/>
								<Text style={styles.errorText}>{errorMessage}</Text>
							</View>
						) : null}

						<AuthInput
							icon="email-outline"
							label="E-Posta"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							autoCapitalize="none"
						/>

						<AuthInput
							icon="lock-outline"
							label="Şifre"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
						/>

						<TouchableOpacity
							style={[
								styles.primaryButton,
								loading && styles.primaryButtonDisabled,
							]}
							onPress={handleLogin}
							disabled={loading}
							activeOpacity={0.85}
						>
							{loading ? (
								<ActivityIndicator color="#F4F7EF" />
							) : (
								<>
									<MaterialCommunityIcons
										name="login"
										size={20}
										color="#F4F7EF"
									/>
									<Text style={styles.primaryButtonText}>
										Giriş Yap
									</Text>
								</>
							)}
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.linkButton}
							onPress={() => navigation.navigate("Register")}
							activeOpacity={0.85}
						>
							<Text style={styles.linkText}>
								Hesabın yok mu?{" "}
								<Text style={styles.linkTextAccent}>Kayıt Ol</Text>
							</Text>
						</TouchableOpacity>

						<View style={styles.dividerRow}>
							<View style={styles.dividerLine} />
							<Text style={styles.dividerText}>veya</Text>
							<View style={styles.dividerLine} />
						</View>

						<SocialAuthButton
							icon="google"
							label="Google ile Giriş Yap"
							variant="google"
							onPress={() => handleSocialLogin("Google")}
						/>

						<SocialAuthButton
							icon="apple"
							label="Apple ile Giriş Yap"
							variant="apple"
							onPress={() => handleSocialLogin("Apple")}
						/>
					</AuthCard>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#07130B",
	},

	flex: {
		flex: 1,
	},

	scrollContent: {
		paddingHorizontal: 20,
		paddingTop: 24,
		paddingBottom: 40,
	},

	errorBanner: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: "#1A1212",
		borderWidth: 1,
		borderColor: "#8B2E2E",
		borderRadius: 14,
		paddingHorizontal: 14,
		paddingVertical: 12,
		marginBottom: 16,
	},

	errorText: {
		flex: 1,
		color: "#F4A4A4",
		fontSize: 13,
		fontWeight: "600",
		lineHeight: 18,
	},

	primaryButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#2E7D32",
		borderRadius: 18,
		height: 54,
		marginTop: 6,
	},

	primaryButtonDisabled: {
		opacity: 0.75,
	},

	primaryButtonText: {
		fontSize: 16,
		fontWeight: "800",
		color: "#F4F7EF",
	},

	linkButton: {
		alignItems: "center",
		marginTop: 16,
		paddingVertical: 4,
	},

	linkText: {
		fontSize: 14,
		color: "#91A091",
		fontWeight: "600",
	},

	linkTextAccent: {
		color: "#8DD69A",
		fontWeight: "800",
	},

	dividerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 22,
		marginBottom: 18,
		gap: 12,
	},

	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: "#203A25",
	},

	dividerText: {
		fontSize: 13,
		fontWeight: "700",
		color: "#91A091",
	},
});
