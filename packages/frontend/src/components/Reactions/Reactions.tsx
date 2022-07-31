import React, { useCallback } from "react";
import one from "reactions/src/images/1.png";
import two from "reactions/src/images/2.png";
import three from "reactions/src/images/3.png";
import four from "reactions/src/images/4.png";
import five from "reactions/src/images/5.png";
import six from "reactions/src/images/6.png";
import reactionsJson from "reactions/src/reactions.json";
import { useAppStore } from "../../stores";
import { styles } from "./styles";
import "./styles.css";

const images = [one, two, three, four, five, six];

type ReactionsProps = {
  totals?: { [id: string]: number };
  bidId: string;
};

export function Reactions(props: ReactionsProps) {
  const reactions = useAppStore((state) => state.reactions);
  const react = useAppStore((state) => state.react);

  return (
    <div css={styles.wrap}>
      {reactionsJson.map((reaction) => {
        const src = images[Number(reaction.id) - 1];
        return (
          <div
            onClick={(el) => {
              react(props.bidId, reaction.id);
              const div = window.document.createElement("div");
              const img = window.document.createElement("img");
              const goUp = `goUp${Math.floor(Math.random() * 3)}`;
              const leftRight = `leftRight${Math.floor(Math.random() * 3)}`;
              div.classList.add("float-wrap");
              div.classList.add(goUp);

              div.append(img);
              img.src = src;
              img.classList.add("imageFloaty");
              img.classList.add(leftRight);

              div.addEventListener("animationend", () => {
                div.remove();
              });

              el.currentTarget.append(div);
              console.log(el.currentTarget);
            }}
            css={styles.imageWrap}
          >
            <img css={styles.image} src={images[Number(reaction.id) - 1]} />
            <span css={styles.total}>
              {reactions[props.bidId]?.[reaction.id] ??
                props.totals?.[reaction.id] ??
                0}
            </span>
          </div>
        );
      })}
    </div>
  );
}
