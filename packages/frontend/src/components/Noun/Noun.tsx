import React, { useEffect, useMemo, useState } from "react";
import { GetCurrentAuctionResponse } from "../../api";
import { styles } from "./styles";
import { Header } from "../ui/Header";
import { format, getUnixTime, intervalToDuration } from "date-fns";
import BN from "bignumber.js";
import { useAppStore } from "../../stores";

type NounProps = {
  data: GetCurrentAuctionResponse;
  container: React.RefObject<HTMLDivElement>;
};

export function Noun({ data, container }: NounProps) {
  const [count, updateCount] = useState(0);
  const endTime = useAppStore((store) => store.endTime);

  const [today, todayFormatted] = useMemo(() => {
    const today = new Date();
    return [today, format(new Date(), "PPP")];
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateCount((c) => {
        return c + 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [count]);

  const end = new BN(endTime ?? data.auction.endTime);
  const start = new BN(getUnixTime(today)).plus(count);
  const pastEndTime = start.gte(end);
  let hours, minutes, seconds;
  if (!pastEndTime) {
    ({ hours, minutes, seconds } = intervalToDuration({
      start: start.times(1000).toNumber(),
      end: new Date(end.times(1000).toNumber()),
    }));
  }

  return (
    <div ref={container} css={styles.wrap}>
      <div css={styles.headerWrap}>
        <div>
          <Header>{data.metadata.name}</Header>
          <p>{todayFormatted}</p>
        </div>
        <div css={styles.timerWrap}>
          {pastEndTime && (
            <a href="https://fomonouns.wtf/">VOTE FOR THE NEXT NOUN!</a>
          )}
          {!pastEndTime && (
            <>
              <p>Auction ends in</p>
              <Header type="h3">
                {hours} hours {minutes} minutes {seconds} seconds
              </Header>
            </>
          )}
        </div>
      </div>
      <img css={styles.img} src={data.metadata.image} />
    </div>
  );
}
