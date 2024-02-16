import React, { Fragment, useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
import "./style.scss";
import EmptyChat from "src/components/ChatModel/EmptyChat";
import ChatHeader from "src/components/ChatModel/ChatHeader";
import { useChat } from "src/hooks/useChat";
import styles from "src/components/ChatModel/chatModal.module.scss";

const Chat = ({ setChatDisable, chatDisable }) => {
  const { chat, setUsersMessageSeen } = useChat();

  const handleChange = () => setChatDisable(false);

  // Update Unseen messages here
  useEffect(() => {
    setUsersMessageSeen();
  }, [chat.conversationId]);

  return (
    <div className={styles.chat}>
      {chatDisable ? (
        <Fragment>
          <ChatHeader handleChange={handleChange} />
          <Messages />
          <Input />
        </Fragment>
      ) : (
        <EmptyChat />
      )}
    </div>
  );
};

export default Chat;
