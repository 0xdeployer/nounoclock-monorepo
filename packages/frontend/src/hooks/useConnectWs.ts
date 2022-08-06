import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { Bid } from "../api";
import { useAppStore } from "../stores";

export function useConnectWs(socket: Socket) {
  const addBid = useAppStore((state) => state.addBid);
  const setEndTime = useAppStore((state) => state.setEndTime);
  const setReaction = useAppStore((state) => state.setReaction);
  const getAuctionData = useAppStore((state) => state.getAuctionData);
  const setNote = useAppStore((state) => state.setNote);
  const setWatchers = useAppStore((state) => state.setWatchers);

  useEffect(() => {
    const listenForBid = (bid: Bid) => {
      addBid(bid);
    };
    const updateEndTime = (endTime: string) => {
      setEndTime(endTime);
    };
    const auctionCreated = () => {
      getAuctionData();
    };
    const onReaction = async ({
      bidId,
      reactionId,
    }: {
      bidId: string;
      reactionId: string;
    }) => {
      setReaction(bidId, reactionId);
    };
    const onNote = async ({ bidId, note }: { bidId: string; note: string }) => {
      setNote(bidId, note);
    };
    const onWatcher = (numWatchers: number) => {
      setWatchers(numWatchers);
    };
    socket.on("bid", listenForBid);
    socket.on("endtime", updateEndTime);
    socket.on("auctioncreated", auctionCreated);
    socket.on("reaction", onReaction);
    socket.on("note", onNote);
    socket.on("watcher", onWatcher);

    return () => {
      socket.off("bid", listenForBid);
      socket.off("endtime", updateEndTime);
      socket.off("auctioncreated", auctionCreated);
      socket.off("reaction", onReaction);
      socket.off("note", onNote);
      socket.off("watcher", onWatcher);
    };
  }, []);
}
