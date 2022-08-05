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

const test = () => ({
  address: "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B",
  blockHash:
    "0x77bb624ec1f5e450a4874211ecac1e7af866940d8994cb6912c585e13f77fb16",
  blockNumber: 15246608,
  logIndex: 194,
  removed: false,
  transactionHash:
    "0xadec4d0693d9dc1fde916899e35e5e9fdc275ca0e66b7a51373f9558a60bebfe",
  transactionIndex: 102,
  id: "log_2f5e92c3",
  returnValues: {
    "0": "392",
    "1": "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B",
    "2": "89990000000000000000",
    "3": false,
    nounId: "392",
    sender: "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B",
    value: `${Math.floor(Math.random() * 73064967413679875957) + 1}`,
    extended: false,
  },
  event: "AuctionBid",
  signature:
    "0x1159164c56f277e6fc99c11731bd380e0347deb969b75523398734c252706ea3",
  raw: {
    data: "0x000000000000000000000000696ed7b26f4b019ceec78dc8b9140ad64a6f354b00000000000000000000000000000000000000000000000456159131df7f00000000000000000000000000000000000000000000000000000000000000000000",
    topics: [
      "0x1159164c56f277e6fc99c11731bd380e0347deb969b75523398734c252706ea3",
      "0x0000000000000000000000000000000000000000000000000000000000000188",
    ],
  },
  name: "beautifulnfts.eth",
  displayName: "beautifulnfts.eth",
  avatar: null,
  ethInWallet: "73064967413679875957",
  numberOfNouns: "1",
});
// setInterval(() => {
//   console.log("GFO");
//   const io = sockets();
//   io.emit("bid", test());
// }, 5000);

// setTimeout(() => {
//   const io = sockets();
//   console.log("emit end");
//   io.emit("endtime", "0");
// }, 5000);

// setTimeout(() => {
//   const io = sockets();
//   console.log("hello chelsea");
//   io.emit("auctioncreated");
// }, 10000);

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
