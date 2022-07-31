import create from "zustand";
import { Bid, getCurrentAuction, GetCurrentAuctionResponse } from "../api";
import { socket } from "../App";

type State = {
  auction?: GetCurrentAuctionResponse;
  bids?: Bid[];
  endTime?: string;
  reactions: {
    [bidId: string]: {
      [reactionId: string]: number;
    };
  };
  setReaction: (bidId: string, reactionId: string) => void;
  react: (bidId: string, reactionId: string) => void;
  setEndTime: (endTime: string) => void;
  setBids: (bids: Bid[]) => void;
  addBid: (bid: Bid) => void;
  getAuctionData: () => Promise<void>;
};

export const useAppStore = create<State>()((set, get) => {
  return {
    async getAuctionData() {
      const auction = await getCurrentAuction();
      get().setBids(auction.bids);
      set({ auction });
    },
    setBids: (bids: Bid[]) => {
      set({ bids });
    },
    addBid: (bid: Bid) => {
      set({
        bids: [...(get().bids ?? []), bid],
      });
    },
    setEndTime: (endTime: string) => {
      set({ endTime });
    },

    reactions: {},
    setReaction: (bidId: string, reactionId: string) => {
      const currentReactions = get().reactions;

      set({
        reactions: {
          ...currentReactions,
          [bidId]: {
            ...currentReactions[bidId],
            [reactionId]: (currentReactions[bidId]?.[reactionId] ?? 0) + 1,
          },
        },
      });
    },
    react: (bidId: string, reactionId: string) => {
      get().setReaction(bidId, reactionId);
      socket.emit("reaction", { bidId, reactionId });
    },
  };
});
