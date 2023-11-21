import React from "react";
import { useAuth } from "src/hooks/useAuth";
import "./style.scss";
import moment from "moment/moment";
import styles from "./chatModal.module.scss";

const Message = ({ message }) => {
  const { auth } = useAuth();
  return (
    <div
      className={
        auth.userId !== message.userId ? styles["rec"] : styles["send"]
      }
    >
      <div>
        <div className={styles.messageArea}>
          <span className={styles.mess}>{message.message}</span>
          <span className={styles.during}>
            {moment(new Date(message.timestamp), "YYYYMMDD").fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
