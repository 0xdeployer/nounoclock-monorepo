import { css } from "@emotion/react";
import React, { useRef, useState } from "react";
import { styles } from "./styles";

type AvatarProps = {
  src?: string;
  seed?: string;
  className?: string;
};

const cache: { [key: number]: any } = {};

export function Avatar({ src, seed, className }: AvatarProps) {
  const [srcFromState, updateSrc] = useState(src);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    if (!src && seed) {
      const id = (parseInt(seed, 16) % 10000) + 1;
      const fn = async () => {
        let res: { matrix: number[][]; colors: [string, string, string] };
        if (cache[id]) {
          res = cache[id];
        } else {
          res = await fetch(
            `https://pxg-prod.herokuapp.com/metadata/${id}`
          ).then((res) => res.json());
          cache[id] = res;
        }

        if (canvasRef.current) {
          render(canvasRef.current, res.matrix, 37, ...res.colors);
        }
      };
      try {
        fn();
      } catch (e) {}
    }
  }, [seed, src]);
  return (
    <div className={className} css={styles.wrap}>
      {src && <img css={styles.img} src={src} />}
      {!src && seed && <canvas css={styles.img} ref={canvasRef} />}
    </div>
  );
}

function render(
  canvas: HTMLCanvasElement,
  matrix: number[][],
  ppd: number,
  fillColor: string,
  borderColor: string,
  backgroundColor: string
) {
  const size = matrix.length;
  let canvasSize = Math.ceil(size * Math.SQRT2);
  canvasSize += canvasSize % 2;
  const margin = (canvasSize - size) / 2;
  canvas.width = canvasSize * ppd;
  canvas.height = canvasSize * ppd;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(margin * ppd, margin * ppd);
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] == 1) {
        ctx.fillStyle = fillColor;
      } else if (countNeighbors(matrix, x, y) > 0) {
        ctx.fillStyle = borderColor;
      } else {
        continue;
      }

      ctx.fillRect(x * ppd, y * ppd, ppd, ppd);
      ctx.fillRect((size - x - 1) * ppd, y * ppd, ppd, ppd);
    }
  }
  return canvas;
}

function countNeighbors(pxgGrid: number[][], x: number, y: number) {
  return (
    (pxgGrid[y - 1]?.[x] || 0) +
    (pxgGrid[y + 1]?.[x] || 0) +
    (pxgGrid[y][x - 1] || 0) +
    (pxgGrid[y][x + 1] || 0)
  );
}
