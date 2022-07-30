import React, { useState } from "react";
import { Bid, GetCurrentAuctionResponse } from "../../api";
import { Header } from "../ui/Header";
import { styles } from "./styles";
import BN from "bignumber.js";

type BidsProps = {
  bids?: GetCurrentAuctionResponse["bids"];
  currentBidValue: string;
  nounContainer?: React.RefObject<HTMLDivElement>;
};

type BidItemProps = {
  style?: React.CSSProperties;
  bid: Bid;
};

function BidItem({ bid, style }: BidItemProps) {
  return (
    <div css={styles.bidItem} style={style}>
      <div css={styles.bidItemInner}>
        <Header>
          <>
            {"Ξ "}
            {new BN(bid.returnValues.value).div(10 ** 18).toFixed(3)}
          </>
        </Header>
        <div>
          <div>{bid.returnValues.sender}</div>
        </div>
      </div>
    </div>
  );
}

export function Bids({ bids, currentBidValue, nounContainer }: BidsProps) {
  const [height, updateHeight] = useState<number | undefined>();

  React.useEffect(() => {
    updateHeight(nounContainer?.current?.offsetHeight);
  }, [nounContainer]);
  if (!bids) return null;
  return (
    <div
      style={{
        height: height ? `${height}px` : "auto",
        position: "relative",
      }}
    >
      <div css={styles.bidsWrap}>
        {bids.map((bid, i) => {
          return (
            <BidItem
              key={bid.returnValues.value}
              style={{
                opacity: 1 * ((i + 1) / bids.length),
                transform: `scale(${1 - (bids.length - (i + 1)) * 0.025})`,

                background:
                  currentBidValue === bid.returnValues.value ? "gold" : "none",
              }}
              bid={bid}
            ></BidItem>
          );
        })}
      </div>
    </div>
  );
}
