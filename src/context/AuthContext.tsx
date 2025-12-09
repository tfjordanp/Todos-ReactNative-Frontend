import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearToken, getToken, setToken } from "../storage/token";
import * as authService from "../services/auth";
import { User } from "../types/user";
import { LoginRequest, SignupRequest } from "../types/auth";

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (data: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function bootstrap() {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        setUser(null);
        return;
      }
      const me = await authService.fetchMe();
      setUser(me);
    } catch {
      // Token invalid or API unavailable
      await clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    bootstrap();
  }, []);

  async function login(data: LoginRequest) {
    const res = await authService.login(data);
    await setToken(res.access_token);
    const me = await authService.fetchMe();
    setUser(me);
  }

  async function signup(data: SignupRequest) {
    const user = await authService.signup(data);
    // After signup, user needs to login to get auth token
    // Redirect to login will be handled by the screen
    setUser(null);
  }

  async function logout() {
    await clearToken();
    setUser(null);
  }

  async function refreshMe() {
    const me = await authService.fetchMe();
    setUser(me);
  }

  const value = useMemo<AuthState>(
    () => ({
      isLoading,
      isAuthenticated,
      user,
      login,
      signup,
      logout,
      refreshMe,
    }),
    [isLoading, isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
