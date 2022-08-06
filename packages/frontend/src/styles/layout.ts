import { css } from "@emotion/react";
import { mq } from "../utils";

export const generalWrapper = css(
  mq({
    padding: ["25px", "10px"],
    position: "relative",
    maxWidth: ["1600px", "500px"],
    margin: "auto",
  })
);
