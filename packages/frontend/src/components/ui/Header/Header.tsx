import React from "react";
import { styles } from "./styles";

type Props = {
  type?: keyof typeof styles;
  children?: React.ReactNode;
};

export function Header(props: Props) {
  const { type = "h2", children } = props;
  return <span css={styles[type]}>{children}</span>;
}
