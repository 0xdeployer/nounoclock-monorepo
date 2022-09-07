import React, { useCallback, useMemo, useRef, useState } from "react";
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
import { getBidId, mq, useMq } from "../../utils";
import { css, Global } from "@emotion/react";
import { ReactionMenu } from "../Reactions/Menu";

type BidsProps = {
  bids?: GetCurrentAuctionResponse["bids"];
  currentBidValue: string;
  nounContainer?: React.RefObject<HTMLDivElement>;
};

export function Bids({ nounContainer }: BidsProps) {
  // const [height, updateHeight] = useState<number | undefined>();
  const bids = useAppStore((state) => state.bids);
  const [translatePrevBids, updateTranslatePrevBids] = useState(false);
  const [translateCurrentBid, updateTranslateCurrentBid] = useState(false);
  const [initialTransform, updateInitialTransform] = useState(true);
  const { matches } = useMq();

  React.useEffect(() => {
    setTimeout(() => {
      // updateHeight(nounContainer?.current?.offsetHeight);
      updateInitialTransform(true);
    }, 0);
  }, [nounContainer]);

  const isSmallScreen = matches["0"];

  const currentBid = useMemo(() => {
    return bids?.[bids.length - 1];
  }, [bids]);
  // Bids used in UI that are not current
  const [prevBids, prevActiveBidId] = useMemo(() => {
    const prevBids = bids?.slice(0, bids.length - 1);
    const lastBidArr = prevBids?.filter((bid) => !bid?.pending);
    const lastBid = lastBidArr?.[(lastBidArr?.length ?? 0) - 1];
    let bidId = "";
    if (lastBid) {
      bidId = getBidId(
        lastBid.returnValues.nounId,
        lastBid.returnValues.sender,
        lastBid.returnValues.value
      );
    }

    return [bids?.slice(0, bids.length - 1), bidId];
  }, [bids]);
  const previousBidLength = usePrevious(bids?.length ?? 0);
  const prevCurrent = usePrevious<Bid | undefined>(currentBid);

  React.useEffect(() => {
    // The following is used to prevent animation from happening when
    // pending bids turn final
    if (bids?.length === previousBidLength) return;

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
  }, [
    bids,
    previousBidLength,
    initialTransform,
    currentBid,
    prevCurrent,
    isSmallScreen,
  ]);

  const prevBidsRef = useRef<HTMLDivElement>(null);
  const currentBidsRef = useRef<HTMLDivElement>(null);
  const bidsWrapRef = useRef<HTMLDivElement>(null);
  const [trackHeight, updateTrackHeight] = useState<number | undefined>();
  // Hack to trigger re-render on emoji select
  // to readjust previous bid transform value
  const [flip, updateFlip] = useState(false);
  const onEmojiChange = () => {
    setTimeout(() => {
      updateFlip(!flip);
    }, 0);
  };
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
  }, [bids, flip]);

  React.useEffect(() => {
    if (trackHeight && bidsWrapRef.current) {
      setTimeout(() => {
        if (!bidsWrapRef.current) return;
        bidsWrapRef.current.scrollTo(0, trackHeight);
      }, 100);
    }
  }, [trackHeight]);
  const currentBidHeight = currentBidsRef.current?.offsetHeight ?? 150;

  const hasBids = bids && bids.length > 0;
  const [activeReactionBidId, updateActiveReactionBidId] = useState("");
  const onClickReactionMenu = useCallback((bidId: string) => {
    updateActiveReactionBidId(bidId);
  }, []);
  const resetBidId = useCallback(() => {
    updateActiveReactionBidId("");
  }, []);

  return (
    <>
      <ReactionMenu
        onClick={onEmojiChange}
        resetBidId={resetBidId}
        bidId={activeReactionBidId}
      />
      <div onScroll={resetBidId} ref={bidsWrapRef} css={styles.bidsWrap}>
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
                transform: `translateY(-${currentBidHeight}px)`,
              },
              ".prev-list-exit, .prev-list-exit-active, .prev-list-exit-done": {
                transform: `translateY(-${currentBidHeight}px)`,
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
                    transform: initialTransform
                      ? `translateY(-${currentBidHeight}px)`
                      : void 0,
                  }}
                  key={prevBids?.length}
                >
                  {prevBids?.map((bid, i) => {
                    const currentBidId = getBidId(
                      bid.returnValues.nounId,
                      bid.returnValues.sender,
                      bid.returnValues.value
                    );

                    const current =
                      currentBid?.pending && currentBidId === prevActiveBidId;
                    return (
                      <BidItem
                        onClickReactionMenu={onClickReactionMenu}
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
                      onClickReactionMenu={onClickReactionMenu}
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
    </>
  );
}
