import { css } from "@emotion/react";
import { intervalToDuration } from "date-fns";
import React, { useMemo } from "react";
import { useAuctionCountdown } from "../../hooks";
import { textGolf } from "../../styles/text";
import { mq } from "../../utils";
import { Header } from "../ui";

const styles = {
  timerWrap: css(
    mq({
      display: "flex",
      flexDirection: "column",
      alignItems: ["flex-end", "flex-start"],
    })
  ),
  numbers: css(mq({ fontSize: ["", "14px"] })),
  title: css(
    textGolf,
    mq({
      fontSize: ["", "12px"],
    })
  ),
};

export function Timer() {
  const { start, end, pastEndTime } = useAuctionCountdown();

  // const [today, todayFormatted] = useMemo(() => {
  //   const today = new Date();
  //   return [today, format(new Date(), "PPP")];
  // }, []);

  let hours, minutes, seconds;
  if (!pastEndTime) {
    ({ hours, minutes, seconds } = intervalToDuration({
      start: start.times(1000).toNumber(),
      end: new Date(end.times(1000).toNumber()),
    }));
  }
  return (
    <div css={styles.timerWrap}>
      <>
        {!pastEndTime && <p css={styles.title}>Auction ends in</p>}
        <Header css={styles.numbers} type="h3">
          {!!hours === true && <>{hours}h</>}{" "}
          {!!minutes === true && <>{minutes ?? 0}m</>}{" "}
          {seconds != null && <>{seconds ?? 0}s</>}
        </Header>
      </>
    </div>
  );
}
