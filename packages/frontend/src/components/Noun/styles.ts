import { css } from "@emotion/react";
import { mq } from "../../utils";

export const styles = {
  wrap: css(
    mq({
      flex: 1,
      alignSelf: "flex-start",
      width: ["", "60%"],
    })
  ),
  img: css({
    width: "100%",
    height: "auto",
    borderRadius: "4px",
  }),
};
