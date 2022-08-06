import { useEffect, useState } from "react";
import { useAppStore } from "../stores";
import BN from "bignumber.js";

export function useAuctionCountdown() {
  const endTime = useAppStore((store) => store.endTime);
  const [flip, updateFlip] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateFlip((f) => !f);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [flip]);

  const end = new BN(endTime ?? "0");
  const start = new BN(Math.floor(Date.now() / 1000));
  const pastEndTime = start.gte(end);
  return {
    end,
    start,
    pastEndTime,
    flip,
  };
}
