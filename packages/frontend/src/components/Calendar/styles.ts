import { css } from "@emotion/react";
import { colors, mq } from "../../utils";

const background =
  "linear-gradient(180deg, #3637FD -0.43%, #8057FC 50.5%, #9660FC 99.25%)";

const twitterButton = css(
  mq({
    background: "#09A1F8",
    borderRadius: "25px",
    padding: ["10px 25px", "5px 20px"],
    display: "inline-flex",
    textDecoration: "none",
    gap: "5px",
    marginTop: ["8px", "0"],
    color: "white",
    fontSize: ["12px", "11px"],
  })
);

export const styles = {
  innerStatusBar: css({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    flex: 1,
    background,
  }),
  description: css(
    mq({
      fontSize: ["", "12px"],
    })
  ),
  statusBarWrap: css({
    display: "flex",
    width: "6px",
    overflow: "hidden",
    position: "relative",
    height: "250px",
    borderRadius: "5px",
    background: colors.fargo,
  }),
  calendarWrap: css({ position: "relative" }),
  circle: css({
    width: "10px",
    height: "10px",
    marginRight: "10px",
    borderRadius: "5px",
    background: "#FFF",
    border: "1px solid rgba(128, 87, 252, 1)",
    position: "relative",
    transform: "translateX(calc(-50% + 3px))",
  }),
  wrap: css({
    flex: "1",
    marginTop: "10px",
    paddingLeft: "5px",
  }),
  tag: css(
    mq({
      background: [background, "#b9b9b9"],
      color: "white",
      display: "inline-block",
      borderRadius: "3px",
      fontSize: "12px",
      fontWeight: "500",
      padding: "3px 10px",
      marginBottom: "3px",
    })
  ),
  title: css(
    mq({
      fontWeight: "bold",
      marginBottom: ["8px", "5px"],
      fontSize: ["", "12px"],
    })
  ),
  twitterButton,
  playBtn: css(twitterButton, {
    background,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  }),
};
