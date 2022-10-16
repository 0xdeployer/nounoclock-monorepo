import mongoose from "mongoose";

const chat = new mongoose.Schema(
  {
    message: String,
    displayName: String,
    address: String,
    avatar: String,
    timestamp: { type: Date, index: 1 },
  },
  { collation: { locale: "en_US", numericOrdering: true } }
);

const Chat = mongoose.model("Chat", chat);

export default Chat;
