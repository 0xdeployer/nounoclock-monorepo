import React, { useMemo, useRef, useState } from "react";
import { Bid, GetCurrentAuctionResponse } from "../../api";
import { styles } from "./styles";
import { useAppStore } from "../../stores";
import { BidItem } from "./BidItem";
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";
import "./styles.css";
import { usePrevious } from "../../hooks";

type BidsProps = {
  bids?: GetCurrentAuctionResponse["bids"];
  currentBidValue: string;
  nounContainer?: React.RefObject<HTMLDivElement>;
};

export function Bids({ nounContainer }: BidsProps) {
  const [height, updateHeight] = useState<number | undefined>();
  const bids = useAppStore((state) => state.bids);
  const [translatePrevBids, updateTranslatePrevBids] = useState(false);
  const [translateCurrentBid, updateTranslateCurrentBid] = useState(false);
  const [initialTransform, updateInitialTransform] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      updateHeight(nounContainer?.current?.offsetHeight);
      updateInitialTransform(true);
    }, 0);
  }, [nounContainer]);

  const currentBid = useMemo(() => {
    return bids?.[bids.length - 1];
  }, [bids]);
  const prevBids = useMemo(() => {
    return bids?.slice(0, bids.length - 1);
  }, [bids]);
  console.log(prevBids);
  const prevCurrent = usePrevious<Bid | undefined>(currentBid);
  React.useEffect(() => {
    if (
      bids &&
      currentBid &&
      prevCurrent &&
      `${prevCurrent.returnValues.sender}-${prevCurrent.returnValues.value}` !==
        `${currentBid.returnValues.sender}-${currentBid.returnValues.value}`
    ) {
      if (initialTransform) {
        updateInitialTransform(false);
      }
      updateTranslateCurrentBid(true);
      if (bids.length > 1) {
        updateTranslatePrevBids(true);
      }
      setTimeout(() => {
        updateTranslatePrevBids(false);
        updateTranslateCurrentBid(false);
      }, 500);
    }
  }, [bids, initialTransform, currentBid, prevCurrent]);
  if (!bids) return null;
  return (
    <div
      css={styles.bidsWrap}
      style={{
        height: height ? `${height}px` : "auto",
        position: "relative",
        opacity: height ? 1 : 0,
        willChange: "transform",
      }}
    >
      <CSSTransition
        in={translatePrevBids}
        timeout={300}
        classNames="prev-list"
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            transform: initialTransform ? "translateY(-150px)" : void 0,
          }}
          key={prevBids?.length}
        >
          {prevBids?.map((bid, i) => {
            return (
              <BidItem
                current={i === bids.length - 1}
                key={`${bid.returnValues.value}-${prevBids?.length}`}
                style={{
                  opacity: 1 * ((i + 1) / bids.length),
                  // transform: `scale(${1 - (bids.length - (i + 1)) * 0.025})`,
                }}
                bid={bid}
              ></BidItem>
            );
          })}
        </div>
      </CSSTransition>
      {currentBid && (
        <CSSTransition timeout={400} in={translateCurrentBid} classNames="item">
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
            key={prevBids?.length}
          >
            <BidItem
              current
              key={currentBid.returnValues.value}
              style={{
                background: "rgba(225, 169,0,0.07)",
              }}
              bid={currentBid}
            ></BidItem>
          </div>
        </CSSTransition>
      )}
    </div>
  );
}
