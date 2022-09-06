import React, { useRef, useState } from "react";
import one from "reactions/src/images/1.png";
import two from "reactions/src/images/2.png";
import three from "reactions/src/images/3.png";
import four from "reactions/src/images/4.png";
import five from "reactions/src/images/5.png";
import six from "reactions/src/images/6.png";
import seven from "reactions/src/images/7.webp";
import eight from "reactions/src/images/8.gif";
import nine from "reactions/src/images/9.gif";
import ten from "reactions/src/images/10.gif";
import eleven from "reactions/src/images/11.gif";
import twelve from "reactions/src/images/12.gif";
import thirteen from "reactions/src/images/13.gif";
import fourteen from "reactions/src/images/14.gif";
import fifteen from "reactions/src/images/15.gif";
import sixteen from "reactions/src/images/16.gif";
import seventeen from "reactions/src/images/17.gif";
import eighteen from "reactions/src/images/18.gif";
import nineteen from "reactions/src/images/19.gif";
import twenty from "reactions/src/images/20.gif";
import twentyone from "reactions/src/images/21.gif";
import twentytwo from "reactions/src/images/22.gif";
import twentythree from "reactions/src/images/23.gif";
import twentyfour from "reactions/src/images/24.gif";
import twentyfive from "reactions/src/images/25.gif";
import twentysix from "reactions/src/images/26.gif";
import twentyseven from "reactions/src/images/27.webp";
import twentyeight from "reactions/src/images/28.gif";
import twentynine from "reactions/src/images/29.gif";
import thirty from "reactions/src/images/30.webp";
import thirtyone from "reactions/src/images/31.gif";
import thirtytwo from "reactions/src/images/32.webp";
import thirtythree from "reactions/src/images/33.gif";
import reactionsJson from "reactions/src/reactions.json";
import smiley from "../../smiley.svg";
import { useAppStore } from "../../stores";
import { styles } from "./styles";
import "./styles.css";
import { socket } from "../../utils";

export const images = [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
  fourteen,
  fifteen,
  sixteen,
  seventeen,
  eighteen,
  nineteen,
  twenty,
  twentyone,
  twentytwo,
  twentythree,
  twentyfour,
  twentyfive,
  twentysix,
  twentyseven,
  twentyeight,
  twentynine,
  thirty,
  thirtyone,
  thirtytwo,
  thirtythree,
];

type ReactionsProps = {
  totals?: { [id: string]: number };
  bidId: string;
  nounId: string;
  onClickReactionMenu: (bidId: string) => void;
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
  console.log(reactions[props.bidId]);
  return (
    <div css={styles.wrap}>
      <div
        data-reaction={props.bidId}
        onClick={() => props.onClickReactionMenu(props.bidId)}
        css={styles.imageWrap}
      >
        <img css={styles.smiley} src={smiley} />
      </div>
      {reactionsJson
        .filter((reaction) => {
          const amount =
            reactions[props.bidId]?.[reaction.id] ??
            props.totals?.[reaction.id] ??
            0;
          return !!amount;
        })
        .map((reaction) => {
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
