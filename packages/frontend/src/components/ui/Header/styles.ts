import { css } from "@emotion/react";
import { type } from "../../../utils/type";

const base = css({
  fontWeight: "bold",
});

export const styles = {
  h1: css(base, {
    fontSize: "32px",
  }),
  h2: css(base, {
    fontSize: "24px",
  }),
  h3: css(base, {
    fontSize: "18px",
  }),
  serif: css(base, {
    fontFamily: type.serif,
  }),
};
