import React from "react";
import { PaperProvider } from "react-native-paper";
import RootNavigator from "./src/navigation/RootNavigator";
import { appTheme } from "./src/theme/appTheme";

export default function App() {
  return (
    <PaperProvider theme={appTheme}>
      <RootNavigator />
    </PaperProvider>
  );
}