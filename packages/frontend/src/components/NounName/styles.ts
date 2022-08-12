import { css } from "@emotion/react";
import { mq, type } from "../../utils";

export const styles = {
  nounFont: css(
    mq({
      fontFamily: type.nouns,
      fontSize: ["", "24px"],
      WebkitFontSmoothing: "initial",
    })
  ),
};
