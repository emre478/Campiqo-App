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
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import { register } from "../../services/authService";

const RegisterScreen = ({ navigation }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	const showMessage = (text, success = false) => {
		setMessage(text);
		setIsSuccess(success);
	};

	const handleRegister = async () => {
		try {
			setMessage("");

			if (password !== confirmPassword) {
				showMessage("Şifreler eşleşmiyor.");
				return;
			}

			setLoading(true);

			const response = await register({
				email,
				password,
				firstName,
				lastName,
			});

			if (response === "User created") {
				showMessage("Kayıt başarılı. Giriş sayfasına yönlendiriliyorsun...", true);

				setTimeout(() => {
					navigation.replace("Login");
				}, 1500);
			} else {
				showMessage(response || "Kayıt işlemi başarısız.");
			}
		} catch (error) {
			console.log(error?.response?.data);
			showMessage("Kayıt işlemi başarısız.");
		} finally {
			setLoading(false);
		}
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
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => navigation.goBack()}
						activeOpacity={0.85}
					>
						<MaterialCommunityIcons
							name="arrow-left"
							size={22}
							color="#F4F7EF"
						/>
					</TouchableOpacity>

					<AuthCard
						title="Kayıt Ol"
						subtitle="Yeni bir hesap oluştur ve kamplara katıl"
					>
						{message ? (
							<View
								style={[
									styles.messageBanner,
									isSuccess && styles.successBanner,
								]}
							>
								<MaterialCommunityIcons
									name={
										isSuccess
											? "check-circle-outline"
											: "alert-circle-outline"
									}
									size={18}
									color={isSuccess ? "#8DD69A" : "#F4A4A4"}
								/>
								<Text
									style={[
										styles.messageText,
										isSuccess && styles.successText,
									]}
								>
									{message}
								</Text>
							</View>
						) : null}

						<View style={styles.nameRow}>
							<View style={styles.nameField}>
								<AuthInput
									icon="account-outline"
									label="Ad"
									value={firstName}
									onChangeText={setFirstName}
								/>
							</View>

							<View style={styles.nameField}>
								<AuthInput
									icon="account-outline"
									label="Soyad"
									value={lastName}
									onChangeText={setLastName}
								/>
							</View>
						</View>

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

						<AuthInput
							icon="lock-check-outline"
							label="Şifre Tekrar"
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry
						/>

						<TouchableOpacity
							style={[
								styles.primaryButton,
								loading && styles.primaryButtonDisabled,
							]}
							onPress={handleRegister}
							disabled={loading}
							activeOpacity={0.85}
						>
							{loading ? (
								<ActivityIndicator color="#F4F7EF" />
							) : (
								<>
									<MaterialCommunityIcons
										name="account-plus-outline"
										size={20}
										color="#F4F7EF"
									/>
									<Text style={styles.primaryButtonText}>
										Kayıt Ol
									</Text>
								</>
							)}
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.linkButton}
							onPress={() => navigation.navigate("Login")}
							activeOpacity={0.85}
						>
							<Text style={styles.linkText}>
								Zaten hesabın var mı?{" "}
								<Text style={styles.linkTextAccent}>Giriş Yap</Text>
							</Text>
						</TouchableOpacity>
					</AuthCard>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default RegisterScreen;

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
		paddingTop: 12,
		paddingBottom: 40,
	},

	backButton: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},

	nameRow: {
		flexDirection: "row",
		gap: 10,
	},

	nameField: {
		flex: 1,
	},

	messageBanner: {
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

	successBanner: {
		backgroundColor: "#0F2415",
		borderColor: "#2E7D32",
	},

	messageText: {
		flex: 1,
		color: "#F4A4A4",
		fontSize: 13,
		fontWeight: "600",
		lineHeight: 18,
	},

	successText: {
		color: "#8DD69A",
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
});
