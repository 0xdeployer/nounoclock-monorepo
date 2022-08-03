import { Request, Response } from "express";
import Reaction from "../database/Reaction";

export async function getReactions(req: Request, res: Response) {
  const { nounId } = req.params;
  if (isNaN(Number(nounId))) {
    return res.status(400).send({ error: "bad request" });
  }

  const reactions = await Reaction.find(
    { nounId },
    "bidId nounId reactionId number -_id"
  )
    .lean()
    .exec();

  const output = reactions.reduce(
    (a: { [bidId: string]: { [reactionId: string]: number } }, b: any) => {
      const bidId = b.bidId as string;
      const reactionId = b.reactionId as string;
      a[bidId] = a[bidId] ?? {};
      a[bidId][reactionId] = b.number;
      return a;
    },
    {}
  );

  return res.json(output);
}
