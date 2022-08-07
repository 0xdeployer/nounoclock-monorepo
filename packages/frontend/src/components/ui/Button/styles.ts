import { css } from "@emotion/react";
import { colors } from "../../../utils";

export const styles = {
  wrap: css({
    padding: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter",
    fontWeight: "500",
    color: colors.charlie,
    background: colors.alpha,
    border: "0",
    borderRadius: "3px",
    fontSize: "16px",
    width: "100%;",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    whiteSpace: "nowrap",
    "&:disabled": {
      background: colors.echo,
    },
  }),
  bravo: css({
    color: colors.alpha,
    background: colors.charlie,
    borderColor: colors.alpha,
  }),
};
