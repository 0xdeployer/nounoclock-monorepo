import { Server } from "socket.io";
import http from "http";
import Reaction from "../database/Reaction";
import { log } from "../utils";
import { validate } from "../utils/validate";
import { getDisplayNameInfo } from "../utils/web3";

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
    socket.on(
      "chat",
      async (params: {
        timestamp: number;
        address: string;
        sig: string;
        message: string;
      }) => {
        try {
          const { message, ...rest } = params;
          if (message.length > 500) {
            return;
          }
          const valid = await validate(rest);
          if (valid) {
            const { displayName, avatar } = await getDisplayNameInfo(
              params.address
            );
            io.emit("chat-message", {
              message,
              displayName,
              address: params?.address?.toLowerCase(),
              avatar,
              timestamp: Date.now(),
            });
          } else {
            socket.emit("chat-not-valid");
          }
        } catch (e) {
          console.log(e);
        }
      }
    );
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
