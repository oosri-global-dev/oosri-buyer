import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

let socketInstance = null;

export const useSocket = ({ token, enabled = true } = {}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!enabled || !token || typeof window === "undefined") return;

    if (!socketInstance) {
      socketInstance = io(process.env.NEXT_PUBLIC_BASE_URL?.replace("/api/v1", "") || "", {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });
    }

    socketRef.current = socketInstance;

    return () => {};
  }, [token, enabled]);

  return socketRef.current;
};

export const getSocket = () => socketInstance;
