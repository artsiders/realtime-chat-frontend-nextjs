import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/authStore";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socket = getSocket();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [user, socket]);

  return { socket, isConnected };
};
