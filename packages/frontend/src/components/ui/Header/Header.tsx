import { css } from "@emotion/react";
import React from "react";
import { styles } from "./styles";

type Props = {
  type?: keyof typeof styles;
  children?: React.ReactNode;
  className?: any;
  variant?: keyof typeof variants;
};

const variants = {
  serif: styles.serif,
};

export function Header(props: Props) {
  const { variant, type = "h2", className, children } = props;
  return (
    <span
      className={className}
      css={css(styles[type], variant ? variants[variant] : void 0)}
    >
      {children}
    </span>
  );
}
