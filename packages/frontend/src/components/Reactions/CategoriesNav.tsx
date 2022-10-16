import { css } from "@emotion/react";
import React, { useState } from "react";
import { colors } from "../../utils";
import noggles from "./svg/nouns.raw.svg";

const groups = [
  "smileys_people",
  "animals_nature",
  "food_drink",
  "travel_places",
  "activities",
  "objects",
  "symbols",
  "flags",
];

const wrap = css({
  display: "grid",
  gridTemplateColumns: "repeat(9,1fr)",
  gap: "5px",
});

const icon = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2px",
  borderRadius: "3px",
  "&:hover, &.active": {
    background: colors.night,
  },
  "& svg": {
    width: "100%",
    fill: "#000",
  },
});

const nounIcon = css({
  width: "28px",
});

export function CategoriesNav({
  chosenCategory,
  updateChosenCategory,
}: {
  chosenCategory: string;
  updateChosenCategory: (category: string) => any;
}) {
  const [paths, updatePaths] = useState<undefined | string[]>();
  React.useEffect(() => {
    const fn = async () => {
      const out = (
        await Promise.all(groups.map((g) => require(`./svg/${g}.raw.svg`)))
      ).map((img) => img.default);

      updatePaths(out);
    };
    fn();
  }, []);

  return (
    <>
      <div css={wrap}>
        <div
          onClick={() => updateChosenCategory("nouns")}
          className={chosenCategory === "nouns" ? "active" : void 0}
          css={css(icon, nounIcon)}
          dangerouslySetInnerHTML={{ __html: noggles }}
        />
        {paths?.map((path, i) => {
          const active = chosenCategory === groups[i];
          return (
            <div
              key={path}
              onClick={() => updateChosenCategory(groups[i])}
              className={active ? "active" : void 0}
              css={icon}
              dangerouslySetInnerHTML={{ __html: path }}
            />
          );
        })}
      </div>
    </>
  );
}
