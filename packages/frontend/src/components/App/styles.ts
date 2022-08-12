import { css } from "@emotion/react";
import { generalWrapper, padding } from "../../styles/layout";
import { colors, mq, type } from "../../utils";

export const styles = {
  appWrap: css(
    generalWrapper,
    mq({
      padding: ["12px", "0"],
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
    })
  ),
  content: css(
    mq({
      flexDirection: ["row", "column"],
      display: "flex",
    })
  ),
  bidFormWrap: css(
    mq({
      display: "flex",
      justifyContent: "center",
      flexDirection: ["row", "column"],
      flex: 1,
      alignItems: "flex-start",
    })
  ),
  // Applies to noun image container and noun name in nav bar
  nounWrap: css(
    mq({
      width: ["32%", "100%"],
      display: ["", "flex"],
      gap: ["", "9px"],
      paddingRight: ["12px", "8px"],
    })
  ),
  // Apply only to noun image container
  nounWrapExtra: css(
    mq({
      borderRight: [`1px solid ${colors.jaguar}`, ""],
      paddingBottom: ["100px", "0"],
      paddingTop: ["12px", "0"],
      padding: ["", "0"],
      borderBottom: ["", `1px solid ${colors.jaguar}`],
    })
  ),
  mono: css(
    mq({
      textAlign: "center",
      fontFamily: type.mono,
      padding: ["12px", "8px"],
      color: colors.lambo,
      fontSize: "11px",
      "& a": {
        color: "inherit",
      },
    })
  ),
  bidModal: css({
    position: "fixed",
    width: "calc(100% - 20px)",
    borderRadius: "4px",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxSizing: "border-box",

    background: "white",
    zIndex: 10000,
  }),
  bidModalBg: css({
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    content: "' '",
    left: 0,
    zIndex: 9999,
    background: "rgba(0,0,0,0.25)",
  }),
  mobilePlaceBidBtn: css({
    padding: "10px 8px",
    position: "fixed",
    width: "100%",
    background: "white",
    bottom: 0,
    left: 0,
  }),
};
