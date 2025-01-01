import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : '/'

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Prevents automatic connection on socket creation, allowing manual control
  withCredentials: true,
});
