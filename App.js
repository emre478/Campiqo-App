import React from "react";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { store } from "./src/redux/store";
import { appTheme } from "./src/theme/appTheme";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </Provider>
  );
}