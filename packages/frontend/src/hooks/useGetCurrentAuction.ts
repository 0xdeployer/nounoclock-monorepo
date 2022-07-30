import { useEffect, useState } from "react";
import { getCurrentAuction, GetCurrentAuctionResponse } from "../api";

export function useGetCurrentAuction() {
  const [data, updateData] = useState<GetCurrentAuctionResponse | undefined>();

  useEffect(() => {
    const fn = async () => {
      const auctionData = await getCurrentAuction();
      updateData(auctionData);
    };
    fn();
  }, []);

  return data;
}
