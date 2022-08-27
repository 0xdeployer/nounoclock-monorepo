import { css } from "@emotion/react";
import { colors, mq } from "../../utils";
import { styles as appStyles } from "../App/";
import { type } from "../../utils/type";

const mobileMenu = css({
  width: "100%",
  height: "100%",
  transition: "all 0.3s",
  opacity: 0,
  transform: "translateY(10px)",
  pointerEvents: "none",
  position: "fixed",
  zIndex: 1000,
  background: colors.charlie,
  display: "flex",
  padding: "10px",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "35px",
});

const close = css({
  width: "25px",
  height: "25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "25px",
  position: "absolute",
  right: "10px",
  top: "10px",
  background: "rgba(0,0,0,55%)",
  color: colors.charlie,
  lineHeight: 0,
  fontSize: "14px",
  fontFamily: "Comic Sans MS",
});

export const styles = {
  mobileMenu,
  close,
  wrap: css(
    mq({
      background: colors.charlie,
      position: "sticky",
      top: 0,
      display: "flex",
      justifyContent: "space-between",
      maxWidth: "none",
      borderBottom: `1px solid ${colors.jaguar}`,
      zIndex: 100,
      padding: "10px 25px",
    })
  ),
  hamburger: css({
    width: "22px",
  }),
  logo: css(
    mq({
      width: ["25px", "20px"],
    })
  ),
  timerWrap: css(
    mq({
      display: "flex",
      flexDirection: "column",
      alignItems: ["flex-end", "center"],
    })
  ),
  headerWrap: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  }),
  btnWrap: css(
    mq({
      display: "flex",
      alignItem: "center",
      gap: ["40px", "10px"],
      flex: [1, 2],
    })
  ),
  logoWrap: css({ display: "flex", alignItems: "center", gap: "10px" }),
  watchers: css({
    justifyContent: "space-around",
    display: "flex",
    color: "white",
    background: colors.golf,
    alignSelf: "center",
    padding: "3px",
    borderRadius: "3px",
    fontSize: "12px",
    fontWeight: "600",
    minWidth: "40px",
  }),
  btn: css(
    mq({
      display: "inline-flex",
      width: "auto",
      fontSize: "12px",
      fontWeight: "600",
      padding: ["", "10px"],
      alignSelf: ["", "flex-start"],
    })
  ),
};
