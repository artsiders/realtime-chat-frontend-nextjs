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
  currentUserId,
  onAddReaction,
}: MessageListProps) {
  const emojis = ["👍", "❤️", "😂", "😮", "😢", "🎉"];

  return (
    <div className="message-list">
      {messages.map((msg) => {
        if (!msg?.user) return null;

        const isMe = msg.user.id === currentUserId;

        return (
          <div key={msg.id} className={`message-row ${isMe ? "me" : ""}`}>
            {!isMe && (
              <div
                className="avatar-small flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: msg.user.color || "#3b82f6" }}
              >
                {msg.user.username?.[0]?.toUpperCase() || "?"}
              </div>
            )}

            <div className="flex flex-col">
              {!isMe && (
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-semibold"
                    style={{ color: msg.user.color || "#3b82f6" }}
                  >
                    {msg.user.username || "Utilisateur"}
                  </span>
                  <span className="message-meta">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              )}

              {/* BUBBLE: plus de gradient, couleurs simples, bulle autre claire mais visible sur fond blanc */}
              <div
                className={`message-bubble`}
                style={{
                  background: isMe ? "#3b82f6" : "#f1f5f9", // bleu solide ou gris clair (bg-slate-100)
                  color: isMe ? "#fff" : "#22223b", // blanc pour moi, presque noir pour autres
                  borderRadius: isMe
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                  border: isMe ? "1px solid #3b82f6" : "1px solid #e5e7eb", // bordure gris sur bulle claire
                }}
              >
                {msg.content}
              </div>

              <div className="flex gap-2 items-center mt-2">
                <div className="flex gap-1 flex-wrap">
                  {msg.reactions &&
                    msg.reactions.map((reaction, idx) => (
                      <button
                        key={idx}
                        className="text-sm bg-gray-100 px-2 py-1 rounded-md"
                      >
                        {reaction.emoji}
                      </button>
                    ))}
                </div>

                <div className="ml-2 hidden group-hover:flex gap-1">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => onAddReaction(msg.id, emoji)}
                      className="text-lg hover:scale-110 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isMe && (
              <div
                className="avatar-small flex items-center justify-center text-white font-bold ml-2"
                style={{ backgroundColor: msg.user.color || "#3b82f6" }}
              >
                {msg.user.username?.[0]?.toUpperCase() || "?"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
