import React from "react";
import { extras } from "src/data/constants";
import styles from "./chatModal.module.scss";
const EmptyChat = () => {
  return (
    <div className={styles["chat_unselected"]}>
      <div className={styles.chatInfo}></div>
      <div className={styles.WelcomMe}>
        <div>
          <img
            src={extras.avatarUrl + `256_0.png`}
            // src="https://www.dailymarketdash.com/services/images/avatar/256_99.png"
            alt="Robot image"
          />
        </div>
        <div className={styles["unselected_chat_text"]}>
          <h2>Welcome!</h2>
          <p>Create and select a conversation to get started</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
