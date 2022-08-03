import React from "react";
import logo from "../../logo.svg";
import { ConnectButton } from "../ConnectButton";
import { Button } from "../ui/Button";
import { styles } from "./styles";

export function NavBar() {
  return (
    <div css={styles.wrap}>
      <img css={styles.logo} src={logo} />
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}
