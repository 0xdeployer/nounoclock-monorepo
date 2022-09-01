import { getUrl } from "../utils";
import { GetNnsResponse } from "./types";

export async function getNns(addresses: string[]): Promise<GetNnsResponse> {
  const response: GetNnsResponse = await fetch(getUrl("/nns"), {
    method: "POST",
    body: JSON.stringify({ addresses }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

  return response;
}
