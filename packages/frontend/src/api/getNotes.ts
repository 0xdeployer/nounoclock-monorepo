import { getUrl } from "../utils";
import { NotesFromApi } from "./types";

export async function getNotes(nounId: string): Promise<NotesFromApi> {
  const reactions: NotesFromApi = await fetch(getUrl(`/notes/${nounId}`)).then(
    (res) => res.json()
  );

  return reactions;
}
