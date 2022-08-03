import { getUrl } from "../utils";
import { ReactionsFromApi } from "./types";

export async function getReactions(nounId: string): Promise<ReactionsFromApi> {
  const reactions: ReactionsFromApi = await fetch(
    getUrl(`/reactions/${nounId}`)
  ).then((res) => res.json());

  return reactions;
}
