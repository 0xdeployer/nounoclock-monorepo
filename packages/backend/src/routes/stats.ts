import { Request, Response } from "express";
import { client } from "../redis";
import { getCurrentNoun, log } from "../utils";
import fetch from "node-fetch";

const redisStatKey = (nounId: string) => `stats-${nounId}`;

// Gets stats for the current noun.
export async function getStats(req: Request, res: Response) {
  const currentNoun = await getCurrentNoun();
  const key = redisStatKey(currentNoun);
  const cached = await client?.exists(key);
  console.log(cached);
  if (cached) {
    const response = await client?.get(key);
    return res.send(JSON.parse(response as string));
  } else {
    const response = await fetch(
      `https://nouns.express/_/api/nouns/lookalike?tokenId=${currentNoun}`
    ).then((res) => res.json());
    if (response && response.code !== 404) {
      try {
        await client?.set(key, JSON.stringify(response));
      } catch (e: any) {
        log(e.message);
      }
      return res.send(response);
    } else {
      return res.status(404).send({ error: "not found" });
    }
  }
}
