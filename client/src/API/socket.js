import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      withCredentials: true,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
