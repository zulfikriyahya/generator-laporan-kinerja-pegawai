import { io, Socket } from "socket.io-client";
import { getToken } from "./authService";

let socket: Socket | null = null;

export const connectWebSocket = () => {
  const token = getToken();
  if (!token) {
    console.warn("No token available for WebSocket");
    return null;
  }

  const BASE_URL =
    import.meta.env.PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:3000";

  try {
    socket = io(`${BASE_URL}/notifications`, {
      auth: {
        token: token,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.on("connected", (data) => {
      console.log("WebSocket authenticated:", data);
    });

    socket.on("notification", (notification) => {
      window.dispatchEvent(
        new CustomEvent("ws:notification", { detail: notification }),
      );
    });

    socket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.warn("WebSocket connection error:", error.message);
    });

    return socket;
  } catch (error) {
    console.error("Failed to create WebSocket:", error);
    return null;
  }
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToChannel = (channel: string) => {
  if (socket) {
    socket.emit("subscribe", { channel });
  }
};

export const unsubscribeFromChannel = (channel: string) => {
  if (socket) {
    socket.emit("unsubscribe", { channel });
  }
};

export const getSocket = () => socket;
