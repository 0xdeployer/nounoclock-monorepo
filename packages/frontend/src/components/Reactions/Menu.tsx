import { css } from "@emotion/react";
import React, { useRef, useState } from "react";
import { colors, mq } from "../../utils";
import { styles } from "./styles";
import reactionsJson from "reactions/src/reactions.json";
import emojis from "./emojis.json";
import { images } from "./Reactions";
import { useAppStore } from "../../stores";
import { CategoriesNav } from "./CategoriesNav";

const wrap = css({
  width: "100%",
  maxWidth: "300px",
  minWidth: "275px",
  height: "300px",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 2000,
  borderRadius: "4px",
  background: colors.charlie,
  border: `1px solid ${colors.jaguar}`,
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
  transition: "opacity 0.23s",
  padding: "10px",
  paddingBottom: 0,
  display: "flex",
  flexDirection: "column",
});

const imgCss = css({
  width: "auto",
  height: "24px",
  borderRadius: 0,
});

const imageWrap = css({
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: "7px",
  boxSizing: "content-box",
  padding: "3px 4px",
  "&:hover": {
    background: colors.mango,
  },
  "&:active": {
    background: "#F5F5F5",
  },
  background: "none",
  width: "24px",
  height: "auto",
});

const emojiWrap = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  overflow: "scroll",
  gap: "8px",
  marginTop: "10px",
  paddingBottom: "10px",
});

type ReactionMenuBidId = {
  onClick?: () => any;
  bidId?: string;
  resetBidId: () => void;
};

export function ReactionMenu({
  onClick,
  bidId,
  resetBidId,
}: ReactionMenuBidId) {
  const [visible, updateVisible] = React.useState(false);
  const { react, nounId } = useAppStore((state) => ({
    react: state.react,
    nounId: state.auction?.auction?.nounId,
  }));
  const [coordinates, updateCoords] = React.useState({ left: 0, top: 0 });
  const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    updateVisible(false);
    if (bidId) {
      let node = document.querySelector(`[data-reaction="${bidId}"]`);
      if (node && ref.current) {
        const viewport = node.getBoundingClientRect();
        const menuViewport = ref.current.getBoundingClientRect();
        const { innerHeight } = window;
        let topAdjustment = 0;
        let leftAdjustment = 0;
        if (viewport.top + menuViewport.height > innerHeight) {
          topAdjustment =
            (viewport.top + menuViewport.height - innerHeight) * -1;
        }
        updateCoords({
          left: viewport.left + 25,
          top: viewport.top + topAdjustment,
        });
        updateVisible(true);
      }
    }
  }, [bidId]);

  React.useEffect(() => {
    const fn = (e: any) => {
      if (!visible) return;
      let target = e.target;
      let matches = false;
      while (target) {
        if (target.dataset.reaction) return;
        if (target === ref.current) {
          matches = true;
          break;
        }
        // @ts-ignore
        target = target.parentElement;
      }
      if (!matches) {
        resetBidId();
      }
    };
    window.document.body.addEventListener("click", fn);
    return () => {
      window.document.body.removeEventListener("click", fn);
    };
  }, [visible]);

  const [chosenCategory, updateChosenCat] = useState("nouns");

  return (
    <div
      ref={ref}
      style={{
        left: `${coordinates.left}px`,
        top: `${coordinates.top}px`,
        opacity: !visible ? 0 : 1,
        pointerEvents: !visible ? "none" : "all",
      }}
      css={wrap}
    >
      <CategoriesNav
        updateChosenCategory={updateChosenCat}
        chosenCategory={chosenCategory}
      />
      <div css={emojiWrap}>
        {chosenCategory === "nouns" &&
          reactionsJson.map((reaction) => {
            return (
              <div
                key={reaction.id}
                // ref={(value: HTMLDivElement) => {
                //   refs.current[reaction.id] = [src, value];
                // }}
                onClick={(el) => {
                  if (nounId && bidId) {
                    react(nounId, bidId, reaction.id);
                    resetBidId();
                  }
                  onClick?.();
                }}
                css={imageWrap}
              >
                <img css={imgCss} src={images[Number(reaction.id) - 1]} />
              </div>
            );
          })}
        {chosenCategory !== "nouns" &&
          // @ts-ignore
          emojis[chosenCategory].map((emoji) => {
            return (
              <div
                key={emoji.u}
                onClick={(el) => {
                  if (nounId && bidId) {
                    react(nounId, bidId, emoji.u);
                    resetBidId();
                  }
                  onClick?.();
                }}
                css={imageWrap}
              >
                <img
                  css={imgCss}
                  src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${emoji.u}.png`}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
