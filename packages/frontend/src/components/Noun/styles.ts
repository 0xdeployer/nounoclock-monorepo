import { css } from "@emotion/react";

export const styles = {
  headerWrap: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  }),
  wrap: css({
    flex: 1,
    maxWidth: "600px",
    alignSelf: "flex-start",
  }),
  img: css({
    width: "100%",
    height: "auto",
    borderRadius: "10px",
  }),
  timerWrap: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  }),
};
