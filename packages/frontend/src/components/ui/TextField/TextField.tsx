import React from "react";
import { styles } from "./styles";

type TextFieldProps = {
  placeholder?: string;
  value?: string;
  error?: boolean;
  onChange?: any;
};

export function TextField({ placeholder, value, onChange }: TextFieldProps) {
  return (
    <div css={styles.wrap}>
      <input
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        css={styles.input}
        type="text"
      />
    </div>
  );
}
