import { Request, Response } from "express";
import Note from "../database/Note";
import { log } from "../utils";
import { getHttpProvider } from "../utils/web3";

export async function postNote(req: Request, res: Response) {
  try {
    const web3 = getHttpProvider();
    const { bidId, nounId, note, address, signature } = req.body;

    // verify signature
    const hashArgs = [{ type: "string", value: note }];

    const hash = web3.utils.soliditySha3(...hashArgs);

    const recoveredAddress = web3.utils.toChecksumAddress(
      web3.eth.accounts.recover(hash as string, signature)
    );
    console.log(note, recoveredAddress, address, signature);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).send({ error: "unauthorized" });
    }

    await new Note({
      bidId,
      nounId,
      note,
    }).save();

    return res.json({ success: true });
  } catch (e: any) {
    log(e.message);
    return res.status(400).send({ message: "bad request" });
  }
}
