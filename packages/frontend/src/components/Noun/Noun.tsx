import React, { useEffect, useMemo, useRef, useState } from "react";
import { GetCurrentAuctionResponse } from "../../api";
import { styles } from "./styles";
import { Header } from "../ui/Header";
import { format, intervalToDuration } from "date-fns";
import { useAccount } from "wagmi";
import { Button } from "../ui/Button";
import { SettleButton } from "../SettleButton";
import { useAuctionCountdown } from "../../hooks";

type NounProps = {
  data: GetCurrentAuctionResponse;
  container: React.RefObject<HTMLDivElement>;
};

export function Noun({ data, container }: NounProps) {
  const { isConnected } = useAccount();

  const [today, todayFormatted] = useMemo(() => {
    const today = new Date();
    return [today, format(new Date(), "PPP")];
  }, []);

  const { start, end, pastEndTime } = useAuctionCountdown();

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
          <>
            <p>Auction ends in</p>
            <Header type="h3">
              {hours ?? 0} hours {minutes ?? 0} minutes {seconds ?? 0} seconds
            </Header>
          </>
        </div>
      </div>
      <img css={styles.img} src={data.metadata.image} />
      {isConnected && pastEndTime && <SettleButton />}
    </div>
  );
}
