import { log } from "console";
import { Request, Response } from "express";
import { client } from "../redis";
import { getAuctionCreatedEvent } from "../utils/web3";

const ORIGINAL_END_TIME_REDIS_KEY = "ogendtime";
const getKey = (nounId: string) => `${ORIGINAL_END_TIME_REDIS_KEY}-${nounId}`;

export async function getOriginalEndTime(req: Request, res: Response) {
  const { nounId } = req.params;
  const key = getKey(nounId);
  const exists = await client?.exists(key);
  if (exists) {
    const endTime = await client.get(key);
    return res.json({ endTime });
  }

  try {
    const {
      returnValues: { endTime },
    } = (await getAuctionCreatedEvent(nounId))[0];
    await client.set(key, endTime);
    return res.json({ endTime });
  } catch (e: any) {
    log(e.message);
    return res.status(400).send({ error: "bad request" });
  }
}
