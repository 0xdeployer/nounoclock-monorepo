import create from "zustand";
import {
  Bid,
  getCurrentAuction,
  GetCurrentAuctionResponse,
  getNotes,
  postNote,
} from "../api";
import { getOriginalEndTime } from "../api/getOriginalEndTime";
import { getReactions } from "../api/getReactions";
import { getBidId, socket } from "../utils";
import { devtools } from "zustand/middleware";

type State = {
  auction?: GetCurrentAuctionResponse;
  bids?: Bid[];
  endTime?: string;
  reactions: {
    [bidId: string]: {
      [reactionId: string]: number;
    };
  };
  noteSignatures?: {
    [bidId: string]: { note: string; sig: string };
  };
  notes?: {
    [bidId: string]: string;
  };
  watchers?: number;
  originalEndTime?: string;
  setWatchers: (num: number) => void;
  setNote: (bidId: string, note: string) => void;
  setNoteSignature: (bidId: string, sig: string, note: string) => void;
  setReaction: (bidId: string, reactionId: string) => void;
  react: (noundId: string, bidId: string, reactionId: string) => void;
  setEndTime: (endTime: string) => void;
  setBids: (bids: Bid[]) => void;
  addBid: (bid: Bid) => void;
  getAuctionData: () => Promise<void>;
  postAndSetNote: (
    nounId: string,
    bidId: string,
    address: string
  ) => Promise<void>;
};

export const useAppStore = create<State>()(
  devtools((set, get) => {
    return {
      async getAuctionData() {
        const auction = await getCurrentAuction();
        const [originalEndTime, notes, reactions] = await Promise.all([
          getOriginalEndTime(auction.auction.nounId),
          getNotes(auction.auction.nounId),
          getReactions(auction.auction.nounId),
        ]);
        get().setBids(auction.bids);
        get().setEndTime(auction.auction.endTime);
        set({ auction, reactions, notes, originalEndTime });
      },
      setWatchers: (num) => set({ watchers: num }),
      setNote: (bidId: string, note: string) => {
        set({
          notes: {
            ...get().notes,
            [bidId]: note,
          },
        });
      },
      async postAndSetNote(nounId, bidId, address) {
        const data = get().noteSignatures?.[bidId];
        if (!data) {
          console.error("No note");
          return;
        }
        const { note, sig } = data;
        get().setNote(bidId, note);
        await postNote({ bidId, nounId, address, note, signature: sig });
      },
      setNoteSignature: (bidId: string, sig: string, note) => {
        set({
          noteSignatures: {
            ...get().noteSignatures,
            [bidId]: { sig, note },
          },
        });
      },
      setBids: (bids: Bid[]) => {
        set({ bids });
      },
      addBid: (bid: Bid) => {
        const bidId = getBidId(
          bid.returnValues.nounId,
          bid.returnValues.sender,
          bid.returnValues.value
        );
        // Filter bids if there was a previous pending bid
        const bids = (get().bids ?? []).filter(
          (b) =>
            getBidId(
              b.returnValues.nounId,
              b.returnValues.sender,
              b.returnValues.value
            ) !== bidId
        );
        bids.push(bid);
        set({
          bids,
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
      react: (nounId: string, bidId: string, reactionId: string) => {
        get().setReaction(bidId, reactionId);
        socket.emit("reaction", { nounId, bidId, reactionId });
      },
    };
  })
);
