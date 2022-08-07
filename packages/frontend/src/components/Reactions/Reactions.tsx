import React, { useRef, useState } from "react";
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
import { socket } from "../../utils";
import { css } from "@emotion/react";

const images = [one, two, three, four, five, six];

type ReactionsProps = {
  totals?: { [id: string]: number };
  bidId: string;
  nounId: string;
};

export function Reactions(props: ReactionsProps) {
  const reactions = useAppStore((state) => state.reactions);
  const react = useAppStore((state) => state.react);
  const refs = useRef<{ [key: string]: [string, HTMLDivElement] }>({});

  const addFloaty = (element: HTMLDivElement, src: string) => {
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

    element.append(div);
  };

  React.useEffect(() => {
    const onReaction = ({
      bidId,
      reactionId,
    }: {
      bidId: string;
      reactionId: string;
    }) => {
      if (bidId === props.bidId && refs.current[reactionId]) {
        const [src, element] = refs.current[reactionId];
        addFloaty(element, src);
      }
    };
    socket.on("reaction", onReaction);

    return () => {
      socket.off("reaction", onReaction);
    };
  }, []);

  return (
    <div css={styles.wrap}>
      {reactionsJson.map((reaction) => {
        const src = images[Number(reaction.id) - 1];
        return (
          <div
            key={reaction.id}
            ref={(value: HTMLDivElement) => {
              refs.current[reaction.id] = [src, value];
            }}
            onClick={(el) => {
              react(props.nounId, props.bidId, reaction.id);
              addFloaty(el.currentTarget, src);
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
