import { css } from "@emotion/react";

const size = "32px";

export const styles = {
  wrap: css({
    width: size,
    height: size,
    borderRadius: size,
    overflow: "hidden",
    backgroundColor: "#eee",
  }),
  img: css({
    width: "100%",
    height: "auto",
    objectFit: "contain",
  }),
};
