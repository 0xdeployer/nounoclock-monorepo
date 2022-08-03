import React from "react";
import { styles } from "./styles";

type TextFieldProps = {
  placeholder?: string;
  value?: string;
  error?: boolean;
};

export function TextField({ placeholder, value }: TextFieldProps) {
  return (
    <div css={styles.wrap}>
      <input
        placeholder={placeholder}
        value={value}
        css={styles.input}
        type="text"
      />
    </div>
  );
}
