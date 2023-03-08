import { css, Global } from "@emotion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { Noun } from "../Noun";
import { Bids } from "../Bids";
import { useConnectWs } from "../../hooks/useConnectWs";
import { useAppStore } from "../../stores";
import { BidForm } from "../BidForm";
import { NavBar } from "../NavBar";
import { Calendar } from "../Calendar";
import { iframe, iframeContainer, styles } from "./styles";
import { colors, socket, useMq } from "../../utils";
import { generalWrapper } from "../../styles/layout";
import { NounName } from "../NounName";
import { Timer } from "../Timer";
import { NocCountDown } from "../NocCountdown";
import { Button } from "../ui/Button";
import loadingNoun from "../../loading-noun.gif";
import Chat from "../Chat/Chat";
import Toggle from "../Toggle/Toggle";

const backgrounds = ["#EAECF6", "#F5EBE9"];
// Matches noun BG exactly
const mobileBg = ["#d5d7e1", "#e1d7d5"];

function App() {
  useConnectWs(socket);
  const [showBidModal, updateShowBidModal] = useState(false);
  const nounContainerRef = useRef<HTMLDivElement>(null);
  const getAuctionData = useAppStore((state) => state.getAuctionData);
  const getInitialChats = useAppStore((state) => state.getInitialChats);
  const endTime = useAppStore((store) => store.endTime);
  const { matches } = useMq();

  useEffect(() => {
    getAuctionData();
    getInitialChats();
  }, []);

  useEffect(() => {
    updateShowBidModal(false);
    updateSwitchState("auction");
  }, [matches["0"], updateShowBidModal]);

  const currentAuction = useAppStore((state) => state.auction);
  const isMobile = matches["0"];
  const backgroundStyles = useMemo(() => {
    return isMobile
      ? {
          borderBottom: "0",
          background: currentAuction
            ? mobileBg[currentAuction.background]
            : "#FFF",
        }
      : void 0;
  }, [isMobile, currentAuction]);

  const [switchState, updateSwitchState] = useState("auction");

  if (!currentAuction) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img alt="Loading" src={loadingNoun} />
      </div>
    );
  }

  return (
    <>
      <Global
        styles={css`
          body {
            @media (min-width: 800px) {
              height: 100vh;
              overflow: hidden;
            }

            background: ${currentAuction
              ? backgrounds[currentAuction.background]
              : "#FFF"};
          }
        `}
      />
      <NavBar style={backgroundStyles} />
      <div style={backgroundStyles} css={styles.appWrap}>
        {isMobile && (
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Toggle
              value={switchState}
              onClick={(value: string) => updateSwitchState(value)}
            />
          </div>
        )}
        <div css={styles.content}>
          <div
            style={backgroundStyles}
            css={css(styles.nounWrap, styles.nounWrapExtra)}
          >
            <Noun
              key={endTime}
              container={nounContainerRef}
              data={currentAuction}
            />
            {matches["0"] && (
              <div css={styles.info}>
                {!matches["0"] && (
                  <div>
                    {" "}
                    <Timer />
                  </div>
                )}
                <div css={matches["0"] ? styles.countDown : void 0}>
                  <NocCountDown
                    background={currentAuction.background}
                    simple={matches["0"]}
                  />
                </div>
              </div>
            )}
            {!matches["0"] && (
              <div css={iframeContainer}>
                <iframe
                  css={iframe}
                  src="https://www.youtube-nocookie.com/embed/oa79nN4gMPs"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
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
            {switchState === "auction" && (
              <>
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
              </>
            )}

            {switchState === "chat" && <Chat key={matches[0].toString()} />}

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
          {!isMobile && (
            <div
              css={css`
                width: 30%;
                border-left: 1px solid ${colors.jaguar};
                padding: 10px;
              `}
            >
              <Chat />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
