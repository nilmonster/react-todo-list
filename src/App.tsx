import React from "react";
import { Center, NativeBaseProvider, StatusBar } from "native-base";
import Todo from "./views/todo";
import { useColorScheme } from "react-native";
import { customTheme } from "./theme";
import { RealmProvider } from "./contexts/db";

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <RealmProvider>
      <NativeBaseProvider theme={customTheme}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={isDarkMode ? "#333" : "#f3f3f3"}
        />
        <Center
          flex={1}
          bg={isDarkMode ? "coolGray.800" : "coolGray.50"}
        >
          <Todo />
        </Center>
      </NativeBaseProvider>
    </RealmProvider>
  );
}