import { useState, useEffect } from "react";
import { getSocket } from "@/lib/socket";

interface User {
  id: number;
  username: string;
  color: string;
}

interface Reaction {
  id: number;
  emoji: string;
  user: User;
}

interface Message {
  id: number;
  content: string;
  user: User;
  createdAt: string;
  reactions: Reaction[];
}

export const useMessages = (roomId: number | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = getSocket();

  useEffect(() => {
    if (!roomId) return;

    socket.emit(
      "joinRoom",
      { roomId, userId: 1 },
      (response: { messages: Message[] }) => {
        setMessages(response.messages || []);
      }
    );

    socket.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("reactionUpdated", () => {
      // Recharger les messages pour avoir les réactions à jour
    });

    return () => {
      socket.off("newMessage");
      socket.off("reactionUpdated");
    };
  }, [roomId, socket]);

  const sendMessage = (content: string, userId: number) => {
    if (!roomId) return;
    socket.emit("sendMessage", { roomId, userId, content });
  };

  const addReaction = (messageId: number, userId: number, emoji: string) => {
    socket.emit("addReaction", { messageId, userId, emoji });
  };

  return { messages, sendMessage, addReaction };
};
