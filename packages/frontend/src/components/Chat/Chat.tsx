import { css } from "@emotion/react";
import { ConnectKitButton } from "connectkit";
import React, { useCallback, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { getTimestamp } from "../../api";
import { useAppStore } from "../../stores";
import { ConnectButton } from "../ConnectButton";
import { Avatar, TextField } from "../ui";
import { Button } from "../ui/Button";
import enterSvg from "../../enter.svg";
import * as styles from "./styles";
import { format } from "date-fns";
import { useMq } from "../../utils";

export default function Chat() {
  const { address } = useAccount();
  const { chats, chatSignatureData, setChatSignature, sendChat } = useAppStore(
    (state) => ({
      chatSignatureData: state.chatSignatureData,
      chats: state.chats,
      sendChat: state.sendChat,
      setChatSignature: state.setChatSignature,
    })
  );
  const { signMessageAsync } = useSignMessage();

  const [message, updateMessage] = useState("");

  const onClickAuth = useCallback(() => {
    const fn = async () => {
      const params = await getTimestamp();
      const { timestamp, message, template } = params;
      const sig = await signMessageAsync({ message });
      if (!address) return;
      const data = { message, timestamp, sig, address };
      try {
        localStorage.setItem("NOC_CHAT_AUTH", JSON.stringify(data));
      } catch {}
      setChatSignature(data);
    };
    fn();
  }, [signMessageAsync, setChatSignature, address]);

  const submitChat = async (e: any) => {
    e.preventDefault();
    if (!message.trim() || message.length > 500) return;
    sendChat(message);
    updateMessage("");
  };

  const { isMobile } = useMq();

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: calc(100vh - 100px);
          ${isMobile
            ? `
            background: white;
            height: calc(100vh - 224px);
            padding-bottom: 20px;
          `
            : void 0}
        `}
      >
        <div css={styles.messagesWrap}>
          {chats.map((chat) => {
            return (
              <div css={styles.messageWrap}>
                <div
                  css={css`
                    display: flex;
                    gap: 5px;
                  `}
                >
                  <Avatar src={chat.avatar} seed={chat.address} />
                  <p css={styles.displayName}>{chat.displayName}</p>
                  <p css={styles.date}>
                    {format(chat.timestamp as any as number, "p")}
                  </p>
                </div>
                <p css={styles.message}>{chat.message}</p>
              </div>
            );
          })}
        </div>

        <ConnectKitButton.Custom>
          {({ isConnected, isConnecting, show, hide, address, ensName }) => {
            return (
              <>
                {isConnected && chatSignatureData && (
                  <form onSubmit={submitChat}>
                    <TextField
                      value={message}
                      // css={styles.noteInput}
                      onChange={(e: any) => updateMessage(e.target.value)}
                      placeholder="Type your message"
                      rightIcon={
                        <img
                          onClick={submitChat}
                          css={css`
                            position: absolute;
                            right: 20px;
                            top: 50%;
                            transform: translateY(-50%);
                          `}
                          src={enterSvg}
                        />
                      }
                    />
                  </form>
                )}
                {isConnected && !chatSignatureData && (
                  <Button variant="bravo" onClick={onClickAuth}>
                    Authenticate to chat
                  </Button>
                )}
                {!isConnected && <ConnectButton />}
              </>
            );
          }}
        </ConnectKitButton.Custom>
      </div>
    </>
  );
}
