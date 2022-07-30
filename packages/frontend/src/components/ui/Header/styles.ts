import { css } from "@emotion/react";

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
};
