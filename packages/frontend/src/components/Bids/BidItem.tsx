import BigNumber from "bignumber.js";
import React, { useRef } from "react";
import { Bid } from "../../api";
import { useAppStore } from "../../stores";
import { getBidId, truncateAddress } from "../../utils";
import { Reactions } from "../Reactions";
import { Avatar, Tag } from "../ui";
import { Header } from "../ui/Header";
import { styles } from "./styles";
import newTab from "../../new-tab.svg";

type BidItemProps = {
  style?: React.CSSProperties;
  bid: Bid;
  current?: boolean;
  onClickReactionMenu: (bidId: string) => void;
};

export function BidItem({
  bid,
  style,
  current,
  onClickReactionMenu,
}: BidItemProps) {
  const bidId = getBidId(
    bid.returnValues.nounId,
    bid.returnValues.sender,
    bid.returnValues.value
  );
  const isCurrent = !bid.pending && current;
  const note =
    useAppStore((state) => state.notes?.[bidId]) ?? "HELLO THIS IS A NOTE";
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={ref} data-id="biditem" css={styles.bidItem} style={style}>
        <div
          style={{
            background: isCurrent
              ? "#FFFDE8"
              : bid.pending
              ? "#F8F8F8"
              : void 0,
          }}
          css={styles.bidItemInner}
        >
          <div css={styles.priceWrap}>
            <a
              href={`https://etherscan.io/tx/${bid.transactionHash}`}
              target="_blank"
              rel="noreferrer"
              css={styles.priceLink}
            >
              <Header css={styles.price}>
                <>
                  {"Ξ "}
                  {new BigNumber(bid.returnValues.value)
                    .div(10 ** 18)
                    .toFixed(2)}
                </>
              </Header>
              <img src={newTab} />
            </a>
            {bid.pending && <Tag variant="gray">Pending</Tag>}
            {isCurrent && <Tag variant="gold">Current Bid</Tag>}
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
              {Number(bid.numberOfNouns) > 0 && (
                <>
                  <span css={styles.infoText}>•</span>
                  <span css={styles.infoText}>{`${bid.numberOfNouns} noun${
                    Number(bid.numberOfNouns) === 1 ? "" : "s"
                  }`}</span>
                </>
              )}
            </div>
            {note && (
              <Header css={styles.note} variant="serif">
                {note}
              </Header>
            )}
            <Reactions
              onClickReactionMenu={onClickReactionMenu}
              nounId={bid.returnValues.nounId}
              bidId={bidId}
            />
          </div>
        </div>
      </div>
    </>
  );
}
