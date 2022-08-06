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
import { textGolf } from "../../styles/text";
import { NounName } from "../NounName";
import { useMq } from "../../utils";
import { Timer } from "../Timer";
import eyeImg from "./eye.svg";

export function NavBar() {
  const { matches } = useMq();
  const watchers = useAppStore((state) => state.watchers);
  return (
    <div css={styles.wrap}>
      <div css={appStyles.nounWrap}>
        <div css={styles.headerWrap}>
          <div css={styles.logoWrap}>
            <img css={styles.logo} src={logo} />
            {!matches["0"] && <NounName />}
          </div>

          {!matches["0"] && <Timer />}
        </div>
      </div>
      <div css={styles.btnWrap}>
        <div css={styles.watchers}>
          <img src={eyeImg} />
          {watchers}
        </div>
        <ConnectButton />
      </div>
    </div>
  );
}
