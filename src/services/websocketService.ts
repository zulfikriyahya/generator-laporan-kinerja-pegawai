import { io, Socket } from "socket.io-client";
import { getToken } from "./authService";

let socket: Socket | null = null;

export const connectWebSocket = () => {
  const token = getToken();
  if (!token) return null;

  const BASE_URL =
    import.meta.env.PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:3000";

  socket = io(`${BASE_URL}/notifications`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
  });

  socket.on("connected", (data) => {
    console.log("WebSocket connected:", data);
  });

  socket.on("notification", (notification) => {
    window.dispatchEvent(
      new CustomEvent("ws:notification", { detail: notification }),
    );
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });

  return socket;
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
