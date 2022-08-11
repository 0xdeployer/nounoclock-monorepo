import { css } from "@emotion/react";
import { colors, mq } from "../../utils";

const imgHeight = ["32px", "24px"];

export const styles = {
  wrap: css(
    mq({
      display: "flex",
      gap: ["20px", "5px"],
      justifyContent: ["", "space-between"],
      flexWrap: "wrap",
      userSelect: "none",
    })
  ),
  image: css(
    mq({
      height: imgHeight,
      borderRadius: imgHeight,
      padding: ["", "3px"],
      width: "auto",
    })
  ),
  imageWrap: css(
    mq({
      display: "flex",
      gap: ["10px", "2px"],
      alignItems: "center",
    })
  ),
  total: css({
    fontWeight: "bold",
    color: "rgba(0,0,0,.6)",
    fontSize: ["12px", "10px"],
  }),
};
