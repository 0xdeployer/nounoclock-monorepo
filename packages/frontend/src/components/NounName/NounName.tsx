import React from "react";
import { useAppStore } from "../../stores";
import { Header } from "../ui";
import { styles } from "./styles";

export function NounName() {
  const auction = useAppStore((state) => state.auction);

  return (
    <div css={styles.wrap}>
      <Header type="h1" css={styles.nounFont}>
        {auction?.metadata.name}
      </Header>
      <span css={styles.internalPreview}>Internal preview</span>
    </div>
  );
}
