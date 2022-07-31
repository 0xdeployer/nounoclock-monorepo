import { css } from "@emotion/react";

export const styles = {
  wrap: css({
    display: "flex",
    gap: "20px",
    userSelect: "none",
  }),
  image: css({
    height: "24px",
    width: "auto",
  }),
  imageWrap: css({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  }),
  total: css({
    fontWeight: "bold",
    color: "rgba(0,0,0,.6)",
    fontSize: "12px",
  }),
};
