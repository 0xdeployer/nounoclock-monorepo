import BigNumber from "bignumber.js";
import React from "react";
import { Bid } from "../../api";
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
          <Reactions bidId={getBidId(bid)} />
        </div>
      </div>
    </div>
  );
}
