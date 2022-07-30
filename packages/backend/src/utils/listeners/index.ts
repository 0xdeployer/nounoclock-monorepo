import { ContractNames, getContract } from "../web3";
import Web3 from "web3";
import { client } from "../../redis";
import { sockets } from "../../sockets";
import { AuctionBidEvent } from "../../types";

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

  nounAuctionHouseProxy.events.AuctionBid(async (err, res: AuctionBidEvent) => {
    const io = sockets();
    const bidId =
      `${res.returnValues.nounId}-${res.returnValues.sender}-${res.returnValues.value}`.toLowerCase();
    // io.emit('bid', )
  });
}
