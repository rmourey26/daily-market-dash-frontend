import React from "react";
import { extras } from "src/data/constants";
// import { useAuth } from "src/hooks/useAuth";
import { useChat } from "src/hooks/useChat";
// import "./style.scss";
import styles from "./chatModal.module.scss";

const SidebarItem = ({ conversation, setChatDisable }) => {
  const { setOpenConversation, CHAT_OPEN_CONVERSATION, chat } = useChat();

  const handleOpenChat = () => {
    setOpenConversation(conversation.id);
    setChatDisable(true);
    console.log("chat", CHAT_OPEN_CONVERSATION, chat, conversation.id)
  };
  

  console.log("conversation", conversation)
 

  return (
    <div className={styles.chats}>
      {conversation.user.username && (
        <div className={styles.userChat} onClick={handleOpenChat} style={{background:chat.conversationId==conversation.id?"#c0c0c0":""}}>
          <img
            src={extras.avatarUrl + `256_${conversation.user.avatar}.png`}
            // src={`https://www.dailymarketdash.com/services/images/avatar/256_${conversation.user.avatar}.png`}
            alt=""
          />
          <div
          
            className={`${
              conversation.unSeenMessages
                ? styles.active + " " + styles.userChatInfo
                : styles.userChatInfo
            }`}
          >
            {conversation.user && <span style={{fontWeight:chat.conversationId==conversation.id? "bold":""}}>{conversation.user.username}</span>}
            {conversation.unSeenMessages && (
              <span className={styles.activeuserinfo}></span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
