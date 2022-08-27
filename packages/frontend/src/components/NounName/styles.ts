import { css } from "@emotion/react";
import { colors, mq, type } from "../../utils";

export const styles = {
  internalPreview: css({
    fontSize: "12px",
    color: colors.lambo,
  }),
  wrap: css({
    display: "flex",
    flexDirection: "column",
  }),
  nounFont: css(
    mq({
      fontFamily: type.nouns,
      fontSize: ["20px", "18px"],
      WebkitFontSmoothing: "initial",
    })
  ),
};
