import { css } from "@emotion/react";
import { colors, mq } from "../../utils";

const bidItemPadding = ["12px", "8px"];

export const styles = {
  infoText: css(
    mq({
      fontSize: ["12px", "11px"],
      opacity: [0.3],
    })
  ),
  bidItem: css(
    mq({
      display: "flex",
      padding: bidItemPadding,
      paddingBottom: "0",
      boxSizing: "border-box",
      height: ["150px", "150px"],
      justifyContent: ["", "center"],
      alignItems: "center",
      flexDirection: "column",
      minWidth: "300px",
    })
  ),
  bidItemScaled: css({ height: ["100px"] }),
  price: css(
    mq({
      fontSize: ["18px", "14px"],
      whiteSpace: "nowrap",
    })
  ),
  note: css(
    mq({
      fontSize: ["", "16px"],
    })
  ),
  noteScaled: css({
    fontSize: "16px",
  }),
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
      overflowY: "scroll",
      backgroundColor: colors.igloo,
      borderBottom: `1px solid ${colors.jaguar}`,
      paddingBottom: ["12px", "50px"],
      height: ["calc(100vh - 242px)", "calc(100vh - 217px)"],
    })
  ),
  bidItemInner: css(
    mq({
      display: "flex",
      gap: ["", "10px"],
      flexDirection: ["row", "column"],
      alignItems: ["center", "flex-start"],
      background: colors.charlie,
      borderRadius: "4px",
      border: `1px solid ${colors.jaguar}`,
      width: "100%",
      height: "100%",
      flex: 1,
      padding: ["10px 40px", "8px"],
      transition: ".3s background",
      minWidth: "350px",
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
  info: css(
    mq({
      display: "flex",
      flex: 1,
      flexDirection: "column",
      gap: ["10px", "5px"],
      width: ["", "100%"],
    })
  ),
  nogglesWrap: css({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "& img": {
      width: "126px",
    },
    "& span": {
      fontSize: "20px",
      marginTop: "20px",
      color: colors.kangaroo,
    },
  }),

  priceWrap: css(
    mq({
      display: "flex",
      flexDirection: ["column", "row"],
      alignItems: ["", "baseline"],
      gap: ["", "10px"],
      width: ["150px", "100%"],
    })
  ),
  priceWrapScale: css({
    fontSize: "14px",
  }),
};
