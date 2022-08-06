import React from "react";
import { useAppStore } from "../../stores";
import { Header } from "../ui";
import { styles } from "./styles";

export function NounName() {
  const auction = useAppStore((state) => state.auction);

  return (
    <div>
      <Header type="h1" css={styles.nounFont}>
        {auction?.metadata.name}
      </Header>
    </div>
  );
}
