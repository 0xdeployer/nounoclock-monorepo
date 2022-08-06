import facepaint from "facepaint";
import { useEffect, useState } from "react";

export const mediaQueries = ["@media(min-width: 0px) and (max-width: 887px)"];
export const mq = facepaint(mediaQueries);
export function useMq() {
  const [matches, updateMatches] = useState<{ [key: string]: boolean }>({});
  useEffect(() => {
    const queries: any = [];
    mediaQueries.forEach((query) => {
      queries.push(window.matchMedia(query.replace("@media", "")));
    });
    const cb = () => {
      queries.forEach((q: any, i: number) => {
        updateMatches((matches) => ({ ...matches, [i]: q.matches }));
      });
    };
    window.addEventListener("resize", cb);
    cb();

    return () => {
      window.removeEventListener("resize", cb);
    };
  }, [updateMatches]);

  return {
    matches,
  };
}
