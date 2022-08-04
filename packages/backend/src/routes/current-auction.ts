import e, { Request, Response } from "express";
import {
  getBidEventsAndMetadata,
  getBidEventsForNoun,
  getCurrentBlockTime,
  getCurrentNounAuction,
  getNounMetadataBase64,
} from "../utils/web3";
import BN from "bignumber.js";
import { client } from "../redis";
import { log } from "../utils";

export const REDIS_CURRENT_AUCTION_KEY = "currentauction";

export async function currentAuction(req: Request, res: Response) {
  try {
    const currentBlockTimestamp = new BN(await getCurrentBlockTime());
    const cached = await client?.exists(REDIS_CURRENT_AUCTION_KEY);

    const fetchAndSaveAuction = async () => {
      console.log("fetch new auction");

      const auction = await getCurrentNounAuction();
      const [bids, metadata] = await Promise.all([
        getBidEventsAndMetadata(auction.nounId),
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
        return res.json({
          ...output,
          blockTimestamp: currentBlockTimestamp.toFixed(),
        });
      } else {
        console.log("returning cached auction");
        return res.json({
          ...cachedAuction,
          blockTimestamp: currentBlockTimestamp.toFixed(),
        });
      }
    }
    const output = await fetchAndSaveAuction();
    res.json({ ...output, blockTimestamp: currentBlockTimestamp.toFixed() });
  } catch (e: any) {
    log(e.message);
    return res.status(500).send({ error: e.message });
  }
}
