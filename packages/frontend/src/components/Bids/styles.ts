import { css } from "@emotion/react";
import { colors, mq } from "../../utils";

const height = ["calc(100vh - 242px)", "auto"];
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
      height: ["150px", "90px"],
      alignItems: "center",
      flexDirection: "column",
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
      fontSize: ["", "20px"],
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
      overflowY: ["scroll", "visible"],

      backgroundColor: colors.igloo,
      borderBottom: `1px solid ${colors.jaguar}`,
      paddingBottom: bidItemPadding,
      height,
    })
  ),
  bidItemInner: css(
    mq({
      display: "flex",
      gap: ["", "12px"],
      alignItems: "center",
      background: colors.charlie,
      borderRadius: "4px",
      border: `1px solid ${colors.jaguar}`,
      width: "100%",
      height: "100%",
      flex: 1,
      padding: ["10px 40px"],
      transition: ".3s background",
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
    flex: 1,
    flexDirection: "column",
    gap: "10px",
  }),
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

  priceWrap: css({
    display: "flex",
    flexDirection: "column",
    width: "150px",
  }),
  priceWrapScale: css({
    fontSize: "14px",
  }),
};
