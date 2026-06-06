import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { Button, Snackbar, TextInput } from "react-native-paper";

import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";

import { register } from "../../services/authService";

const RegisterScreen = ({ navigation }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState("");

	const handleRegister = async () => {
		try {
			if (password !== confirmPassword) {
				setMessage("Şifreler eşleşmiyor.");
				setVisible(true);
				return;
			}

			const response = await register({
				email,
				password,
				firstName,
				lastName,
			});

			if (response === "User created") {
				setMessage("Kayıt başarılı.");

				setVisible(true);

				setTimeout(() => {
					navigation.replace("Login");
				}, 1500);
			} else {
				setMessage(response);
				setVisible(true);
			}
		} catch (error) {
			console.log(error?.response?.data);

			setMessage("Kayıt işlemi başarısız.");
			setVisible(true);
		}
	};

	return (
		<>
			<AuthHeader />

			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<AuthCard>
					<TextInput
						label="Ad"
						mode="outlined"
						value={firstName}
						onChangeText={setFirstName}
						style={styles.input}
						outlineStyle={styles.inputOutline}
					/>

					<TextInput
						label="Soyad"
						mode="outlined"
						value={lastName}
						onChangeText={setLastName}
						style={styles.input}
						outlineStyle={styles.inputOutline}
					/>

					<TextInput
						label="E-Posta"
						mode="outlined"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						style={styles.input}
						outlineStyle={styles.inputOutline}
					/>

					<TextInput
						label="Şifre"
						mode="outlined"
						secureTextEntry
						value={password}
						onChangeText={setPassword}
						style={styles.input}
						outlineStyle={styles.inputOutline}
					/>

					<TextInput
						label="Şifre Tekrar"
						mode="outlined"
						secureTextEntry
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						style={styles.input}
						outlineStyle={styles.inputOutline}
					/>

					<Button
						mode="contained"
						onPress={handleRegister}
						style={styles.button}
						contentStyle={{
							height: 52,
						}}
					>
						Kayıt Ol
					</Button>

					<Button
						mode="text"
						style={styles.loginButton}
						onPress={() => navigation.navigate("Login")}
					>
						Zaten hesabın var mı? Giriş Yap
					</Button>
				</AuthCard>

				<Snackbar
					visible={visible}
					onDismiss={() => setVisible(false)}
					duration={3000}
				>
					{message}
				</Snackbar>
			</KeyboardAvoidingView>
		</>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},

	input: {
		marginBottom: 18,
		backgroundColor: "#fff",
	},

	inputOutline: {
		borderRadius: 14,
	},

	button: {
		marginTop: 12,
		borderRadius: 14,
		backgroundColor: "#388E3C",
	},

	loginButton: {
		marginTop: 8,
	},
});
