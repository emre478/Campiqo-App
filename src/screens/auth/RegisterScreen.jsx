import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { Button, Card, Snackbar, Text, TextInput } from "react-native-paper";
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
				navigation.replace("Login");
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
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<Card style={styles.card}>
				<Card.Content>
					<Text variant="headlineMedium" style={styles.title}>
						Kayıt Ol
					</Text>

					<TextInput
						label="Ad"
						mode="outlined"
						value={firstName}
						onChangeText={setFirstName}
						style={styles.input}
					/>

					<TextInput
						label="Soyad"
						mode="outlined"
						value={lastName}
						onChangeText={setLastName}
						style={styles.input}
					/>

					<TextInput
						label="E-Posta"
						mode="outlined"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						style={styles.input}
					/>

					<TextInput
						label="Şifre"
						mode="outlined"
						secureTextEntry
						value={password}
						onChangeText={setPassword}
						style={styles.input}
					/>

					<TextInput
						label="Şifre Tekrar"
						mode="outlined"
						secureTextEntry
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						style={styles.input}
					/>

					<Button
						mode="contained"
						onPress={handleRegister}
						style={styles.button}
					>
						Kayıt Ol
					</Button>

					<Button mode="text" onPress={() => navigation.navigate("Login")}>
						Zaten hesabın var mı? Giriş Yap
					</Button>
				</Card.Content>
			</Card>

			<Snackbar
				visible={visible}
				onDismiss={() => setVisible(false)}
				duration={3000}
			>
				{message}
			</Snackbar>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},

	card: {
		borderRadius: 20,
	},

	title: {
		textAlign: "center",
		marginBottom: 25,
		fontWeight: "bold",
	},

	input: {
		marginBottom: 12,
	},

	button: {
		marginTop: 10,
		marginBottom: 10,
	},
});
