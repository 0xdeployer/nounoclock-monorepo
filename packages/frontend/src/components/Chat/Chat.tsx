import { css } from "@emotion/react";
import { ConnectKitButton } from "connectkit";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("NOC_CHAT_AUTH") ?? "");
      if (data) {
        setChatSignature(data);
      }
    } catch {}
  }, [setChatSignature]);

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

  const wrapper = useRef<HTMLDivElement>(null);
  const messages = useRef<HTMLDivElement>(null);
  const [scrollPos, updateScrollPos] = useState(0);
  const [initialScroll, updateInitialScroll] = useState(false);

  React.useEffect(() => {
    // Fix issue where you switch from mobile to desktop and it slowly scrolls down
    setTimeout(() => {
      wrapper.current?.scrollTo(0, messages.current?.offsetHeight ?? 0);
      updateInitialScroll(true);
    }, 0);
  }, []);

  React.useEffect(() => {
    if (!initialScroll) return;
    if ((wrapper.current?.scrollTop || 0) < scrollPos) return;
    wrapper.current?.scrollTo(0, messages.current?.offsetHeight ?? 0);
    setTimeout(() => {
      updateScrollPos(wrapper.current?.scrollTop ?? 0);
    }, 100);
  }, [chats, scrollPos, initialScroll]);

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
        <div
          style={{ scrollBehavior: !initialScroll ? "auto" : "smooth" }}
          ref={wrapper}
          css={styles.messagesWrap}
        >
          <div
            ref={messages}
            css={css`
              flex-direction: column;
              position: relative;
              justify-content: flex-end;
              display: flex;
              min-height: 100%;
            `}
          >
            {chats.map((chat, i) => {
              return (
                <div
                  key={`${i}-${chat.timestamp}-${chat.address}-${chat.displayName}`}
                  css={styles.messageWrap}
                >
                  <div
                    css={css`
                      display: flex;
                      gap: 5px;
                    `}
                  >
                    <Avatar src={chat.avatar} seed={chat.address} />
                    <p css={styles.displayName}>{chat.displayName}</p>
                    <p css={styles.date}>
                      {format(new Date(chat.timestamp) as any as number, "p MMM d")}
                    </p>
                  </div>
                  <p css={styles.message}>{chat.message}</p>
                </div>
              );
            })}
          </div>
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
