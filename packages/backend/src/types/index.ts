type NounIds = number[];
type StateBase = {
  id: number;
  data: string;
  looksLike: NounIds;
};
type StatWithName = StateBase & {
  name: string;
};

type StatWithColor = StateBase & {
  color: string;
};
export type NounStats = {
  accessory: StatWithName;
  body: StatWithName;
  head: StatWithName;
  glasses: StatWithName;
  background: StatWithColor;
};

export * from "./events";
