import { Request, Response } from "express";
import Note from "../database/Note";

export async function getNotes(req: Request, res: Response) {
  const { nounId } = req.params;
  if (isNaN(Number(nounId))) {
    return res.status(400).send({ error: "bad request" });
  }

  const notes = await Note.find({ nounId }, "bidId nounId note -_id")
    .lean()
    .exec();

  const output = notes.reduce((a: { [bidId: string]: string }, b: any) => {
    const bidId = b.bidId as string;

    a[bidId] = b.note;

    return a;
  }, {});

  return res.json(output);
}
