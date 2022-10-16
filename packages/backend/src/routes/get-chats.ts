import { Request, Response } from "express";
import Chat from "../database/Chat";

export async function getChats(req: Request, res: Response) {
  const chats = await Chat.find({}).limit(100).sort("timestamp");
  return res.json({ chats });
}
