import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import ProfileModal from "./ProfileModal";

interface Room {
  id: number;
  name: string;
  isGeneral: boolean;
}

interface RoomSidebarProps {
  rooms: Room[];
  currentRoomId: number | null;
  onRoomSelect: (roomId: number) => void;
  onCreateRoom: (
    name: string,
    memberIds: number[],
    giveHistoryAccess: boolean
  ) => void;
  onLogout: () => void;
  username: string;
  color: string;
}

export default function RoomSidebar({
  rooms,
  currentRoomId,
  onRoomSelect,
  onCreateRoom,
  onLogout,
  username,
  color,
}: RoomSidebarProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Chat App</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
            >
              + Créer un salon
            </button>
          </div>
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onRoomSelect(room.id)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                currentRoomId === room.id ? "bg-gray-700" : ""
              }`}
            >
              # {room.name}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
              style={{ backgroundColor: color }}
            >
              {username[0].toUpperCase()}
            </div>
            <span className="flex-1 truncate">{username}</span>
          </div>
          <button
            onClick={() => setShowProfileModal(true)}
            className="w-full bg-gray-700 py-2 rounded hover:bg-gray-600 mb-2"
          >
            Profil
          </button>
          <button
            onClick={onLogout}
            className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {showCreateModal && (
        <CreateRoomModal
          onClose={() => setShowCreateModal(false)}
          onCreate={onCreateRoom}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          onClose={() => setShowProfileModal(false)}
          currentUsername={username}
          currentColor={color}
        />
      )}
    </>
  );
}
