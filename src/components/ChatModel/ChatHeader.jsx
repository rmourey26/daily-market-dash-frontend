import React, { useEffect, useState } from "react";
import { useChat } from "src/hooks/useChat";
import styles from "./chatModal.module.scss";

const ChatHeader = ({ handleChange }) => {
  const { getOpenConversationUser, chat } = useChat();
  const [currentChat, setCurrentChat] = useState({ username: "", email: "" });
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (chat.conversationId) {
      const temp = getOpenConversationUser();

      if (temp) {
        setCurrentChat(temp);
      }
    }
  }, [chat.conversationId]);

  return (
    <div className={styles.chatInfo}>
      {width < 992 && (
        <button
          type="button"
          onClick={handleChange}
          style={{ paddingRight: 15, cursor: "pointer" }}
        >
          <img src="assets/images/icons/gray_arrow_left.svg" alt="hamburger" />
        </button>
      )}
      <span>{currentChat.username}</span>
    </div>
  );
};

export default ChatHeader;
