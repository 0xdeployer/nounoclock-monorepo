import { css } from "@emotion/react";
import { colors } from "../../utils";

export const messageWrap = css`
  padding: 10px;
`;

export const displayName = css`
  font-size: 12px;
  font-weight: bold;
`;

export const message = css`
  margin-top: 8px;
`;

export const messagesWrap = css`
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.jaguar};
  margin-bottom: 20px;
  height: calc(100vh - 162px);
  overflow: scroll;
  min-height: 0;
`;

export const date = css`
  font-size: 12px;
  color: #a0a0a0;
`;
