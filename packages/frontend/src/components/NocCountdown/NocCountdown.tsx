import React from "react";
import { useAuctionCountdown, useNocStartTime } from "../../hooks";
import { styles as calendarStyles } from "../Calendar";
import { css } from "@emotion/react";
import { TwitterImg } from "./TwitterImg";

export function NocCountDown({
  simple,
  background,
}: {
  background?: "0" | "1";
  simple?: boolean;
}) {
  // causes re-render
  useAuctionCountdown();
  const { nocActive, nocStartTime, timeLeftToNoc } = useNocStartTime();
  const showHours = !!timeLeftToNoc?.hours;
  const showMinutes = !!timeLeftToNoc?.minutes;
  const showSeconds =
    (!simple || (simple && !showMinutes)) && !!timeLeftToNoc?.seconds;
  return (
    <>
      <div
        css={css(
          calendarStyles.tag,
          simple ? calendarStyles.tagSimple : void 0
        )}
      >
        {nocActive && "LIVE"}
        {!nocActive && (
          <>
            In {showHours && `${timeLeftToNoc?.hours}h`}{" "}
            {showMinutes && `${timeLeftToNoc?.minutes}m`}{" "}
            {showSeconds && `${timeLeftToNoc?.seconds}s`}
          </>
        )}
      </div>
      <p css={calendarStyles.title}>The Daily Noun O'Clock Show</p>
      {/* <p css={calendarStyles.description}>
        Starts 15 minutes before auction close.
      </p> */}
      <a
        href="https://twitter.com/noun_o_clock"
        target="_blank"
        css={css(
          calendarStyles.twitterButton,
          simple && background
            ? calendarStyles[`btnStyle${background}`]
            : void 0
        )}
        rel="noreferrer"
      >
        <TwitterImg /> Listen
      </a>
    </>
  );
}
