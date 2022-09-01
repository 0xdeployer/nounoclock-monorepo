import {
  ContractNames,
  getBidMetadata,
  getContract,
  getCurrentNounAuction,
} from "../web3";
import Web3 from "web3";
import { client } from "../../redis";
import { sockets } from "../../sockets";
import { AuctionBidEvent } from "../../types";
import { REDIS_CURRENT_AUCTION_KEY } from "../../routes/current-auction";
import Reaction from "../../database/Reaction";
import { log } from "../log";
import Note from "../../database/Note";

let options = {
  clientConfig: {
    keepalive: true,
    keepaliveInterval: 60000,
  },
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 25,
    onTimeout: false,
  },
};

const provider = new Web3.providers.WebsocketProvider(
  process.env.ETH_WS_URI as string,
  options
);

const web3 = new Web3(provider);

const flushAll = async () => {
  await client.flushAll();
};

// Flush all data from cash on connect, reconnect, and error
// Endpoints will read directly from chain to get fresh data
// and then save to cache.
provider.on("error", flushAll);
provider.on("connect", async () => {
  await flushAll();
  addWeb3Listeners();
});
provider.on("reconnect", flushAll);

export function addWeb3Listeners() {
  const nounAuctionHouseProxy = getContract(
    ContractNames.NounsAuctionHouseProxy,
    web3
  );

  nounAuctionHouseProxy.events.AuctionCreated(async () => {
    console.log("Auction created");
    const io = sockets();
    io.emit("auctioncreated");
    try {
      await Promise.all([Reaction.remove({}).exec(), Note.remove({}).exec()]);
    } catch (e: any) {
      log(e.message);
    }
  });

  nounAuctionHouseProxy.events.AuctionBid(
    async (err: any, res: AuctionBidEvent) => {
      const io = sockets();
      const bidId =
        `${res.returnValues.nounId}-${res.returnValues.sender}-${res.returnValues.value}`.toLowerCase();
      const fullBid = await getBidMetadata(res);
      client.del(REDIS_CURRENT_AUCTION_KEY);
      io.emit("bid", fullBid);
      if (fullBid.returnValues.extended) {
        const currentAuction = await getCurrentNounAuction();
        io.emit("endtime", currentAuction.endTime);
      }
    }
  );
}
