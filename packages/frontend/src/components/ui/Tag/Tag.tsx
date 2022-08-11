import { css } from "@emotion/react";
import React from "react";

const styles = {
  base: css({
    borderRadius: ["4px", "2px"],
    padding: ["2px 4px", "1px 2px"],
    gap: "5px",
    alignItems: "center",
    justifyContent: "center",
    fontSize: ["11px", "10px"],
    textTransform: "uppercase",
    display: "inline-flex",
    WebkitFontSmoothing: "subpixel-antialiased",
    alignSelf: "baseline",
  }),
  gold: css({
    color: "#E1A900",
    background: "rgba(255, 199, 0, 0.3)",
  }),
  gray: css({
    color: "#a0a0a0",
    background: "#f2f2f2",
  }),
};

type TagProps = {
  children: React.ReactNode;
  variant?: "gold" | "gray";
};

export function Tag({ children, variant = "gold" }: TagProps) {
  return <div css={css(styles.base, styles[variant])}>{children}</div>;
}
