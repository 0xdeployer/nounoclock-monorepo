import React from "react";
import { useAuctionCountdown, useNocStartTime } from "../../hooks";
import { styles as calendarStyles } from "../Calendar";

export function NocCountDown() {
  // causes re-render
  useAuctionCountdown();
  const { nocActive, nocStartTime, timeLeftToNoc } = useNocStartTime();
  return (
    <>
      <div css={calendarStyles.tag}>
        {nocActive && "LIVE"}
        {!nocActive && (
          <>
            In {!!timeLeftToNoc?.hours && `${timeLeftToNoc?.hours}h`}{" "}
            {!!timeLeftToNoc?.minutes && `${timeLeftToNoc?.minutes}m`}{" "}
            {!!timeLeftToNoc?.seconds && `${timeLeftToNoc?.seconds}s`}
          </>
        )}
      </div>
      <p css={calendarStyles.title}>The Daily Noun O'Clock Show</p>
      {/* <p css={calendarStyles.description}>
        Starts 15 minutes before auction close.
      </p> */}
      {nocActive && (
        <a
          href="https://twitter.com/noun_o_clock"
          target="_blank"
          css={calendarStyles.twitterButton}
          rel="noreferrer"
        >
          Listen on Twitter
        </a>
      )}
    </>
  );
}
