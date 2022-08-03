import { css } from "@emotion/react";
import { colors } from "../../../utils";

export const styles = {
  wrap: css({
    border: `1px solid ${colors.bravo}`,
    borderRadius: "3px",
    overflow: "hidden",
  }),
  input: css({
    width: "100%",
    height: "100%",
    padding: "10px",
    border: "0",
    fontFamily: "Inter",
    fontSize: "16px",
    "&:focus": {
      outline: "none",
    },
  }),
};
