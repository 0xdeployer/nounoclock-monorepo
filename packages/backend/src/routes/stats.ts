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
      `https://7tedfll1w4.execute-api.us-east-2.amazonaws.com/Prod/rarity-stats`
    ).then((res) => res.json());
    const stats = response.noun_stats[currentNoun];
    if (stats) {
      try {
        await client?.set(key, JSON.stringify(stats));
      } catch (e: any) {
        log(e.message);
      }
      return res.send(stats);
    } else {
      return res.status(404).send({ error: "not found" });
    }
  }
}

/*
{
    "background_freq_count": 194,
    "body_freq_count": 13,
    "accessory_freq_count": 2,
    "head_freq_count": 2,
    "glasses_freq_count": 21,
    "noun_id": 375,
    "background": 0,
    "body": 9,
    "accessory": 104,
    "glasses": 18,
    "head": 55,
    "is_first_background": false,
    "is_first_body": false,
    "is_first_accessory": false,
    "is_first_head": false,
    "is_first_glasses": false
}
*/
