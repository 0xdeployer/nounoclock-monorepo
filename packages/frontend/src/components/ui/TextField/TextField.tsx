import React from "react";
import { styles } from "./styles";

type TextFieldProps = {
  placeholder?: string;
  value?: string;
  error?: boolean;
  onChange?: any;
  className?: any;
};

export function TextField({
  placeholder,
  value,
  onChange,
  className,
}: TextFieldProps) {
  return (
    <div className={className} css={styles.wrap}>
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
