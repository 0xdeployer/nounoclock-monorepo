import { css } from "@emotion/react";
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
      <div css={generalWrapper}>
        <NavBar />
        <div css={styles.content}>
          <div css={styles.nounWrap}>
            <Noun
              key={endTime}
              container={nounContainerRef}
              data={currentAuction}
            />
            {matches["0"] && (
              <div style={{ width: "38%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <NounName />
                    <div style={{ marginTop: "10px" }}>
                      <Timer />
                    </div>
                  </div>
                  <div>
                    <NocCountDown />
                  </div>
                </div>
              </div>
            )}
            {!matches["0"] && <Calendar />}
          </div>

          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Bids
                nounContainer={nounContainerRef}
                currentBidValue={currentAuction.auction.amount}
                bids={currentAuction?.bids}
              />
              {!matches["0"] && <div css={styles.gradient} />}
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
          </div>
        </div>
        <div css={styles.content}></div>
      </div>
    </>
  );
}

export default App;
