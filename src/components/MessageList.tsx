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

interface MessageListProps {
  messages: Message[];
  currentUserId: number;
  onAddReaction: (messageId: number, emoji: string) => void;
}

export default function MessageList({
  messages,
  onAddReaction,
}: MessageListProps) {
  const emojis = ["👍", "❤️", "😂", "😮", "😢", "🎉"];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => {
        if (!msg?.user) return null;

        return (
          <div key={msg.id} className="group">
            <div className="flex items-start gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: msg.user.color || "#3b82f6" }}
              >
                {msg.user.username?.[0]?.toUpperCase() || "?"}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-semibold"
                    style={{ color: msg.user.color || "#3b82f6" }}
                  >
                    {msg.user.username || "Utilisateur"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg px-3 py-2 mt-1 inline-block">
                  {msg.content}
                </div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {msg.reactions &&
                    msg.reactions.map((reaction, idx) => (
                      <button
                        key={idx}
                        className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        {reaction.emoji}
                      </button>
                    ))}
                </div>
                <div className="hidden group-hover:flex gap-1 mt-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => onAddReaction(msg.id, emoji)}
                      className="text-lg hover:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
