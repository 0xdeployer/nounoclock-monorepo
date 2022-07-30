export type Bid = {
  returnValues: {
    noundId: string;
    sender: string;
    value: string;
    extended: false;
  };
};

export type GetCurrentAuctionResponseRaw = GetCurrentAuctionResponse & {
  metadata: string;
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
};
