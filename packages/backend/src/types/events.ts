export type AuctionBidEvent = {
  returnValues: {
    nounId: string;
    sender: string;
    value: string;
    extended: boolean;
  };
};

export type AuctionSettledEvent = {
  returnValues: {
    nounId: string;
    winner: string;
    amount: string;
  };
};
