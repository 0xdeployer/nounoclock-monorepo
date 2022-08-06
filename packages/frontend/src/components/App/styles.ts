import { css } from "@emotion/react";
import { mq } from "../../utils";

export const styles = {
  wrap: css({
    padding: "25px 50px 25px 100px",
    position: "relative",
    maxWidth: "1600px",
    margin: "auto",
  }),
  content: css(
    mq({
      flexDirection: ["row", "column"],
      display: "flex",
      gap: "30px",
      marginTop: ["25px", "10px"],
    })
  ),

  gradient: css({
    background:
      "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0) 50%)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
  }),
  bidFormWrap: css({
    display: "flex",
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-start",
    paddingTop: "50px",
  }),
  nounWrap: css(
    mq({
      width: ["32%", "100%"],
      display: ["", "flex"],
      gap: ["", "9px"],
    })
  ),
};
