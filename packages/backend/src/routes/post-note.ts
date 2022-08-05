import { Request, Response } from "express";
import Note from "../database/Note";
import { sockets } from "../sockets";
import { log } from "../utils";
import { getHttpProvider } from "../utils/web3";

export async function postNote(req: Request, res: Response) {
  try {
    const web3 = getHttpProvider();
    const { bidId, nounId, note, address, signature } = req.body;
    const msg = `I would like to associate the following note with my bid:\n\n${note}\n\nNoun o Clock Bid ID ${bidId}`;
    const recoveredAddress = web3.utils.toChecksumAddress(
      web3.eth.accounts.recover(msg as string, signature)
    );
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).send({ error: "unauthorized" });
    }

    await new Note({
      bidId,
      nounId,
      note,
    }).save();

    try {
      const io = sockets();
      io.emit("note", { bidId, note });
    } catch (e: any) {
      log(e.message);
    }
    return res.json({ success: true });
  } catch (e: any) {
    log(e.message);
    return res.status(400).send({ message: "bad request" });
  }
}
