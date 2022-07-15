import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export default function Videochat() {
  const { user } = useMoralis();

  const [room, setRoom] = useState();

  useEffect(() => {
    if (user.get("room")) {
      setRoom(JSON.parse(user.get("room")));
    }
  }, [user]);

  return (
    <div className="w-full items-center justify-center">
      {JSON.stringify(room)}

      <iframe
        className="h-screen w-full"
        src={room.roomUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
      ></iframe>
    </div>
  );
}
