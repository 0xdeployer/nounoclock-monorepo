import { css } from "@emotion/react";
import React from "react";
import { styles } from "./styles";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  variant?: keyof typeof variants;
};

const variants = {
  bravo: styles.bravo,
};

export function Button({ children, onClick, disabled, variant }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      css={css(styles.wrap, variant ? variants[variant] : void 0)}
    >
      {children}
    </button>
  );
}
