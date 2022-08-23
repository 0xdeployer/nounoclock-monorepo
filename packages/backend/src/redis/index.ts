import { createClient } from "redis";
import { log } from "../utils";

export const client = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: process.env.NODE_ENV === "development" ? false : true,
    rejectUnauthorized: false,
  },
});

client.connect();

client.on("connected", () => {
  console.log("CONNECTED");
});

client.on("error", function (err) {
  log("Redis error:", err);
});
