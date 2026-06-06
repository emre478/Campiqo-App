import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AuthHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Campiqo
      </Text>

      <Text style={styles.subtitle}>
        Doğayı Keşfet
      </Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
    opacity: 0.9,
  },
});