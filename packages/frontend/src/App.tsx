import { css } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Noun } from "./components/Noun";
import logo from "./logo.svg";
import { Bids } from "./components/Bids";
import { useConnectWs } from "./hooks/useConnectWs";
import { useAppStore } from "./stores";

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
  logo: css({
    width: "50px",
    position: "absolute",
    left: "25px",
    transform: "translateY(-10px)",
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
};

function App() {
  useConnectWs(socket);
  const nounContainerRef = useRef<HTMLDivElement>(null);
  const getAuctionData = useAppStore((state) => state.getAuctionData);
  useEffect(() => {
    getAuctionData();
  }, []);

  const currentAuction = useAppStore((state) => state.auction);

  if (!currentAuction) {
    return <>LOADING</>;
  }

  return (
    <div css={styles.wrap}>
      <img css={styles.logo} src={logo} />
      <div css={styles.content}>
        <Noun container={nounContainerRef} data={currentAuction} />
        <div style={{ flex: 1, position: "relative" }}>
          <Bids
            nounContainer={nounContainerRef}
            currentBidValue={currentAuction.auction.amount}
            bids={currentAuction?.bids}
          />
          <div css={styles.gradient} />
        </div>
      </div>
    </div>
  );
}

export default App;
