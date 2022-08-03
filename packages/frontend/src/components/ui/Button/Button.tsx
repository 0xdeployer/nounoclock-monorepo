import React from "react";
import { styles } from "./styles";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({ children, onClick, disabled }: Props) {
  return (
    <button disabled={disabled} onClick={onClick} css={styles.wrap}>
      {children}
    </button>
  );
}
