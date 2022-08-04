import Web3 from "web3";
import { HttpProvider, WebsocketProvider } from "web3-core/types";
import NounsAuctionHouseAbi from "../abi/NounsAuctionHouse.json";
import NounTokenAbi from "../abi/NounToken.json";
import { AuctionBidEvent } from "../types";
import fetch from "node-fetch";
import { log } from "./log";

export enum ContractNames {
  NounsAuctionHouseProxy = "NounsAuctionHouseProxy",
  NounToken = "NounToken",
}

const contractInfo: { [key in ContractNames]: any } = {
  NounsAuctionHouseProxy: [
    NounsAuctionHouseAbi,
    process.env.NOUN_AUCTION_HOUSE_PROXY,
  ],
  NounToken: [NounTokenAbi, process.env.NOUN_TOKEN],
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

export async function getNounMetadataBase64(nounId: string) {
  const contract = getContract(ContractNames.NounToken);
  return contract.methods.dataURI(nounId).call({ gas: "9999999999" });
}

export async function getEnsInfo(address: string) {
  return fetch(`https://api.ensideas.com/ens/resolve/${address}`).then((res) =>
    res.json()
  );
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
