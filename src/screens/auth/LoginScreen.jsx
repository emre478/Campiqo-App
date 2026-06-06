import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Button, Card, Snackbar, Text, TextInput } from "react-native-paper";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { login } from "../../services/authService";
import { saveToken } from "../../services/tokenService";

const LoginScreen = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [visible, setVisible] = useState(false);

	const handleLogin = async () => {
		try {
			setLoading(true);

			const response = await login(email, password);

			if (response.isSuccess) {
				const token = response.data;

				await saveToken(token);

				dispatch(
					loginSuccess({
						token,
						user: null,
					})
				);

				console.log("Login başarılı");
			} else {
				setErrorMessage(response.message);
				setVisible(true);
			}
		} catch (error) {
			console.log("LOGIN ERROR");
			console.log(error?.response?.data);
			console.log(error?.message);

			setErrorMessage("Giriş yapılırken hata oluştu.");
			setVisible(true);
		} finally {
			setLoading(false);
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
						Campiqo
					</Text>

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

					<Button
						mode="contained"
						onPress={handleLogin}
						loading={loading}
						disabled={loading}
						style={styles.button}
					>
						Giriş Yap
					</Button>
					<Button
						mode="text"
						onPress={() => navigation.navigate("Register")}
					>
						Hesabın yok mu? Kayıt Ol
					</Button>
				</Card.Content>
			</Card>

			<Snackbar
				visible={visible}
				onDismiss={() => setVisible(false)}
				duration={3000}
			>
				{errorMessage}
			</Snackbar>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

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
		marginBottom: 15,
	},

	button: {
		marginTop: 10,
		paddingVertical: 5,
	},
});
