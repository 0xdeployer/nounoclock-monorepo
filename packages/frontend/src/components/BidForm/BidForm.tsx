import React, { useCallback, useMemo, useRef, useState } from "react";
import { TextField } from "../ui";
import { Button } from "../ui/Button";
import { styles } from "./styles";
import { useAccount } from "wagmi";
import { useAppStore } from "../../stores";
import BigNumber from "bignumber.js";
import {
  usePrepareContractWrite,
  useContractWrite,
  useSignMessage,
} from "wagmi";
import { useAuctionCountdown } from "../../hooks";
import { getBidId } from "../../utils";
import { css } from "@emotion/react";

export function BidForm({ children }: { children?: React.ReactNode }) {
  const { isConnected, address } = useAccount();
  const bids = useAppStore((state) => state.bids ?? []);
  const nounId = useAppStore((state) => state.auction?.auction.nounId);
  const setNoteSignature = useAppStore((state) => state.setNoteSignature);
  const postAndSetNote = useAppStore((state) => state.postAndSetNote);
  const noteSignatures = useAppStore((state) => state.noteSignatures);
  const [bidValue, updateBidValue] = useState("");
  const [note, updateNote] = useState("");
  const nextBid = useMemo(() => {
    const output = bids
      .filter((bid) => !bid.pending)
      .sort((a, b) =>
        new BigNumber(a.returnValues.value).lt(
          new BigNumber(b.returnValues.value)
        )
          ? -1
          : 1
      );

    const highestBid = bids[bids.length - 1];

    if (!highestBid) return "0.01";

    const bnValue = new BigNumber(highestBid.returnValues.value);
    return bnValue
      .plus(bnValue.times(0.02))
      .div(10 ** 18)
      .toFixed(4);
  }, [bids]);

  const onBidChange = useCallback((evt: any) => {
    updateBidValue(evt.currentTarget?.value);
  }, []);

  const onNoteChange = useCallback((evt: any) => {
    updateNote(evt.target.value);
  }, []);

  let value = new BigNumber("0.01").times(10 ** 18);

  try {
    value = new BigNumber(bidValue).times(10 ** 18);
  } catch {}

  const { pastEndTime } = useAuctionCountdown();

  const pepareContractWriteEnabled = !!(
    isConnected &&
    nounId &&
    !value.isNaN() &&
    !pastEndTime &&
    value.gte(nextBid)
  );

  const bidId = getBidId(nounId as string, address as string, value.toFixed());

  const { signMessageAsync } = useSignMessage();
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.REACT_APP_NOUN_AUCTION_HOUSE_PROXY as string,
    contractInterface: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "nounId",
            type: "uint256",
          },
        ],
        name: "createBid",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "createBid",
    enabled: pepareContractWriteEnabled,
    args: [nounId],
    overrides: {
      // @ts-ignore
      value: value.toFixed(),
    },
    onError(error) {
      // no op
    },
  });
  const noteSigRef = useRef(noteSignatures);
  noteSigRef.current = noteSignatures;
  const postNote = useRef<any>();
  postNote.current = () => {
    if (note && noteSignatures?.[bidId])
      postAndSetNote(nounId as string, bidId, address as string);
  };

  const { write } = useContractWrite({
    ...config,
    onSuccess: () => {
      postNote.current();
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          try {
            write?.();
            const fn = async () => {
              if (note) {
                try {
                  const msg = `I would like to associate the following note with my bid:\n\n${note}\n\nNoun o Clock Bid ID ${bidId}`;
                  const sig = await signMessageAsync({ message: msg });
                  setNoteSignature(bidId, sig, note);
                } catch (e) {
                  console.log(e);
                }
              }
            };
            fn();
          } catch (e) {
            console.error(e);
          }
        }}
        css={styles.wrap}
      >
        <TextField
          value={note}
          css={styles.noteInput}
          onChange={onNoteChange}
          placeholder="Add a note"
        />
        <div
          css={css`
            display: flex;
            gap: 10px;
          `}
        >
          <TextField
            onChange={onBidChange}
            css={css(styles.priceInput, `flex: 1`)}
            value={bidValue}
            placeholder={`Ξ ${nextBid === "0.00" ? "0.01" : nextBid} or more`}
          />
          <Button
            css={css(styles.btn, `min-width: 200px;`)}
            disabled={!pepareContractWriteEnabled}
          >
            Place bid
          </Button>
        </div>
        {children}
      </form>
    </>
  );
}
