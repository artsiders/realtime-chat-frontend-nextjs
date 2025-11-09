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
      <div className="w-72 sidebar-card flex flex-col">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Chat App</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
            >
              + Créer un salon
            </button>
          </div>
          <div className="space-y-1 px-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onRoomSelect(room.id)}
                className={`w-full text-left px-4 py-3 rounded-md hover:bg-gray-100 flex items-center gap-2 ${
                  currentRoomId === room.id
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : ""
                }`}
              >
                <span className="text-sm text-gray-700"># {room.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
              style={{ backgroundColor: color }}
            >
              {username[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium truncate">{username}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex-1 bg-gray-100 py-2 rounded hover:bg-gray-200"
            >
              Profil
            </button>
            <button
              onClick={onLogout}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Déco
            </button>
          </div>
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
