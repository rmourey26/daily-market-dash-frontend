import React, { useState } from "react";
import "./style.scss";
import { sendMessageOneToOne } from "src/services/firebase";
import { useAuth } from "src/hooks/useAuth";
import { useChat } from "src/hooks/useChat";
import InputEmoji from "react-input-emoji";
// import "../../views/Screens/Dashboard/MainLandingPage/style.scss";
import styles from "./chatModal.module.scss";

const Input = () => {
  const { auth } = useAuth();
  const { chat, setUsersMessageSeen } = useChat();
  const [value, setValue] = useState("");

  const handleSend = async (event) => {
    if (value === "" || value === undefined || value === null) return;

    await sendMessageOneToOne(auth.userId, chat.conversationId, value);
    setUsersMessageSeen();
    setValue("");
  };

  return (
    <form onSubmit={handleSend} className={styles["input-field-section"]}>
      <div className={styles["editor-text"]}>
        <InputEmoji
          type="text"
          placeholder="Type something..."
          value={value}
          cleanOnEnter
          onChange={setValue}
          onEnter={handleSend}
          required
          minLength={1}
        />
      </div>
      <div className={styles["editor-buttons"]}>
        <button
          type="button"
          onClick={handleSend}
          className={styles["send-message"]}
        >
          <img src="assets/images/icons/send-now.svg" alt="" />
        </button>
      </div>
    </form>
  );
};

export default Input;
