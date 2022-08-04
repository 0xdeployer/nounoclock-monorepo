import BigNumber from "bignumber.js";
import React from "react";
import { Bid } from "../../api";
import { useAppStore } from "../../stores";
import { getBidId, truncateAddress } from "../../utils";
import { Reactions } from "../Reactions";
import { Avatar } from "../ui";
import { Header } from "../ui/Header";
import { styles } from "./styles";

type BidItemProps = {
  style?: React.CSSProperties;
  bid: Bid;
  current?: boolean;
};

export function BidItem({ bid, style }: BidItemProps) {
  const bidId = getBidId(
    bid.returnValues.nounId,
    bid.returnValues.sender,
    bid.returnValues.value
  );
  const note = useAppStore((state) => state.notes?.[bidId]);
  return (
    <div data-id="biditem" css={styles.bidItem} style={style}>
      <div css={styles.bidItemInner}>
        <Header>
          <>
            {"Ξ "}
            {new BigNumber(bid.returnValues.value).div(10 ** 18).toFixed(2)}
          </>
        </Header>
        <div css={styles.info}>
          <div css={styles.social}>
            <div css={styles.bidItemAvatarWrap}>
              <Avatar
                css={styles.bidItemAvatar}
                src={bid.avatar}
                seed={bid.address}
              />
              {bid.displayName ?? truncateAddress(bid.address)}
            </div>
            {bid.ethInWallet && (
              <div>
                {`Ξ ${new BigNumber(bid.ethInWallet)
                  .div(10 ** 18)
                  .toFixed(2)} in wallet`}
              </div>
            )}
            {bid.numberOfNouns && <div>{`${bid.numberOfNouns} nouns`}</div>}
          </div>
          {note && <h2>{note}</h2>}
          <Reactions nounId={bid.returnValues.nounId} bidId={bidId} />
        </div>
      </div>
    </div>
  );
}
