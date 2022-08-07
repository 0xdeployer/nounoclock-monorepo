import BigNumber from "bignumber.js";
import { intervalToDuration } from "date-fns";
import { useMemo } from "react";
import { useAppStore } from "../stores";

// Should be 15 minutes in production
const NOC_MIN_BEFORE_AUCTION_END = 15;

export function useNocStartTime() {
  const originalEndTime = useAppStore(
    (state) => state.originalEndTime ?? state.endTime ?? 0
  );
  const nocStartTime = useMemo(() => {
    return new BigNumber(originalEndTime as string)
      .minus(NOC_MIN_BEFORE_AUCTION_END * 60)
      .toNumber();
  }, [originalEndTime]);

  const now = Date.now();
  const nocStartTimeMs = nocStartTime * 1000;
  let nocActive = now >= nocStartTimeMs;
  let timeLeftToNoc;
  if (!nocActive) {
    timeLeftToNoc = intervalToDuration({
      start: now,
      end: nocStartTimeMs + 1000,
    });
  }
  if (
    timeLeftToNoc?.days === 0 &&
    timeLeftToNoc?.hours === 0 &&
    timeLeftToNoc?.minutes === 0 &&
    timeLeftToNoc?.seconds === 0
  ) {
    nocActive = true;
  }

  return { nocStartTime, timeLeftToNoc, nocActive };
}
