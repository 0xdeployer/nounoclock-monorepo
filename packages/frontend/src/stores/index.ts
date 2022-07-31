import create from "zustand";
import { Bid, getCurrentAuction, GetCurrentAuctionResponse } from "../api";

type State = {
  auction?: GetCurrentAuctionResponse;
  bids?: Bid[];
  endTime?: string;
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
  };
});
