import { css } from "@emotion/react";
import React from "react";
import { styles } from "./styles";

type Props = {
  type?: keyof typeof styles;
  children?: React.ReactNode;
  className?: any;
  variant?: keyof typeof variants;
  onClick?: any;
};

const variants = {
  serif: styles.serif,
};

export function Header(props: Props) {
  const { onClick, variant, type = "h2", className, children } = props;
  return (
    <span
      onClick={onClick}
      className={className}
      css={css(styles[type], variant ? variants[variant] : void 0)}
    >
      {children}
    </span>
  );
}
