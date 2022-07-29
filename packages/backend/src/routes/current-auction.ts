import e, { Request, Response } from "express";
import {
  getBidEventsForNoun,
  getCurrentBlockTime,
  getCurrentNounAuction,
  getNounMetadataBase64,
} from "../utils/web3";
import BN from "bignumber.js";
import { client } from "../redis";
import { log } from "../utils";

const REDIS_CURRENT_AUCTION_KEY = "currentauction";

export async function currentAuction(req: Request, res: Response) {
  const currentBlockTimestamp = new BN(await getCurrentBlockTime());
  const cached = await client?.exists(REDIS_CURRENT_AUCTION_KEY);

  const fetchAndSaveAuction = async () => {
    const auction = await getCurrentNounAuction();
    const [bids, metadata] = await Promise.all([
      getBidEventsForNoun(auction.nounId),
      getNounMetadataBase64(auction.nounId),
    ]);
    const output = { auction, bids, metadata };
    try {
      await client.set(REDIS_CURRENT_AUCTION_KEY, JSON.stringify(output));
    } catch (e: any) {
      log(e.message);
    }
    return output;
  };

  if (cached) {
    const cachedAuction = JSON.parse(
      (await client.get(REDIS_CURRENT_AUCTION_KEY)) as string
    );
    if (new BN(cachedAuction.auction.endTime).lte(currentBlockTimestamp)) {
      // clear cache and add new auction
      const output = await fetchAndSaveAuction();
      return res.json(output);
    } else {
      return res.json(cachedAuction);
    }
  }
  const output = await fetchAndSaveAuction();
  res.json(output);
}
