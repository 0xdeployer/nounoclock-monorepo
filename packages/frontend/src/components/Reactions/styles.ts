import { css } from "@emotion/react";
import { colors, mq } from "../../utils";

const imgHeight = ["34px", "32px"];

export const styles = {
  wrap: css(
    mq({
      display: "flex",
      gap: ["20px", "10px"],
      marginTop: ["", "25px"],
      justifyContent: ["", "space-between"],
      flexWrap: "wrap",
      userSelect: "none",
    })
  ),
  image: css(
    mq({
      height: imgHeight,
      border: ["", `1px solid ${colors.hotel}`],
      borderRadius: imgHeight,
      padding: ["", "3px"],
      width: "auto",
    })
  ),
  imageWrap: css(
    mq({
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexDirection: ["", "column-reverse"],
    })
  ),
  total: css({
    fontWeight: "bold",
    color: "rgba(0,0,0,.6)",
    fontSize: "12px",
  }),
};
