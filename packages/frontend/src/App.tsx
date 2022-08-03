import { css } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Noun } from "./components/Noun";
import { Bids } from "./components/Bids";
import { useConnectWs } from "./hooks/useConnectWs";
import { useAppStore } from "./stores";
import { BidForm } from "./components/BidForm";
import { NavBar } from "./components/NavBar";

export const socket = io("ws://localhost:3333");

const styles = {
  wrap: css({
    padding: "25px 50px 25px 100px",
    position: "relative",
    maxWidth: "1400px",
    margin: "auto",
  }),
  content: css({
    display: "flex",
    gap: "30px",
  }),

  gradient: css({
    background:
      "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0) 50%)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
  }),
  bidFormWrap: css({
    marginTop: "32px",
    display: "flex",
    justifyContent: "flex-end",
  }),
};

function App() {
  useConnectWs(socket);
  const nounContainerRef = useRef<HTMLDivElement>(null);
  const getAuctionData = useAppStore((state) => state.getAuctionData);
  const endTime = useAppStore((store) => store.endTime);

  useEffect(() => {
    getAuctionData();
  }, []);

  const currentAuction = useAppStore((state) => state.auction);

  if (!currentAuction) {
    return <>LOADING</>;
  }

  return (
    <>
      <NavBar />
      <div css={styles.wrap}>
        <div css={styles.content}>
          <Noun
            key={endTime}
            container={nounContainerRef}
            data={currentAuction}
          />
          <div style={{ flex: 1, position: "relative" }}>
            <Bids
              nounContainer={nounContainerRef}
              currentBidValue={currentAuction.auction.amount}
              bids={currentAuction?.bids}
            />
            <div css={styles.gradient} />
          </div>
        </div>
        <div css={styles.bidFormWrap}>
          <div
            style={{ display: "flex", justifyContent: "center", width: "50%" }}
          >
            <BidForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
