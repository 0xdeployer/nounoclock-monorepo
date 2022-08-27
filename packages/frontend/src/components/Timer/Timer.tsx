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
      flexDirection: ["row"],
      flex: 1,
      alignItems: ["center", "center"],
      justifyContent: ["flex-end", "center"],
      gap: ["10px", "3px"],
    })
  ),
  numbers: css(mq({ width: ["80px"], fontWeight: 600, fontSize: "12px" })),
  title: css(
    textGolf,
    mq({
      fontSize: "12px",
      fontWeight: 400,
    })
  ),
};

export function Timer({ simple }: { simple?: boolean }) {
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
        {!simple && !pastEndTime && <p css={styles.title}>Auction ends in</p>}
        <Header css={styles.numbers} type="h3">
          {!!hours === true && <>{hours}h</>}{" "}
          {!!minutes === true && <>{minutes ?? 0}m</>}{" "}
          {seconds != null && <>{seconds ?? 0}s</>}
        </Header>
      </>
    </div>
  );
}
