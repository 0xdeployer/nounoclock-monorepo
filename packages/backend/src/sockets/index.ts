import { Server } from "socket.io";
import http from "http";
import Reaction from "../database/Reaction";
import { log } from "../utils";

let io: Server;

export const sockets = (server?: http.Server) => {
  if (io) return io;
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("reaction", async ({ nounId, bidId, reactionId }) => {
      console.log("REACTION");
      console.log(bidId, reactionId);

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
    console.log("A user connected");
  });
  return io;
};
