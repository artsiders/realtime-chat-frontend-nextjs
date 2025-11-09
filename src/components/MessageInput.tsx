import { useState, useCallback } from "react";

interface MessageInputProps {
  onSend: (content: string) => void;
  onTyping: () => void;
  onStopTyping: () => void;
}

export default function MessageInput({
  onSend,
  onTyping,
  onStopTyping,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
      if (!isTyping && e.target.value.length > 0) {
        setIsTyping(true);
        onTyping();
      }
    },
    [isTyping, onTyping]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
      setIsTyping(false);
      onStopTyping();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-row">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Envoyer un message..."
          className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          aria-label="Envoyer"
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 flex items-center justify-center"
        >
          {/* simple chevron icon via text to avoid new deps */}
          <span style={{ transform: "rotate(45deg)" }}>➤</span>
        </button>
      </div>
    </form>
  );
}
