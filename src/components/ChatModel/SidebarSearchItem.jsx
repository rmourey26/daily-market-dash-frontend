import React from "react";
import { extras } from "src/data/constants";
import styles from "./chatModal.module.scss";

const SidebarSearchItem = ({ user, handleCreateUser, added}) => {
  return (
    <div className={styles.chats}>
      <div className={styles.userChat}>
        <img
          src={extras.avatarUrl + `256_${user.avatar}.png`}
          //src={`https://www.dailymarketdash.com/services/images/avatar/256_${user.avatar}.png`}
          alt=""
        />
        <div>
          <span>{user.username}</span>
          {!added&&<button
            onClick={() => handleCreateUser(user.id)}
            className={styles["add-btn"]}
            disabled={added}
          >
            Add
          </button>}
        </div>
      </div>
    </div>
  );
};

export default SidebarSearchItem;
