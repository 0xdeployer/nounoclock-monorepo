import { Server } from "socket.io";
import http from "http";

let io: Server;

export const sockets = (server: http.Server) => {
  if (io) return io;
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("reaction", ({ bidId, reactionId }) => {
      console.log("REACTION");
      console.log(bidId, reactionId);
      socket.broadcast.emit("reaction", { bidId, reactionId });
    });
    console.log("A user connected");
    setInterval(() => {
      socket.emit("time", Date.now());
    }, 2000);
  });
  return io;
};
