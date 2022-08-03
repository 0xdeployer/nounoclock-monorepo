import React, { useCallback, useMemo, useState } from "react";
import { TextField } from "../ui";
import { Button } from "../ui/Button";
import { styles } from "./styles";
import { useAccount } from "wagmi";
import { useAppStore } from "../../stores";
import BigNumber from "bignumber.js";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

const computeMinimumNextBid = (
  currentBid: BigNumber,
  minBidIncPercentage: BigNumber | undefined
): BigNumber => {
  if (!minBidIncPercentage) {
    return new BigNumber(0);
  }
  return currentBid
    .times(minBidIncPercentage.div(100).plus(1))
    .decimalPlaces(0, BigNumber.ROUND_UP);
};

export function BidForm() {
  const { isConnected } = useAccount();
  const bids = useAppStore((state) => state.bids ?? []);
  const [bidValue, updateBidValue] = useState("");
  const [note, updateNote] = useState("");

  const nextBid = useMemo(() => {
    const output = bids
      .filter((bid) => !bid.pending)
      .sort((a, b) =>
        new BigNumber(a.returnValues.value).lt(
          new BigNumber(b.returnValues.value)
        )
          ? -1
          : 1
      );

    return computeMinimumNextBid(
      new BigNumber(output[output.length - 1]?.returnValues.value ?? 0),
      new BigNumber(2)
    )
      .div(10 ** 18)
      .toFixed(2);
  }, [bids]);

  const onBidChange = useCallback((evt: any) => {
    updateBidValue(evt.currentTarget?.value);
  }, []);

  const onNoteChange = useCallback((evt: any) => {
    updateNote(evt.target.value);
  }, []);

  let value = "0";

  try {
    value = new BigNumber(bidValue).times(10 ** 18).toFixed();
  } catch {}

  const { config } = usePrepareContractWrite({
    addressOrName: process.env.REACT_APP_NOUN_AUCTION_HOUSE_PROXY as string,
    contractInterface: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "nounId",
            type: "uint256",
          },
        ],
        name: "createBid",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "createBid",
    enabled: isConnected,
    overrides: {
      // @ts-ignore
      value,
    },
  });
  const { write } = useContractWrite(config);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("hi");
        try {
          write?.();
        } catch (e) {
          console.error(e);
        }
      }}
      css={styles.wrap}
    >
      <TextField
        onChange={onBidChange}
        value={bidValue}
        placeholder={`Ξ ${nextBid === "0.00" ? "0.01" : nextBid} or more`}
      />
      <TextField
        value={note}
        onChange={onNoteChange}
        placeholder="Add a note"
      />
      <Button disabled={!isConnected}>Place bid</Button>
    </form>
  );
}
