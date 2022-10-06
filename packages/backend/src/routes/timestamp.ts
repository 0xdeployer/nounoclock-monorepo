import { Request, Response } from "express";
import { getHttpProvider } from "../utils/web3";

export const messageToSign = (ts: number | string) =>
  `NOC: I am proving ownership of this wallet by signing this message.\n\n${ts}`;

export function timestamp(req: Request, res: Response) {
  const timestamp = Date.now();
  return res.json({
    timestamp,
    message: messageToSign(timestamp),
    template: messageToSign("{{timestamp}}"),
  });
}
