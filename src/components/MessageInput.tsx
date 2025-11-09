import { useState, useCallback } from "react";
import { FiSend } from "react-icons/fi";

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
          className="flex-1 px-4 py-3 border border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-colors placeholder-gray-400"
        />

        <button
          type="submit"
          aria-label="Envoyer"
          className="bg-blue-500 text-white min-w-[56px] px-6 py-3 rounded-full
          hover:bg-blue-600 transition font-medium flex items-center justify-center
          disabled:opacity-60 disabled:pointer-events-none h-[48px]"
          disabled={!message.trim()}
          style={{ height: "48px" }}
        >
          <FiSend className="text-xl mr-2" />
          <span className="hidden md:inline">Envoyer</span>
        </button>
      </div>
    </form>
  );
}
