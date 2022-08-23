import { css } from "@emotion/react";
import { mq } from "../../utils";

export const styles = {
  wrap: css(
    mq({
      flex: 1,
      display: "flex",
      alignItems: "flex-end",
      alignSelf: "flex-start",
      width: ["", "60%"],
      maxWidth: ["", "128px"],
    })
  ),
  img: css({
    width: "100%",
    height: "auto",
    borderRadius: "4px",
  }),
};
