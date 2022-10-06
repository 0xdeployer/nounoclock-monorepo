import { getUrl } from "../utils";
import { ReactionsFromApi, TimeStampMsg } from "./types";

export async function getTimestamp(): Promise<TimeStampMsg> {
  const timestamp: TimeStampMsg = await fetch(getUrl(`/timestamp`)).then(
    (res) => res.json()
  );

  return timestamp;
}
