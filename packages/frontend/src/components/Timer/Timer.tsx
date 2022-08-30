import { css } from "@emotion/react";
import { intervalToDuration, format } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";
import { useAuctionCountdown } from "../../hooks";
import { textGolf } from "../../styles/text";
import { mq } from "../../utils";
import { Header } from "../ui";

const styles = {
  timerWrap: css(
    mq({
      cursor: "pointer",
      display: "inline-flex",
      flexDirection: ["row"],
      flex: 1,
      alignItems: ["center", "center"],
      justifyContent: ["flex-end", "center"],
      gap: ["10px", "3px"],
    })
  ),
  numbers: css(mq({ width: ["100px"], fontWeight: 600, fontSize: "12px" })),
  showDateEnd: css(mq({ width: ["auto"] })),
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
  const [showTime, updateShowTime] = useState(false);

  const endToMsDate = new Date(end.times(1000).toNumber());

  const formatted = format(endToMsDate, "MMM dd 'at' h:mm:ss a");

  let hours, minutes, seconds;
  if (!pastEndTime) {
    ({ hours, minutes, seconds } = intervalToDuration({
      start: start.times(1000).toNumber(),
      end: endToMsDate,
    }));
  }

  const onClick = useCallback(() => {
    updateShowTime(!showTime);
  }, [showTime]);
  return (
    <div onClick={onClick} css={styles.timerWrap}>
      <>
        {!simple && !pastEndTime && (
          <p css={styles.title}>Auction ends {showTime ? "on" : "in"}</p>
        )}
        <Header
          css={css(styles.numbers, showTime ? styles.showDateEnd : void 0)}
          type="h3"
        >
          <>
            {showTime && formatted}
            {!showTime && (
              <>
                {!!hours === true && <>{hours}h</>}{" "}
                {!!minutes === true && <>{minutes ?? 0}m</>}{" "}
                {seconds != null && <>{seconds ?? 0}s</>}
              </>
            )}
          </>
        </Header>
      </>
    </div>
  );
}
