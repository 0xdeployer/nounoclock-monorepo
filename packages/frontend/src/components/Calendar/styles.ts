import { css } from "@emotion/react";
import { colors } from "../../utils";

const background =
  "linear-gradient(180deg, #3637FD -0.43%, #8057FC 50.5%, #9660FC 99.25%)";

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
  statusBarWrap: css({
    display: "flex",
    width: "6px",
    overflow: "hidden",
    position: "relative",
    minHeight: "250px",
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
};
