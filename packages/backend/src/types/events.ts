export type AuctionBidEvent = {
  returnValues: {
    nounId: string;
    sender: string;
    value: string;
    extended: boolean;
  };
};
