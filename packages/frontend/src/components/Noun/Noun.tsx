import React, { useEffect, useMemo, useState } from "react";
import { GetCurrentAuctionResponse } from "../../api";
import { styles } from "./styles";
import { Header } from "../ui/Header";
import { format, getUnixTime, intervalToDuration } from "date-fns";
import BN from "bignumber.js";

type NounProps = {
  data: GetCurrentAuctionResponse;
  container: React.RefObject<HTMLDivElement>;
};

export function Noun({ data, container }: NounProps) {
  const [count, updateCount] = useState(0);

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

  const { hours, minutes, seconds } = intervalToDuration({
    start: new BN(getUnixTime(today)).plus(count).times(1000).toNumber(),
    end: new Date(new BN(data.auction.endTime).times(1000).toNumber()),
  });
  return (
    <div ref={container} css={styles.wrap}>
      <div css={styles.headerWrap}>
        <div>
          <Header>{data.metadata.name}</Header>
          <p>{todayFormatted}</p>
        </div>
        <div css={styles.timerWrap}>
          <p>Auction ends in</p>
          <Header type="h3">
            <>
              {hours} hours {minutes} minutes {seconds} seconds
            </>
          </Header>
        </div>
      </div>
      <img css={styles.img} src={data.metadata.image} />
    </div>
  );
}
