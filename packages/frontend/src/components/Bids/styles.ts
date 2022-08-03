import { css } from "@emotion/react";

export const styles = {
  bidItem: css({
    display: "flex",
    padding: "25px",
    boxSizing: "border-box",
    minHeight: "150px",
    alignItems: "center",
  }),
  track: css({
    position: "relative",
    minHeight: "100%",
  }),
  bidsWrap: css({
    transition: "opacity 0.3s",
    // transitionDelay: "100ms",
    position: "relative",
    willChange: "transform",
    overflowY: "scroll",
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
  social: css({
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }),
  prevBidsWrap: css({
    transform: "translateY(-150px)",
  }),
  info: css({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }),
};
