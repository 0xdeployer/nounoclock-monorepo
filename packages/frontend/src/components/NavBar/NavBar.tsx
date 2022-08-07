import { format, intervalToDuration } from "date-fns";
import React, { useMemo } from "react";
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

export function NavBar() {
  const { matches } = useMq();
  const watchers = useAppStore((state) => state.watchers);
  return (
    <div css={css(generalWrapper, styles.wrap)}>
      <div css={css(appStyles.nounWrap, `border-right: 0`)}>
        <div css={styles.headerWrap}>
          <div css={styles.logoWrap}>
            <img css={styles.logo} src={logo} />
            {!matches["0"] && <NounName />}
          </div>
        </div>
      </div>
      <div css={styles.btnWrap}>
        {!matches["0"] && <Timer />}

        <div css={styles.watchers}>
          <img src={eyeImg} />
          {watchers}
        </div>
        <ConnectButton css={styles.btn} />
      </div>
    </div>
  );
}
