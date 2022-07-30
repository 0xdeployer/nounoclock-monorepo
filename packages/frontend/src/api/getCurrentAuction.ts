import { getUrl } from "../utils";
import {
  GetCurrentAuctionResponse,
  GetCurrentAuctionResponseRaw,
} from "./types";

export async function getCurrentAuction(): Promise<GetCurrentAuctionResponse> {
  const auction: GetCurrentAuctionResponseRaw = await fetch(
    getUrl("/current-auction")
  ).then((res) => res.json());

  const decodedMetadata: GetCurrentAuctionResponse["metadata"] = JSON.parse(
    atob(auction.metadata.split("base64,")[1])
  );
  const output = {
    ...auction,
    metadata: decodedMetadata,
  };
  return output;
}
