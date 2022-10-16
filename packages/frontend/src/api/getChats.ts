import { getUrl } from "../utils";
import { GetChatsResponse } from "./types";

export async function getChats(): Promise<GetChatsResponse> {
  const response: GetChatsResponse = await fetch(getUrl("/chats"), {}).then(
    (res) => res.json()
  );

  return response;
}
