import { getUrl } from "../utils";

export async function postNote({
  bidId,
  nounId,
  address,
  note,
  signature,
}: {
  bidId: string;
  nounId: string;
  address: string;
  note: string;
  signature: string;
}): Promise<void> {
  return fetch(getUrl(`/post-note`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bidId,
      nounId,
      address,
      note,
      signature,
    }),
  }).then((res) => res.json());
}
