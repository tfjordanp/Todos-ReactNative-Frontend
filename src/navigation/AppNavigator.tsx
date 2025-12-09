import React from "react";
import { AuthStack } from "./AuthStack";
import { MainTabs } from "./MainTabs";
import { useAuth } from "../context/AuthContext";
import { LoadingView } from "../components/LoadingView";

export function AppNavigator() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <LoadingView />;

  return isAuthenticated ? <MainTabs /> : <AuthStack />;
}
