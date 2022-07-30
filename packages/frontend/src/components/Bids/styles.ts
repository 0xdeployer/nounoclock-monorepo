import { css } from "@emotion/react";

export const styles = {
  bidItem: css({
    display: "flex",
    padding: "25px",
    boxSizing: "border-box",
    minHeight: "150px",

    alignItems: "center",
  }),
  bidsWrap: css({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    bottom: 0,
  }),
  bidItemInner: css({
    display: "flex",
    gap: "20px",
    alignItems: "center",
  }),
};
