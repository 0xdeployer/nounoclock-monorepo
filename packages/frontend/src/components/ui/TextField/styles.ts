import { css } from "@emotion/react";
import { colors } from "../../../utils";

export const styles = {
  wrap: css({
    border: `1px solid ${colors.bravo}`,
    borderRadius: "30px",
    position: "relative",
    overflow: "hidden",
  }),
  input: css({
    width: "100%",
    height: "100%",
    padding: "10px 12px",
    border: "0",
    fontFamily: "Inter",
    borderRadius: "30px",
    fontSize: "16px",
    "&:focus": {
      outline: "none",
      border: `1px solid ${colors.alpha}`,
    },
  }),
};
