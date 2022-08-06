import { css } from "@emotion/react";
import { mq } from "../../utils";

const height = ["500px", "auto"];

export const styles = {
  infoText: css(
    mq({
      fontSize: ["", "11px"],
      opacity: ["", 0.3],
    })
  ),
  bidItem: css(
    mq({
      display: "flex",
      padding: ["25px", "8px"],
      boxSizing: "border-box",
      minHeight: ["150px", "90px"],
      alignItems: "center",
    })
  ),
  price: css(
    mq({
      fontSize: ["", "14px"],
      whiteSpace: "nowrap",
      flex: 1,
    })
  ),
  note: css(
    mq({
      fontSize: ["", "20px"],
    })
  ),
  track: css(
    mq({
      position: "relative",
      minHeight: "100%",
    })
  ),
  bidsWrap: css(
    mq({
      position: "relative",
      willChange: "transform",
      overflowY: ["scroll", "visible"],
      paddingTop: ["100px", 0],
      height,
    })
  ),
  bidItemInner: css(
    mq({
      display: "flex",
      gap: ["20px", "12px"],
      alignItems: "center",
    })
  ),

  bidItemAvatarWrap: css({
    display: "flex",
    alignItems: "center",
  }),
  bidItemAvatar: css({
    marginRight: "5px",
  }),
  social: css(
    mq({
      display: "flex",
      alignItems: "center",
      gap: ["10px", "6px"],
    })
  ),
  prevBidsWrap: css({
    transform: "translateY(-150px)",
  }),
  info: css({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }),
  emptyWrap: css(
    mq({
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: ["", "25px"],
      height,
    })
  ),
};
