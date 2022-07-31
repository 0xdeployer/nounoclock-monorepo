import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { Bid } from "../api";
import { useAppStore } from "../stores";

export function useConnectWs(socket: Socket) {
  const addBid = useAppStore((state) => state.addBid);
  const setEndTime = useAppStore((state) => state.setEndTime);
  useEffect(() => {
    const listenForBid = (bid: Bid) => {
      addBid(bid);
    };
    const updateEndTime = (endTime: string) => {
      setEndTime(endTime);
    };
    const auctionCreated = () => {};
    socket.on("bid", listenForBid);
    socket.on("endtime", updateEndTime);
    socket.on("auctioncreated", auctionCreated);

    return () => {
      socket.off("bid", listenForBid);
      socket.off("endtime", updateEndTime);
      socket.off("auctioncreated", auctionCreated);
    };
  }, []);
}
