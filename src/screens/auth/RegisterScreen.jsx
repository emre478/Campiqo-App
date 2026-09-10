import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Linking,
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
import {
	loadRegistrationLegalDocuments,
	registerWithPassword,
} from "../../features/auth/register";
import { loginSuccess } from "../../redux/slices/authSlice";

const RegisterScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [legalDocuments, setLegalDocuments] = useState(null);
	const [legalLoading, setLegalLoading] = useState(true);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const loadLegalDocuments = async () => {
		try {
			setLegalLoading(true);
			setMessage("");

			const result = await loadRegistrationLegalDocuments();

			if (!result.ok) {
				setLegalDocuments(null);
				setMessage(result.message);
				return;
			}

			setLegalDocuments(result.documents);
		} catch {
			setLegalDocuments(null);
			setMessage("Yasal belgeler yüklenirken beklenmeyen bir hata oluştu.");
		} finally {
			setLegalLoading(false);
		}
	};

	useEffect(() => {
		loadLegalDocuments();
	}, []);

	const openLegalDocument = async (url) => {
		try {
			await Linking.openURL(url);
		} catch {
			setMessage("Belge bağlantısı açılamadı.");
		}
	};

	const handleRegister = async () => {
		if (!legalDocuments) {
			setMessage("Kayıt için gerekli yasal belgeler henüz yüklenmedi.");
			return;
		}

		try {
			setMessage("");
			setLoading(true);

			const result = await registerWithPassword({
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
				hasAcceptedTermsOfUse: acceptedTerms,
				hasAcceptedPrivacyPolicy: acceptedPrivacy,
				legalDocuments,
			});

			if (!result.ok) {
				setMessage(result.message);
				return;
			}

			dispatch(loginSuccess(result.user));
		} catch {
			setMessage("Kayıt sırasında beklenmeyen bir hata oluştu.");
		} finally {
			setLoading(false);
		}
	};

	const registerDisabled = loading || legalLoading || !legalDocuments;

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
						accessibilityRole="button"
						accessibilityLabel="Geri dön"
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
							<View style={styles.messageBanner}>
								<MaterialCommunityIcons
									name="alert-circle-outline"
									size={18}
									color="#F4A4A4"
								/>

								<Text style={styles.messageText}>{message}</Text>
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
							autoCorrect={false}
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

						<View style={styles.legalSection}>
							{legalLoading ? (
								<View style={styles.legalLoading}>
									<ActivityIndicator size="small" color="#8DD69A" />

									<Text style={styles.legalLoadingText}>
										Yasal belgeler yükleniyor...
									</Text>
								</View>
							) : legalDocuments ? (
								<>
									<View style={styles.consentRow}>
										<TouchableOpacity
											style={styles.checkboxButton}
											onPress={() =>
												setAcceptedTerms((value) => !value)
											}
											activeOpacity={0.8}
											accessibilityRole="checkbox"
											accessibilityState={{
												checked: acceptedTerms,
											}}
											accessibilityLabel="Kullanım koşullarını kabul et"
										>
											<MaterialCommunityIcons
												name={
													acceptedTerms
														? "checkbox-marked"
														: "checkbox-blank-outline"
												}
												size={26}
												color={
													acceptedTerms ? "#8DD69A" : "#91A091"
												}
											/>
										</TouchableOpacity>

										<View style={styles.consentContent}>
											<Text style={styles.consentText}>
												Kullanım koşullarını okudum ve kabul
												ediyorum.
											</Text>

											<TouchableOpacity
												onPress={() =>
													openLegalDocument(
														legalDocuments.termsOfUse.url
													)
												}
												activeOpacity={0.8}
												accessibilityRole="link"
											>
												<Text style={styles.documentLink}>
													Kullanım Koşulları (
													{legalDocuments.termsOfUse.version})
												</Text>
											</TouchableOpacity>
										</View>
									</View>

									<View style={styles.consentRow}>
										<TouchableOpacity
											style={styles.checkboxButton}
											onPress={() =>
												setAcceptedPrivacy((value) => !value)
											}
											activeOpacity={0.8}
											accessibilityRole="checkbox"
											accessibilityState={{
												checked: acceptedPrivacy,
											}}
											accessibilityLabel="Gizlilik politikasını kabul et"
										>
											<MaterialCommunityIcons
												name={
													acceptedPrivacy
														? "checkbox-marked"
														: "checkbox-blank-outline"
												}
												size={26}
												color={
													acceptedPrivacy ? "#8DD69A" : "#91A091"
												}
											/>
										</TouchableOpacity>

										<View style={styles.consentContent}>
											<Text style={styles.consentText}>
												Gizlilik politikasını okudum ve kabul
												ediyorum.
											</Text>

											<TouchableOpacity
												onPress={() =>
													openLegalDocument(
														legalDocuments.privacyPolicy.url
													)
												}
												activeOpacity={0.8}
												accessibilityRole="link"
											>
												<Text style={styles.documentLink}>
													Gizlilik Politikası (
													{legalDocuments.privacyPolicy.version})
												</Text>
											</TouchableOpacity>
										</View>
									</View>
								</>
							) : (
								<TouchableOpacity
									style={styles.retryButton}
									onPress={loadLegalDocuments}
									activeOpacity={0.85}
									accessibilityRole="button"
								>
									<MaterialCommunityIcons
										name="refresh"
										size={18}
										color="#8DD69A"
									/>

									<Text style={styles.retryButtonText}>
										Belgeleri Tekrar Yükle
									</Text>
								</TouchableOpacity>
							)}
						</View>

						<TouchableOpacity
							style={[
								styles.primaryButton,
								registerDisabled && styles.primaryButtonDisabled,
							]}
							onPress={handleRegister}
							disabled={registerDisabled}
							activeOpacity={0.85}
							accessibilityRole="button"
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
							accessibilityRole="button"
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

	messageText: {
		flex: 1,
		color: "#F4A4A4",
		fontSize: 13,
		fontWeight: "600",
		lineHeight: 18,
	},

	legalSection: {
		marginTop: 4,
		marginBottom: 8,
		gap: 14,
	},

	legalLoading: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		minHeight: 54,
	},

	legalLoadingText: {
		color: "#91A091",
		fontSize: 13,
		fontWeight: "600",
	},

	consentRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		backgroundColor: "#0F1E13",
		borderWidth: 1,
		borderColor: "#203A25",
		borderRadius: 14,
		padding: 12,
	},

	checkboxButton: {
		paddingRight: 10,
		paddingBottom: 8,
	},

	consentContent: {
		flex: 1,
		gap: 5,
	},

	consentText: {
		color: "#C9D3C9",
		fontSize: 13,
		fontWeight: "600",
		lineHeight: 18,
	},

	documentLink: {
		color: "#8DD69A",
		fontSize: 13,
		fontWeight: "800",
		lineHeight: 18,
		textDecorationLine: "underline",
	},

	retryButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		minHeight: 48,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#2E7D32",
		borderRadius: 14,
		paddingHorizontal: 14,
	},

	retryButtonText: {
		color: "#8DD69A",
		fontSize: 13,
		fontWeight: "800",
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
		opacity: 0.5,
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
