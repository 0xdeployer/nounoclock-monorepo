import { css } from "@emotion/react";
import { colors } from "../../utils";

export const styles = {
  wrap: css({
    background: colors.charlie,
    padding: "20px",
    borderBottom: `1px solid ${colors.delta}`,
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    zIndex: 100,
    top: 0,
  }),
  logo: css({
    width: "30px",
  }),
};
