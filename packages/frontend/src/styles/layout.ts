import { css } from "@emotion/react";
import { colors, mq } from "../utils";

export const padding = ["25px", "10px"];

export const generalWrapper = css(
  mq({
    padding,
    position: "relative",
    maxWidth: ["1600px", "500px"],
    margin: "auto",
    background: colors.charlie,
  })
);
