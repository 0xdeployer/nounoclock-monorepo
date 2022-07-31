import { Bid } from "../api";

export function getBidId(bid: Bid) {
  return `${bid.returnValues.nounId}-${bid.returnValues.sender}-${bid.returnValues.value}`.toLowerCase();
}
