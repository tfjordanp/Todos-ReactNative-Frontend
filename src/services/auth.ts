import { api } from "./api";
import { AuthResponse, LoginRequest, SignupRequest } from "../types/auth";
import { User } from "../types/user";

export async function login(data: LoginRequest) {
  const params = new URLSearchParams();
  params.append("username", data.username);
  params.append("password", data.password);
  
  const res = await api.post<AuthResponse>("/auth/login", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return res.data;
}

export async function signup(data: SignupRequest) {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
}

export async function fetchMe() {
  const res = await api.get<User>("/auth/me");
  return res.data;
}
