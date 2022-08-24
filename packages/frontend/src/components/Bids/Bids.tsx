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
// import "./styles.css";
import { usePrevious } from "../../hooks";
import emptySvg from "../../empty.svg";
import { mq, useMq } from "../../utils";
import { css, Global } from "@emotion/react";

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
  const { matches } = useMq();

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
  const prevCurrent = usePrevious<Bid | undefined>(currentBid);
  React.useEffect(() => {
    if (bids && bids.length) {
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
    // Adding matches to trigger this effect when the breakpoint changes.
  }, [bids, initialTransform, currentBid, prevCurrent, matches["0"]]);

  const prevBidsRef = useRef<HTMLDivElement>(null);
  const currentBidsRef = useRef<HTMLDivElement>(null);
  const bidsWrapRef = useRef<HTMLDivElement>(null);
  const [trackHeight, updateTrackHeight] = useState<number | undefined>();
  React.useLayoutEffect(() => {
    const cb = () => {
      let height = 0;
      if (prevBidsRef.current) {
        height += prevBidsRef.current.offsetHeight;
      }
      if (currentBidsRef.current) {
        height += currentBidsRef.current.offsetHeight;
      }
      updateTrackHeight(height);
    };
    window.addEventListener("resize", cb);
    setTimeout(() => {
      cb();
    }, 10);

    return () => {
      window.removeEventListener("resize", cb);
    };
  }, [bids]);

  React.useEffect(() => {
    if (trackHeight && bidsWrapRef.current) {
      setTimeout(() => {
        if (!bidsWrapRef.current) return;
        bidsWrapRef.current.scrollTo(0, trackHeight);
      }, 100);
    }
  }, [trackHeight]);
  const hasBids = bids && bids.length > 0;
  return (
    <div ref={bidsWrapRef} css={styles.bidsWrap}>
      <Global
        styles={css(
          mq({
            ".item-enter": {
              opacity: "0 !important",
              transform: "translateX(100%) !important",
            },
            ".item-enter-active, .item-enter-done": {
              opacity: "1 !important",
              transform: "translateX(0) !important",
              transition: "all 300ms ease-out",
              transitionDelay: "100ms",
            },
            ".item-exit, .item-exit-active, .item-exit-done": {
              opacity: "1 !important",
              transform: "translateX(0) !important",
            },
            ".prev-list-enter-active, .prev-list-enter-done": {
              transition: "transform 300ms ease-out",
              transform: ["translateY(-150px)", "translateY(-150px)"],
            },
            ".prev-list-exit, .prev-list-exit-active, .prev-list-exit-done": {
              transform: ["translateY(-150px)", "translateY(-150px)"],
            },
          })
        )}
      />
      <div css={styles.nogglesWrap}>
        <img src={emptySvg} />
        {!hasBids && <span>No bids yet</span>}
      </div>
      <div
        css={styles.track}
        style={{
          height: trackHeight ? `${trackHeight}px` : "auto",
          overflow: translatePrevBids ? "hidden" : void 0,
        }}
      >
        {hasBids && (
          <>
            <CSSTransition
              in={translatePrevBids}
              timeout={300}
              classNames="prev-list"
            >
              <div
                ref={prevBidsRef}
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  transform: initialTransform ? "translateY(-150px)" : void 0,
                }}
                key={prevBids?.length}
              >
                {prevBids?.map((bid, i) => {
                  const current =
                    currentBid?.pending && i === prevBids.length - 1;
                  return (
                    <BidItem
                      current={current}
                      key={`${bid.returnValues.value}-${prevBids?.length}`}
                      bid={bid}
                    ></BidItem>
                  );
                })}
              </div>
            </CSSTransition>

            {currentBid && (
              <CSSTransition
                timeout={400}
                in={translateCurrentBid}
                classNames="item"
              >
                <div
                  ref={currentBidsRef}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    transform: "translateX(100%)",
                  }}
                  key={prevBids?.length}
                >
                  <BidItem
                    current={!currentBid.pending}
                    key={currentBid.returnValues.value}
                    bid={currentBid}
                  ></BidItem>
                </div>
              </CSSTransition>
            )}
          </>
        )}
      </div>
    </div>
  );
}
