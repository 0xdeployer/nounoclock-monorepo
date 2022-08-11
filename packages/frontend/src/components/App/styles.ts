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
  bidFormWrap: css({
    display: "flex",
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-start",
  }),
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
};
