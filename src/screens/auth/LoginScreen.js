import { useState } from "react";

import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({
      email,
      password,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            marginBottom: 40,
          }}
        >
          Campiqo
        </Text>

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <CustomButton
          title="Login"
          onPress={handleLogin}
        />
      </View>
    </KeyboardAvoidingView>
  );
}