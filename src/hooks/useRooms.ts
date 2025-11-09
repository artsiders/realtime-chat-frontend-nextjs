import { useState, useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/authStore";

interface Room {
  id: number;
  name: string;
  isGeneral: boolean;
}

interface JoinGeneralResponse {
  roomId: number;
  messages: unknown[];
}

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
  const socket = getSocket();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    // Rejoindre le salon général
    socket.emit(
      "joinGeneral",
      { userId: user.id },
      (response: JoinGeneralResponse) => {
        setCurrentRoomId(response.roomId);
        socket.emit("getRooms", { userId: user.id }, (roomsData: Room[]) => {
          setRooms(roomsData);
        });
      }
    );

    socket.on("newRoom", (room: Room) => {
      setRooms((prev) => [...prev, room]);
    });

    return () => {
      socket.off("newRoom");
    };
  }, [user, socket]);

  const createRoom = (
    name: string,
    memberIds: number[],
    giveHistoryAccess: boolean
  ) => {
    if (!user) return;
    socket.emit(
      "createRoom",
      {
        name,
        creatorId: user.id,
        memberIds,
        giveHistoryAccess,
      },
      (room: Room) => {
        setRooms((prev) => [...prev, room]);
      }
    );
  };

  return { rooms, currentRoomId, setCurrentRoomId, createRoom };
};
