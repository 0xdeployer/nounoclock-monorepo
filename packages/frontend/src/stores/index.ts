import create from "zustand";
import {
  Bid,
  Chat,
  ChatSigData,
  getCurrentAuction,
  GetCurrentAuctionResponse,
  getNns,
  GetNnsResponse,
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
  chats: Chat[];
  chatSignatureData?: ChatSigData;
  watchers?: number;
  originalEndTime?: string;
  setWatchers: (num: number) => void;
  setNote: (bidId: string, note: string) => void;
  setNoteSignature: (bidId: string, sig: string, note: string) => void;
  setReaction: (bidId: string, reactionId: string) => void;
  react: (noundId: string, bidId: string, reactionId: string) => void;
  setEndTime: (endTime: string) => void;
  setBids: (bids: Bid[]) => void;
  setChatSignature: (sig: ChatSigData | undefined) => void;
  addBid: (bid: Bid) => void;
  setNnsNames: (names: GetNnsResponse) => void;
  getAuctionData: () => Promise<void>;
  appendChat: (chat: Chat) => void;
  sendChat: (message: string) => void;
  postAndSetNote: (
    nounId: string,
    bidId: string,
    address: string
  ) => Promise<void>;
};

export const useAppStore = create<State>()(
  devtools((set, get) => {
    return {
      chats: [],
      setChatSignature(data: ChatSigData | undefined) {
        set({ chatSignatureData: data });
      },
      appendChat(chat: Chat) {
        set({ chats: [...(get().chats ?? []), chat] });
      },
      sendChat(message: string) {
        // timestamp: number;
        // address: string;
        // signature: string;
        // message: string;
        const chatSignatureData = get().chatSignatureData;
        const payload = { ...chatSignatureData, message };
        console.log(payload);
        socket.emit("chat", payload);
      },
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

        // get NNS data
        try {
          const nns = await getNns(auction.bids.map((bid) => bid.address));
          get().setNnsNames(nns);
        } catch (e) {
          console.log(e);
        }
      },
      setNnsNames: (names: GetNnsResponse) => {
        const state = get();
        const { bids } = state;

        if (bids) {
          const newBids = bids.map((bid) => {
            const found = names.find(
              (item) => item.address === bid.address.toLowerCase()
            );
            if (found?.name) {
              bid.displayName = found.name;
            }
            return bid;
          });
          state.setBids(newBids);
        }
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
      addBid: async (bid: Bid) => {
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

        // get NNS data
        try {
          const nns = await getNns([bid.address]);
          get().setNnsNames(nns);
        } catch (e) {
          console.log(e);
        }
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
