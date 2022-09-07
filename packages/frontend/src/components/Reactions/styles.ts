import { css } from "@emotion/react";
import { colors, mq } from "../../utils";

const imgHeight = ["18px", "18px"];

export const styles = {
  wrap: css(
    mq({
      display: "flex",
      gap: ["5px", "5px"],
      justifyContent: ["", ""],
      flexWrap: "wrap",
      userSelect: "none",
    })
  ),
  image: css(
    mq({
      minWidth: "18px",
      minHeight: "18px",
      height: imgHeight,
      width: "auto",
    })
  ),
  smiley: css(
    mq({
      height: "16px",
      width: "auto",
    })
  ),
  imageWrap: css(
    mq({
      display: "flex",
      position: "relative",
      alignItems: "center",
      cursor: "pointer",
      background: colors.jaguar,
      borderRadius: ["7px", "3px"],
      boxSizing: ["content-box", "border-box"],
      padding: ["3px 4px"],
      "&:hover": {
        background: colors.mango,
      },
      "&:active": {
        background: "#F5F5F5",
      },
    })
  ),
  total: css(
    mq({
      fontWeight: "bold",
      color: "rgba(0,0,0,.6)",
      fontSize: "10px",
      minWidth: "20px",
      textAlign: "center",
    })
  ),
};
