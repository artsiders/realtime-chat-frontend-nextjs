import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type AuthUser = {
  id: number | string;
  username: string;
  color?: string;
  displayColor?: string;
};

type AuthResponse = AuthUser | { user: AuthUser };

const getErrorMessage = (error: unknown, fallback: string) => {
  if (!axios.isAxiosError(error)) return fallback;

  const message = error.response?.data?.message;
  if (Array.isArray(message)) return message.join(", ");
  if (typeof message === "string") return message;

  return error.response?.data?.error ?? fallback;
};

export const useAuth = () => {
  const { user, setUser, logout: logoutStore } = useAuthStore();
  const router = useRouter();

  const setAuthenticatedUser = (data: AuthResponse) => {
    const authUser = "user" in data ? data.user : data;
    setUser({
      id: Number(authUser.id),
      username: authUser.username,
      color: authUser.color ?? authUser.displayColor ?? "#2563eb",
    });
  };

  const loginMutation = useMutation({
    mutationFn: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => authApi.login(email, password),
    onSuccess: (response) => {
      setAuthenticatedUser(response.data);
      toast.success("Connecté avec succès!");
      router.push("/chat");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Identifiants invalides"));
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({
      email,
      username,
      password,
      displayColor,
    }: {
      email: string;
      username: string;
      password: string;
      displayColor: string;
    }) => authApi.register(email, username, password, displayColor),
    onSuccess: (response) => {
      setAuthenticatedUser(response.data);
      toast.success("Compte créé avec succès!");
      router.push("/chat");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Inscription impossible"));
    },
  });

  const logout = () => {
    logoutStore();
    router.push("/");
    toast.success("Déconnecté");
  };

  return {
    user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  };
};
