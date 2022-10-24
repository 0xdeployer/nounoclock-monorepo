import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { Bid, Chat } from "../api";
import { useAppStore } from "../stores";

export function useConnectWs(socket: Socket) {
  const addBid = useAppStore((state) => state.addBid);
  const setEndTime = useAppStore((state) => state.setEndTime);
  const setReaction = useAppStore((state) => state.setReaction);
  const getAuctionData = useAppStore((state) => state.getAuctionData);
  const setNote = useAppStore((state) => state.setNote);
  const setWatchers = useAppStore((state) => state.setWatchers);
  const appendChat = useAppStore((state) => state.appendChat);
  const setChatSignature = useAppStore((state) => state.setChatSignature);

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
    const onChatMessage = (chat: Chat) => {
      appendChat(chat);
    };
    const onChatNotValid = () => {
      console.log("re-auth required");
      try {
        localStorage.clearItem("NOC_CHAT_AUTH");
      } catch {}
      setChatSignature(void 0);
    };
    socket.on("bid", listenForBid);
    socket.on("endtime", updateEndTime);
    socket.on("auctioncreated", auctionCreated);
    socket.on("reaction", onReaction);
    socket.on("note", onNote);
    socket.on("watcher", onWatcher);
    socket.on("chat-message", onChatMessage);
    socket.on("chat-not-valid", onChatNotValid);

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
