export type Bid = {
  returnValues: {
    nounId: string;
    sender: string;
    value: string;
    extended: false;
  };
  ethInWallet: string;
  address: string;
  avatar: string;
  displayName: string;
  name: string;
  numberOfNouns: string;
  pending?: boolean;
  transactionHash: string;
};

export type GetCurrentAuctionResponseRaw = GetCurrentAuctionResponse & {
  metadata: string;
};

export type Chat = {
  address: string;
  avatar: string;
  message: string;
  displayName: string;
  timestamp: string;
};

export type GetNnsResponse = { name: string; address: string }[];

export type ChatSigData = {
  timestamp: number;
  message: string;
  sig: string;
  address: string;
};

export type GetCurrentAuctionResponse = {
  auction: {
    nounId: string;
    amount: string;
    startTime: string;
    endTime: string;
    bidder: string;
    settled: boolean;
  };
  bids: Bid[];
  metadata: {
    name: string;
    image: string;
    description: string;
  };
  blockTimestamp: string;
  background: "0" | "1";
};

export type ReactionsFromApi = {
  [bidId: string]: {
    [reactionId: string]: number;
  };
};

export type TimeStampMsg = {
  timestamp: number;
  message: string;
  template: string;
};

export type Note = string;

export type NotesFromApi = {
  [bidId: string]: Note;
};

export type OrignalEndTimeFromApi = {
  endTime: string;
};
