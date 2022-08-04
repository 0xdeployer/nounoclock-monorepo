import React from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

export function SettleButton() {
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.REACT_APP_NOUN_AUCTION_HOUSE_PROXY as string,
    contractInterface: [
      {
        inputs: [],
        name: "settleCurrentAndCreateNewAuction",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    onError(error) {
      console.log("Error", error);
    },
    functionName: "settleCurrentAndCreateNewAuction",
  });
  const { write } = useContractWrite({
    ...config,
    onError(error) {
      console.log("Error", error);
    },
  });
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        write?.();
      }}
    >
      Settle manually
    </a>
  );
}
