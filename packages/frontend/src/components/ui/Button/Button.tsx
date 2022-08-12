import { css } from "@emotion/react";
import React from "react";
import { styles } from "./styles";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (evt: any) => void;
  variant?: keyof typeof variants;
  className?: any;
};

const variants = {
  bravo: styles.bravo,
};

export function Button({
  children,
  onClick,
  disabled,
  variant,
  className,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className}
      css={css(styles.wrap, variant ? variants[variant] : void 0)}
    >
      {children}
    </button>
  );
}
