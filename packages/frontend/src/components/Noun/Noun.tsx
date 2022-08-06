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

  const { start, end, pastEndTime } = useAuctionCountdown();

  return (
    <div ref={container} css={styles.wrap}>
      <img css={styles.img} src={data.metadata.image} />
      {isConnected && pastEndTime && <SettleButton />}
    </div>
  );
}
