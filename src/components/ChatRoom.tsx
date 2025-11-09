"use client";

import { useAuthStore } from "@/store/authStore";
import { useMessages } from "@/hooks/useMessages";
import { useRooms } from "@/hooks/useRooms";
import { useTyping } from "@/hooks/useTyping";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import RoomSidebar from "./RoomSidebar";
import TypingIndicator from "./TypingIndicator";

export default function ChatRoom() {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const { isConnected } = useSocket();
  const { rooms, currentRoomId, setCurrentRoomId, createRoom } = useRooms();
  const { messages, sendMessage, addReaction } = useMessages(currentRoomId);
  const { typingUsers, startTyping, stopTyping } = useTyping(
    currentRoomId,
    user?.id || 0,
    user?.username || ""
  );

  if (!user) return null;

  return (
    <div className="app-shell">
      <div className="chat-panel">
        <RoomSidebar
          rooms={rooms}
          currentRoomId={currentRoomId}
          onRoomSelect={setCurrentRoomId}
          onCreateRoom={createRoom}
          onLogout={logout}
          username={user.username}
          color={user.color}
        />
        <div className="chat-content">
          <div className="header-panel flex items-center justify-between">
            <h1 className="text-lg font-semibold">
              # {rooms.find((r) => r.id === currentRoomId)?.name || "Salon"}
            </h1>
            <div className="flex items-center gap-3">
              <span
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm muted">
                {isConnected ? "Connecté" : "Déconnecté"}
              </span>
            </div>
          </div>

          <MessageList
            messages={messages}
            currentUserId={user.id}
            onAddReaction={(messageId, emoji) =>
              addReaction(messageId, user.id, emoji)
            }
          />

          <TypingIndicator usernames={typingUsers} />

          <MessageInput
            onSend={(content) => sendMessage(content, user.id)}
            onTyping={startTyping}
            onStopTyping={stopTyping}
          />
        </div>
      </div>
    </div>
  );
}
