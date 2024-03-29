import { css } from "@emotion/react";
import { colors, mq, type } from "../../utils";

export const styles = {
  wrap: css(
    mq({
      width: "100%",
      display: "flex",
      gap: "10px",
      flexDirection: ["column"],
      padding: ["12px", "8px"],
    })
  ),
  btn: css({ display: "inline-flex", width: "auto" }),
  priceInput: css(mq({ width: ["25.95419847%", "100%"] })),
  noteInput: css(mq({ width: ["100%"] })),
};
