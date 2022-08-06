import BigNumber from "bignumber.js";
import { intervalToDuration } from "date-fns";
import React, { useMemo, useRef } from "react";
import { useAuctionCountdown, useNocStartTime } from "../../hooks";
import { useAppStore } from "../../stores";
import { Button } from "../ui/Button";
import { styles } from "./styles";
import choiceImg from "./choice.svg";
import { NocCountDown } from "../NocCountdown";

type Event = {
  startTime: number;
  activeTitle?: string;
  content: React.ReactNode;
  top?: string;
};

type Events = Event[];

export function Calendar() {
  const auctionStartTime = useAppStore(
    (state) => state.auction?.auction.startTime
  );
  const { end, pastEndTime } = useAuctionCountdown();

  const getProgress = (date: number) => {
    const start = new BigNumber(auctionStartTime as string);
    const now = date;
    const totalTime = end.minus(start).toNumber();
    const progress = now - start.toNumber();
    return {
      progress: (progress / totalTime) * 100,
      totalTime,
    };
  };

  const { progress } = getProgress(Date.now() / 1000);

  const { nocActive, nocStartTime, timeLeftToNoc } = useNocStartTime();

  const events: Events = [
    {
      startTime: nocStartTime,
      content: <NocCountDown />,
      top: "-10px",
    },
    {
      startTime: end.toNumber(),
      top: "-8px",
      content: (
        <>
          <p css={styles.title}>Auction ends</p>
          {pastEndTime && (
            <div>
              <p>Let's play FOMO and vote for the next Noun together!</p>
              <a
                href="https://fomonouns.wtf/"
                target="_blank"
                css={styles.playBtn}
                rel="noreferrer"
              >
                <img src={choiceImg} />
                Play now
              </a>
            </div>
          )}
        </>
      ),
    },
  ];

  const topBuffer = events.reduce((a, b) => a + parseInt(b.top ?? "0"), 0);

  return (
    <div css={styles.wrap}>
      <div css={styles.calendarWrap}>
        <div css={styles.statusBarWrap}>
          <div
            css={styles.innerStatusBar}
            style={{
              top: `calc(-${100 - progress}% + ${topBuffer - 10}px)`,
            }}
          />
        </div>
        {events.map((event, i) => {
          const top = getProgress(event.startTime).progress;
          return (
            <div
              key={i}
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
                <div
                  style={{
                    position: "relative",
                    transform: "translateY(-4px)",
                  }}
                >
                  {event.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
