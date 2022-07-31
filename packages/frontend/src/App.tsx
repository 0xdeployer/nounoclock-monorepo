import { css } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Noun } from "./components/Noun";
import logo from "./logo.svg";
import { Bids } from "./components/Bids";
import { useConnectWs } from "./hooks/useConnectWs";
import { useAppStore } from "./stores";

const socket = io("ws://localhost:3333");

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
        <div style={{ flex: 1 }}>
          <Bids
            nounContainer={nounContainerRef}
            currentBidValue={currentAuction.auction.amount}
            bids={currentAuction?.bids}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
