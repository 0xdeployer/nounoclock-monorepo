import Web3 from "web3";
import { HttpProvider, WebsocketProvider } from "web3-core/types";
import NounsAuctionHouseAbi from "../abi/NounsAuctionHouse.json";
import NounTokenAbi from "../abi/NounToken.json";
import NounsDescriptorV2Abi from "../abi/NounsDescriptorV2.json";
import { AuctionBidEvent } from "../types";
import fetch from "node-fetch";
import { log } from "./log";
import { client } from "../redis";
import { getNnsNameFromAddress } from "../routes/get-nns";
import { truncateAddress } from "./listeners";

export enum ContractNames {
  NounsAuctionHouseProxy = "NounsAuctionHouseProxy",
  NounToken = "NounToken",
  NounsDescriptorV2 = "NounsDescriptorV2",
}

const contractInfo: { [key in ContractNames]: any } = {
  NounsAuctionHouseProxy: [
    NounsAuctionHouseAbi,
    process.env.NOUN_AUCTION_HOUSE_PROXY,
  ],
  NounToken: [NounTokenAbi, process.env.NOUN_TOKEN],
  NounsDescriptorV2: [NounsDescriptorV2Abi, process.env.NOUNS_DESCRIPTOR_V2],
};

export function getHttpProvider() {
  return new Web3(
    new Web3.providers.HttpProvider(process.env.ETH_HTTP_URI as string)
  );
}

export function getContract(name: ContractNames, _web3?: Web3) {
  const web3 = _web3 ?? getHttpProvider();
  const [abi, address] = contractInfo[name];
  return new web3.eth.Contract(abi, address);
}

export async function getCurrentNounAuction() {
  const contract = getContract(ContractNames.NounsAuctionHouseProxy);
  const auction = await contract.methods.auction().call();
  return auction;
}

export async function getCurrentBlockTime() {
  const web3 = getHttpProvider();
  const block = await web3.eth.getBlock("latest");
  return block.timestamp;
}

export async function getBidEventsForNoun(nounId: string) {
  const contract = getContract(ContractNames.NounsAuctionHouseProxy);
  return contract.getPastEvents("AuctionBid", {
    filter: {
      nounId,
    },
    fromBlock: "earliest",
    toBlock: "latest",
  });
}

export async function getAuctionCreatedEvent(nounId: string) {
  const contract = getContract(ContractNames.NounsAuctionHouseProxy);
  return contract.getPastEvents("AuctionCreated", {
    filter: {
      nounId,
    },
    fromBlock: "earliest",
    toBlock: "latest",
  });
}

export async function getBidEventsAndMetadata(nounId: string) {
  const bidEvents = await getBidEventsForNoun(nounId);
  return Promise.all(
    bidEvents.map((bid) => {
      return getBidMetadata(bid as unknown as AuctionBidEvent);
    })
  );
}

// get ENS name, ENS avatar (if applicable)
export async function getBidMetadata(bid: AuctionBidEvent) {
  const {
    returnValues: { sender },
  } = bid;

  let ensInfo = {
    address: sender,
    name: null,
    displayName: null,
    avatar: null,
  };
  let ethInWallet = "0";
  let numberOfNouns = "0";

  const getEns = async () => {
    try {
      ensInfo = await getEnsInfo(sender);
    } catch (e: any) {
      log(e.message);
    }
  };

  const getEth = async () => {
    const web3 = getHttpProvider();
    try {
      ethInWallet = await web3.eth.getBalance(sender);
    } catch (e: any) {
      log(e.message);
    }
  };

  const getNouns = async () => {
    const web3 = getHttpProvider();
    try {
      const contract = getContract(ContractNames.NounToken);
      numberOfNouns = await contract.methods.balanceOf(sender).call();
    } catch (e: any) {
      log(e.message);
    }
  };

  await Promise.all([getEns(), getEth(), getNouns()]);
  return {
    ...bid,
    ...ensInfo,
    ethInWallet,
    numberOfNouns,
  };
}

export async function getNounBackground(nounId: string) {
  const contract = getContract(ContractNames.NounToken);
  const seed = await contract.methods.seeds(nounId).call();
  return seed.background;
}

export async function getNounMetadataBase64(nounId: string) {
  const contract = getContract(ContractNames.NounToken);
  return contract.methods.dataURI(nounId).call({ gas: "9999999999" });
}

export async function getEnsInfo(address: string) {
  return fetch(`https://api.ensideas.com/ens/resolve/${address}`).then(
    (res: any) => res.json()
  );
}

export async function getDisplayNameInfo(address: string) {
  const key = address.toLowerCase();
  const cached = await client?.exists(address.toLowerCase());
  if (cached) {
    const out = await client.get(key);
    return JSON.parse(out as string);
  } else {
    // check nns
    let displayName = await getNnsNameFromAddress(address);
    let avatar = "";
    if (!displayName) {
      try {
        const info = await getEnsInfo(address);
        if (info.displayName) {
          displayName = info.displayName;
          avatar = info.avatar;
        }
      } catch {}
    }
    if (!displayName) {
      displayName = truncateAddress(address);
    }
    const out = { displayName, timestamp: Date.now(), avatar };
    await client.set(key, JSON.stringify(out));
    return out;
  }
}

// export async getPendingTransactions() {

// }

// export async function reverseENSLookup(address: string) {
//   const web3 = getHttpProvider();
//   let lookup = address.toLowerCase().substr(2) + ".addr.reverse";
//   let ResolverContract = await web3.eth.ens.getResolver(lookup);
//   let nh = namehash.hash(lookup);
//   try {
//     let name = await ResolverContract.methods.name(nh).call();
//     if (name && name.length) {
//       const verifiedAddress = await web3.eth.ens.getAddress(name);
//       if (
//         verifiedAddress &&
//         verifiedAddress.toLowerCase() === address.toLowerCase()
//       ) {
//         return name;
//       }
//     }
//   } catch (e) {}
// }
