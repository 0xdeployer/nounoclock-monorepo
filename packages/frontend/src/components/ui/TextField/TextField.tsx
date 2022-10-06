import { css } from "@emotion/react";
import React from "react";
import { styles } from "./styles";

type TextFieldProps = {
  placeholder?: string;
  value?: string;
  error?: boolean;
  onChange?: any;
  className?: any;
  rightIcon?: React.ReactNode;
};

export function TextField({
  placeholder,
  value,
  onChange,
  className,
  rightIcon,
}: TextFieldProps) {
  return (
    <div className={className} css={styles.wrap}>
      <input
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        css={styles.input}
        style={rightIcon ? { paddingRight: "20px" } : void 0}
        type="text"
      />
      {rightIcon}
    </div>
  );
}
