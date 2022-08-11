import { css, Global } from "@emotion/react";
import React, { useEffect, useRef } from "react";

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

const backgrounds = ["#EAECF6", "#F5EBE9"];

function App() {
  useConnectWs(socket);
  const nounContainerRef = useRef<HTMLDivElement>(null);
  const getAuctionData = useAppStore((state) => state.getAuctionData);
  const endTime = useAppStore((store) => store.endTime);
  const { matches } = useMq();

  useEffect(() => {
    getAuctionData();
  }, []);

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

          <div style={{ flex: 1, position: "relative", paddingBottom: "50px" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Bids
                nounContainer={nounContainerRef}
                currentBidValue={currentAuction.auction.amount}
                bids={currentAuction?.bids}
              />
            </div>
            <div css={styles.bidFormWrap}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <BidForm />
              </div>
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
        <div css={styles.content}></div>
      </div>
    </>
  );
}

export default App;
