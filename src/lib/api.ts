import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const authApi = {
  register: (
    email: string,
    username: string,
    password: string,
    displayColor: string
  ) => api.post("/auth/register", { email, username, password, displayColor }),
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
};

export const userApi = {
  updateProfile: (userId: number, username?: string, color?: string) =>
    api.put("/users/profile", { userId, username, color }),
  getAll: () => api.get("/users"),
};
