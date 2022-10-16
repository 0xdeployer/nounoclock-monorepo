import { getNounData, NounSeed } from "./utils";
import imageData from "./image-data.json";
import { ContractNames, getContract } from "../web3";
import { createCanvas } from "canvas";

// Most code taken from nouns monorepo. Made function to draw noun to a arbitrarily sized canvas and output jpg buffer.

export interface IEncoder {
  encodeImage(filename: string, image: unknown): string;
}

export interface Rect {
  length: number;
  colorIndex: number;
}

export interface LineBounds {
  left: number;
  right: number;
}

export interface ImageRow {
  rects: Rect[];
  bounds: LineBounds;
}

export type ImageRows = { [number: number]: ImageRow };

export interface ImageBounds {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface DecodedImage {
  paletteIndex: number;
  bounds: ImageBounds;
  rects: [length: number, colorIndex: number][];
}

export interface EncodedImage {
  filename: string;
  data: string;
}

export interface ImageData {
  palette: string[];
  images: Record<string, EncodedImage[]>;
}

export interface PngImage {
  width: number;
  height: number;
  rgbaAt(x: number, y: number): RGBAColor;
}

export const decodeImage = (image: string): DecodedImage => {
  const data = image.replace(/^0x/, "");
  const paletteIndex = parseInt(data.substring(0, 2), 16);
  const bounds = {
    top: parseInt(data.substring(2, 4), 16),
    right: parseInt(data.substring(4, 6), 16),
    bottom: parseInt(data.substring(6, 8), 16),
    left: parseInt(data.substring(8, 10), 16),
  };
  const rects = data.substring(10);

  return {
    paletteIndex,
    bounds,
    rects:
      rects
        ?.match(/.{1,4}/g)
        ?.map((rect) => [
          parseInt(rect.substring(0, 2), 16),
          parseInt(rect.substring(2, 4), 16),
        ]) ?? [],
  };
};

const getRectLength = (
  currentX: number,
  drawLength: number,
  rightBound: number
): number => {
  const remainingPixelsInLine = rightBound - currentX;
  return drawLength <= remainingPixelsInLine
    ? drawLength
    : remainingPixelsInLine;
};

const partIds = ["body", "accessory", "head", "glasses"];

export async function draw(nounId: number, text?: string) {
  const nounToken = await getContract(ContractNames.NounToken);
  const seed: NounSeed = await nounToken.methods.seeds(nounId).call();
  const { parts, background } = getNounData(seed);
  return buildCanvas(parts, imageData.palette, background, text);
}

export const buildCanvas = (
  parts: { data: string }[],
  paletteColors: string[],
  bgColor: string,
  text?: string
): Buffer => {
  const ppd = 10;
  const canvasSize = 320;
  const canvas = createCanvas(canvasSize, canvasSize);
  canvas.width = canvasSize * ppd;
  canvas.height = canvasSize * ppd;
  const ctx = canvas.getContext("2d");
  console.log(bgColor);
  ctx.fillStyle = `#${bgColor}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  console.log(parts);

  parts.forEach((part, i) => {
    if (!part) return;
    const { bounds, rects } = decodeImage(part.data);
    let currentX = bounds.left;
    let currentY = bounds.top;

    rects.forEach((draw) => {
      let [drawLength, colorIndex] = draw;
      const hexColor = paletteColors[colorIndex];
      let length = getRectLength(currentX, drawLength, bounds.right);
      while (length > 0) {
        // Do not push rect if transparent
        if (colorIndex !== 0) {
          ctx.fillStyle = `#${hexColor}`;
          ctx.fillRect(
            currentX * 10 * ppd,
            currentY * 10 * ppd,
            length * 10 * ppd,
            10 * ppd
          );
        }

        currentX += length;
        if (currentX === bounds.right) {
          currentX = bounds.left;
          currentY++;
        }

        drawLength -= length;
        length = getRectLength(currentX, drawLength, bounds.right);
      }
    });
  });

  if (text) {
    ctx.fillStyle = "black";
    const rectHeight = 30 * ppd;
    ctx.fillRect(0, canvas.height - rectHeight, canvas.width, rectHeight);
    ctx.font = `900 ${17 * ppd}px arial`;
    var tWidth = ctx.measureText(text).width;
    const offset =
      rectHeight / 2 - ctx.measureText(text).actualBoundingBoxAscent / 2;
    var y = canvas.height - offset;
    var x = (canvas.width - tWidth) / 2;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.strokeText(text, x + 1, y + 1);
    ctx.strokeText(text, x + 1, y + 1);
    ctx.fillText(text, x, y);
  }
  return canvas.toBuffer("image/jpeg", { quality: 1 });
};
