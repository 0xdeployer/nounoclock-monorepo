import { Server } from "socket.io";
import http from "http";
import Reaction from "../database/Reaction";
import { log } from "../utils";

let io: Server;

let connected = 0;

export const sockets = (server?: http.Server) => {
  if (io) return io;
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    connected++;
    io.emit("watcher", connected);
    socket.on("disconnect", function () {
      connected--;
      io.emit("watcher", connected);
    });
    socket.on("reaction", async ({ nounId, bidId, reactionId }) => {
      socket.broadcast.emit("reaction", { nounId, bidId, reactionId });
      try {
        await Reaction.updateOne(
          { bidId, reactionId, nounId },
          { $inc: { number: 1 } },
          { upsert: true }
        ).exec();
      } catch (e: any) {
        log(e.message);
      }
    });
  });
  return io;
};
