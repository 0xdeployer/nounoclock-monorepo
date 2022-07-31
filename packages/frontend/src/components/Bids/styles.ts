import { css } from "@emotion/react";

export const styles = {
  bidItem: css({
    display: "flex",
    padding: "25px",
    boxSizing: "border-box",
    minHeight: "150px",
    alignItems: "center",
  }),
  bidsWrap: css({
    transition: "opacity 200ms",
  }),
  bidItemInner: css({
    display: "flex",
    gap: "20px",
    alignItems: "center",
  }),

  bidItemAvatarWrap: css({
    display: "flex",
    alignItems: "center",
  }),
  bidItemAvatar: css({
    marginRight: "5px",
  }),
  infoWrap: css({
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }),
  prevBidsWrap: css({
    transform: "translateY(-150px)",
  }),
};
