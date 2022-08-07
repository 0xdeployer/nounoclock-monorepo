import { css } from "@emotion/react";
import { colors, mq } from "../../utils";
import { styles as appStyles } from "../App/";
import { type } from "../../utils/type";

export const styles = {
  wrap: css(
    mq({
      background: colors.charlie,
      display: "flex",
      justifyContent: "space-between",
      position: "sticky",
      maxWidth: "none",
      borderBottom: `1px solid ${colors.jaguar}`,
      zIndex: 100,
      top: 0,
    })
  ),
  logo: css({
    width: "30px",
  }),
  timerWrap: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  }),
  headerWrap: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  }),
  btnWrap: css({ display: "flex", alignItem: "center", gap: "40px", flex: 1 }),
  logoWrap: css({ display: "flex", alignItems: "center", gap: "10px" }),
  watchers: css({
    justifyContent: "space-around",
    display: "flex",
    color: "white",
    background: colors.golf,
    alignSelf: "center",
    padding: "3px",
    borderRadius: "3px",
    fontSize: "11px",
    minWidth: "40px",
  }),
  btn: css({
    display: "inline-flex",
    width: "auto",
  }),
};
