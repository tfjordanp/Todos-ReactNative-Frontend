import { api } from "./api";
import { AuthResponse, LoginRequest, SignupRequest } from "../types/auth";
import { User } from "../types/user";

export async function login(data: LoginRequest) {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
}

export async function signup(data: SignupRequest) {
  const res = await api.post<AuthResponse>("/auth/signup", data);
  return res.data;
}

export async function fetchMe() {
  const res = await api.get<User>("/users/me");
  return res.data;
}
