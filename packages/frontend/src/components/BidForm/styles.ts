import { css } from "@emotion/react";

export const styles = {
  wrap: css({
    width: "100%",
    maxWidth: "400px",
    "& > *": {
      marginBottom: "10px",
    },
  }),
};
