import { css } from "@emotion/react";
import { mq } from "../../../utils";

const size = ["32px", "18px"];

export const styles = {
  wrap: css(
    mq({
      width: size,
      height: size,
      borderRadius: size,
      overflow: "hidden",
      backgroundColor: "#eee",
    })
  ),
  img: css({
    width: "100%",
    height: "auto",
    objectFit: "cover",
  }),
};
