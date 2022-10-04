import { css } from "@emotion/react";

export const wrap = css`
  background: #abadb2;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
`;

export const option = (active: boolean) => css`
  padding: 10px 30px;
  font-weight: bold;
  border-radius: 30px;
  overflow: hidden;
  ${active ? "background: white;" : ""}
`;
