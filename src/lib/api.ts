import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const authApi = {
  register: (username: string, password: string) =>
    api.post("/auth/register", { username, password }),
  login: (username: string, password: string) =>
    api.post("/auth/login", { username, password }),
};

export const userApi = {
  updateProfile: (userId: number, username?: string, color?: string) =>
    api.put("/users/profile", { userId, username, color }),
  getAll: () => api.get("/users"),
};
