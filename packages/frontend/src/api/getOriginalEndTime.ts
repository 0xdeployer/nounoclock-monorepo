import { getUrl } from "../utils";
import { OrignalEndTimeFromApi } from "./types";

export async function getOriginalEndTime(nounId: string): Promise<string> {
  const response: OrignalEndTimeFromApi = await fetch(
    getUrl(`/original-endtime/${nounId}`)
  ).then((res) => res.json());

  return response.endTime;
}
