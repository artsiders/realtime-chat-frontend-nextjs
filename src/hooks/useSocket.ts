import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/authStore";
import type { Socket as ClientSocket } from "socket.io-client";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socket = getSocket();
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (!user) return;

    const s = getSocket();

    const typed = s as unknown as ClientSocket & { auth?: { userId: number } };
    typed.auth = { userId: user.id };
    s.connect();

    s.on("connect", () => {
      setIsConnected(true);
    });

    s.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      s.off("connect");
      s.off("disconnect");
    };
  }, [user]);

  return { socket, isConnected };
};
