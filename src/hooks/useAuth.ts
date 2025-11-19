import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useAuth = () => {
  const { user, setUser, logout: logoutStore } = useAuthStore();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => authApi.login(username, password),
    onSuccess: (response) => {
      setUser(response.data);
      toast.success("Connecté avec succès!");
      router.push("/chat");
    },
    onError: () => {
      toast.error("Identifiants invalides");
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => authApi.register(username, password),
    onSuccess: (response) => {
      setUser(response.data);
      toast.success("Compte créé avec succès!");
      router.push("/chat");
    },
    onError: () => {
      toast.error("Nom d'utilisateur déjà pris");
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
