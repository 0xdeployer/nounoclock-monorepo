import Web3 from "web3";
import NounsAuctionHouseAbi from "../abi/NounsAuctionHouse.json";
import NounTokenAbi from "../abi/NounToken.json";

enum ContractNames {
  NounsAuctionHouse = "NounsAuctionHouse",
  NounToken = "NounToken",
}

const contractInfo: { [key in ContractNames]: any } = {
  NounsAuctionHouse: [
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

export function getContract(name: ContractNames) {
  const web3 = getHttpProvider();
  const [abi, address] = contractInfo[name];
  return new web3.eth.Contract(abi, address);
}

export async function getCurrentNounAuction() {
  const contract = getContract(ContractNames.NounsAuctionHouse);
  const auction = await contract.methods.auction().call();
  console.log(auction);
  return auction;
}

export async function getCurrentBlockTime() {
  const web3 = getHttpProvider();
  const block = await web3.eth.getBlock("latest");
  return block.timestamp;
}

export async function getBidEventsForNoun(nounId: string) {
  const contract = getContract(ContractNames.NounsAuctionHouse);
  return contract.getPastEvents("AuctionBid", {
    filter: {
      nounId,
    },
    fromBlock: "earliest",
    toBlock: "latest",
  });
}

export async function getNounMetadataBase64(nounId: string) {
  const contract = getContract(ContractNames.NounToken);
  return contract.methods.dataURI(nounId).call();
}
