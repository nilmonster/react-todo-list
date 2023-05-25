import React from "react";
import { Center, NativeBaseProvider, StatusBar } from "native-base";
import Todo from "./screens/todo";
import { useColorScheme } from "react-native";
import { customTheme } from "./theme";
import { RealmProvider } from "./contexts/db";
import { ContextProvider } from "./contexts";

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <ContextProvider>
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
    </ContextProvider>
  );
}