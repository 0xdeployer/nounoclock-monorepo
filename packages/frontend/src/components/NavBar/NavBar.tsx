import { format, intervalToDuration } from "date-fns";
import React, { useMemo, useState } from "react";
import { useAuctionCountdown } from "../../hooks";
import logo from "../../logo.svg";
import { useAppStore } from "../../stores";
import { ConnectButton } from "../ConnectButton";
import { Header } from "../ui";
import { Button } from "../ui/Button";
import { styles } from "./styles";
import { styles as appStyles } from "../App/styles";
import { NounName } from "../NounName";
import { useMq } from "../../utils";
import eyeImg from "./eye.svg";
import { css } from "@emotion/react";
import { generalWrapper } from "../../styles/layout";
import { Timer } from "../Timer";
import hamburgerSvg from "../../hamburger.svg";

export function NavBar({ style }: { style?: any }) {
  const { matches } = useMq();
  const [mobileMenuOpen, updateMobileMenuOpen] = useState(false);
  const watchers = useAppStore((state) => state.watchers);
  return (
    <>
      {matches["0"] && (
        <div
          style={
            mobileMenuOpen
              ? {
                  pointerEvents: "all",
                  opacity: 1,
                  transform: "translateY(0)",
                }
              : void 0
          }
          css={styles.mobileMenu}
        >
          <div onClick={() => updateMobileMenuOpen(false)} css={styles.close}>
            X
          </div>
          <ConnectButton css={styles.btn} />
        </div>
      )}
      <div style={style} css={css(generalWrapper, styles.wrap)}>
        <div css={css(appStyles.nounWrap, `border-right: 0`)}>
          <div css={styles.logoWrap}>
            <img css={styles.logo} src={logo} alt="" />
            <NounName />
          </div>
        </div>
        <div css={styles.btnWrap}>
          <Timer simple={matches["0"]} />

          <div css={styles.watchers}>
            <img src={eyeImg} alt="" />
            {watchers}
          </div>
          {matches["0"] && (
            <img
              onClick={() => updateMobileMenuOpen(!mobileMenuOpen)}
              css={styles.hamburger}
              src={hamburgerSvg}
              alt=""
            />
          )}
          {!matches["0"] && <ConnectButton css={styles.btn} />}
        </div>
      </div>
    </>
  );
}
