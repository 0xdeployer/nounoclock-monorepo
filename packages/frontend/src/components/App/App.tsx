import { css, Global } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";

import { Noun } from "../Noun";
import { Bids } from "../Bids";
import { useConnectWs } from "../../hooks/useConnectWs";
import { useAppStore } from "../../stores";
import { BidForm } from "../BidForm";
import { NavBar } from "../NavBar";
import { Calendar } from "../Calendar";
import { styles } from "./styles";
import { socket, useMq } from "../../utils";
import { generalWrapper } from "../../styles/layout";
import { NounName } from "../NounName";
import { Timer } from "../Timer";
import { NocCountDown } from "../NocCountdown";
import { Button } from "../ui/Button";

const backgrounds = ["#EAECF6", "#F5EBE9"];

function App() {
  useConnectWs(socket);
  const [showBidModal, updateShowBidModal] = useState(false);
  const nounContainerRef = useRef<HTMLDivElement>(null);
  const getAuctionData = useAppStore((state) => state.getAuctionData);
  const endTime = useAppStore((store) => store.endTime);
  const { matches } = useMq();

  useEffect(() => {
    getAuctionData();
  }, []);

  useEffect(() => {
    updateShowBidModal(false);
  }, [matches["0"], updateShowBidModal]);

  const currentAuction = useAppStore((state) => state.auction);

  if (!currentAuction) {
    return <>LOADING</>;
  }

  console.log(matches);

  return (
    <>
      <Global
        styles={css`
          body {
            background: ${currentAuction
              ? backgrounds[currentAuction.background]
              : "#FFF"};
          }
        `}
      />
      <NavBar />
      <div css={styles.appWrap}>
        <div css={styles.content}>
          <div css={css(styles.nounWrap, styles.nounWrapExtra)}>
            <Noun
              key={endTime}
              container={nounContainerRef}
              data={currentAuction}
            />
            {matches["0"] && (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Timer />
                  </div>
                  <div>
                    <NocCountDown />
                  </div>
                </div>
              </div>
            )}
            {!matches["0"] && <Calendar />}
          </div>

          <div
            style={{
              flex: 1,
              position: "relative",
              paddingBottom: !matches["0"] ? "50px" : 0,
            }}
          >
            <div style={{ flex: 1, position: "relative" }}>
              <Bids
                nounContainer={nounContainerRef}
                currentBidValue={currentAuction.auction.amount}
                bids={currentAuction?.bids}
              />
            </div>
            {matches["0"] && (
              <div css={styles.mobilePlaceBidBtn}>
                <Button
                  onClick={() => updateShowBidModal(!showBidModal)}
                  variant="bravo"
                >
                  Place Bid
                </Button>
              </div>
            )}
            {matches["0"] && (
              <div
                style={
                  matches["0"]
                    ? { display: showBidModal ? "flex" : "none" }
                    : void 0
                }
                onClick={() => {
                  updateShowBidModal(false);
                }}
                css={styles.bidModalBg}
              />
            )}
            <div
              style={
                matches["0"]
                  ? { display: showBidModal ? "flex" : "none" }
                  : void 0
              }
              css={matches["0"] ? styles.bidModal : void 0}
            >
              <div css={styles.bidFormWrap}>
                <BidForm>
                  <>
                    {matches["0"] && (
                      <Button
                        variant="bravo"
                        onClick={(e) => {
                          e.preventDefault();
                          updateShowBidModal(false);
                        }}
                      >
                        Close
                      </Button>
                    )}
                  </>
                </BidForm>
              </div>

              <p css={styles.mono}>
                NounsAuctionHouseProxy Contract{" "}
                <a
                  target="_blank"
                  href={`https://etherscan.io/address/${process.env.REACT_APP_NOUN_AUCTION_HOUSE_PROXY}`}
                  rel="noreferrer"
                >
                  {process.env.REACT_APP_NOUN_AUCTION_HOUSE_PROXY}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div css={styles.content}></div>
      </div>
    </>
  );
}

export default App;
