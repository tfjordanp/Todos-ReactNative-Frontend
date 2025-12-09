import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TamaguiProvider } from "tamagui";
import { AuthProvider } from "./src/context/AuthContext";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { config } from "./tamagui.config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 10_000,
    },
  },
});

export default function App() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
