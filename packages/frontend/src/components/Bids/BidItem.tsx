import BigNumber from "bignumber.js";
import React from "react";
import { Bid } from "../../api";
import { useAppStore } from "../../stores";
import { getBidId, truncateAddress, useMq } from "../../utils";
import { Reactions } from "../Reactions";
import { Avatar, Tag } from "../ui";
import { Header } from "../ui/Header";
import { styles } from "./styles";

type BidItemProps = {
  style?: React.CSSProperties;
  bid: Bid;
  current?: boolean;
};

export function BidItem({ bid, style, current }: BidItemProps) {
  const bidId = getBidId(
    bid.returnValues.nounId,
    bid.returnValues.sender,
    bid.returnValues.value
  );
  const { matches } = useMq();
  const note = useAppStore((state) => state.notes?.[bidId]);
  return (
    <>
      <div data-id="biditem" css={styles.bidItem} style={style}>
        <div
          style={{
            background: current ? "#FFFDE8" : bid.pending ? "#F8F8F8" : void 0,
          }}
          css={styles.bidItemInner}
        >
          <div css={styles.priceWrap}>
            <Header css={styles.price}>
              <>
                {"Ξ "}
                {new BigNumber(bid.returnValues.value).div(10 ** 18).toFixed(2)}
              </>
            </Header>
            {bid.pending && <Tag variant="gray">Pending</Tag>}
            {current && <Tag variant="gold">Current Bid</Tag>}
          </div>
          <div css={styles.info}>
            <div css={styles.social}>
              <div css={styles.bidItemAvatarWrap}>
                <Avatar
                  css={styles.bidItemAvatar}
                  src={bid.avatar}
                  seed={bid.address}
                />
                <span css={styles.infoText} style={{ opacity: 1 }}>
                  {bid.displayName ?? truncateAddress(bid.address)}
                </span>
              </div>
              {bid.ethInWallet && (
                <span css={styles.infoText}>
                  {`Ξ ${new BigNumber(bid.ethInWallet)
                    .div(10 ** 18)
                    .toFixed(2)} in wallet`}
                </span>
              )}
              {bid.numberOfNouns && (
                <span
                  css={styles.infoText}
                >{`${bid.numberOfNouns} nouns`}</span>
              )}
            </div>
            {note && (
              <Header css={styles.note} variant="serif">
                {note}
              </Header>
            )}
            {!matches["0"] && (
              <Reactions nounId={bid.returnValues.nounId} bidId={bidId} />
            )}
          </div>
        </div>
      </div>
      {matches["0"] && (
        <Reactions nounId={bid.returnValues.nounId} bidId={bidId} />
      )}
    </>
  );
}
