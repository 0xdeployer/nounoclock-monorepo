import React from "react";
import { TextField } from "../ui";
import { Button } from "../ui/Button";
import { styles } from "./styles";
import { useAccount } from "wagmi";

// const minBidEth = (minBid: BigNumber): string => {
//   if (minBid.isZero()) {
//     return '0.01';
//   }

//   const eth = utils.formatEther(EthersBN.from(minBid.toString()));
//   return new BigNumber(eth).toFixed(2, BigNumber.ROUND_CEIL);
// };

// const computeMinimumNextBid = (
//   currentBid: BigNumber,
//   minBidIncPercentage: BigNumber | undefined,
// ): BigNumber => {
//   if (!minBidIncPercentage) {
//     return new BigNumber(0);
//   }
//   return currentBid
//     .times(minBidIncPercentage.div(100).plus(1))
//     .decimalPlaces(0, BigNumber.ROUND_UP);
// };

export function BidForm() {
  const { isConnected } = useAccount();

  return (
    <div css={styles.wrap}>
      <TextField placeholder="Ξ" />
      <TextField placeholder="Add a note" />
      <Button disabled={!isConnected}>Place bid</Button>
    </div>
  );
}
