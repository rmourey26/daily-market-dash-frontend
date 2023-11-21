import React, { useEffect, useRef } from "react";
import { useChat } from "src/hooks/useChat";
import Message from "./Message";
// import "./style.scss";
import styles from "./chatModal.module.scss";
const Messages = () => {
  const { chat } = useChat();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.chats]);

  return (
    <div className={styles.messages}>
      {chat.chats &&
        chat.chats[chat.conversationId] &&
        chat.chats[chat.conversationId].map((message) => (
          <Message message={message} key={message.id} />
        ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
