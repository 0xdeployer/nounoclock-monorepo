import BigNumber from "bignumber.js";
import React from "react";
import { useAuctionCountdown } from "../../hooks";
import { useAppStore } from "../../stores";
import { Button } from "../ui/Button";
import { styles } from "./styles";

type Event = {
  startTime: number;
  title: string;
  activeTitle?: string;
  cta?: React.ReactNode;
  top?: string;
};

type Events = Event[];

// Should be 15 minutes in production
const NOC_MIN_BEFORE_AUCTION_END = 5;

export function Calendar() {
  const originalEndTime = useAppStore(
    (state) => state.originalEndTime ?? state.endTime
  );
  const auctionStartTime = useAppStore(
    (state) => state.auction?.auction.startTime
  );
  const { end, pastEndTime } = useAuctionCountdown();
  const timeBuffer = end.minus(originalEndTime ?? "0");

  const events: Events = [
    {
      startTime: new BigNumber(originalEndTime as string)
        .minus(NOC_MIN_BEFORE_AUCTION_END * 60)
        .toNumber(),
      title: "The Daily Noun O'Clock Show",
      cta: (
        <>
          <p>Starts 15 minutes before auction close.</p>Listen on twitter
        </>
      ),
    },
    {
      startTime: end.toNumber(),
      title: "Auction ends",
      top: "-8px",
      cta: (
        <>
          {pastEndTime && (
            <div>
              <p>Let's play FOMO and vote for the next Noun together!</p>
              <Button>Play now</Button>
            </div>
          )}
        </>
      ),
    },
  ];

  const getProgress = (date: number) => {
    const start = new BigNumber(auctionStartTime as string);
    const now = date;
    const totalTime = end.minus(start).toNumber();
    const progress = now - start.toNumber();
    return (progress / totalTime) * 100;
  };

  const start = new BigNumber(auctionStartTime as string);
  const now = Date.now() / 1000;
  const totalTime = end.minus(start).toNumber();
  const progress = now - start.toNumber();
  console.log("AMOUNT DONE", 100 - (progress / totalTime) * 100);

  return (
    <div style={{ marginTop: "20px" }}>
      <div css={styles.calendarWrap}>
        <div css={styles.statusBarWrap}>
          <div
            css={styles.innerStatusBar}
            style={{
              top: `-${100 - getProgress(Date.now() / 1000)}%`,
            }}
          />
        </div>
        {events.map((event) => {
          const top = getProgress(event.startTime);
          return (
            <div
              key={event.title}
              style={{
                position: "absolute",
                left: 0,
                top: event.top ? `calc(${top}% + ${event.top})` : `${top}%`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div css={styles.circle} />{" "}
                <div style={{ transform: "translateY(-4px)" }}>
                  <div style={{ fontWeight: "bold" }}>{event.title}</div>
                  <div> {event.cta}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
