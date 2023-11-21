import React, { useState, useEffect } from "react";
import { extras } from "src/data/constants";
import { useAuth } from "src/hooks/useAuth";
import { useChat } from "src/hooks/useChat";
import { searchUserByUsername } from "src/services/firebase";
// import "./style.scss";
import styles from "./chatModal.module.scss";

const SidebarHeader = ({ handleCreateUser, setAdded, added }) => {
  const { auth } = useAuth();
  const [searchUserName, setSearchUserName] = useState("");
  const { chat, setUsersSearch } = useChat();

  const _handleCreateUser = async () => {
    // let findUser = chat.users.filter(
    //    (user) => user.username.toString() == searchUserName.toString()
    // );
    // if (findUser) {
    //    await handleCreateUser(findUser[0].email);
    // }
  };

  const handleSearchUsers = async (e) => {
    if (e.target.value === "") {
      setUsersSearch([], false, [], false);
      return;
    }

    let tempConversationList = [];

    //Seach in conversation list
    for (const conversation of chat.conversationList) {
      const inputValue = e.target.value
      if (conversation.user.username === inputValue) {
        tempConversationList.push(conversation);
      }
    }

    // Add search with funtion
    let newUsers = [] 
    
    if(!tempConversationList.length)
    newUsers = await searchUserByUsername(e.target.value);

    setUsersSearch(
      tempConversationList,
      tempConversationList.length > 0 ? false : true,
      newUsers,
      newUsers.length > 0 ? false : true,
      ""
    );
    if (added) {
      // Clear the search input when 'added' is true
      setSearchUserName("");
    }
  };

  useEffect(() => {
    // Clear the search input when 'added' becomes true
    if (added) {
      setSearchUserName("");
      setUsersSearch([], false, [], false);
    }
  }, [added]);

  let avatartype=localStorage.getItem("avatartype");
  let avatarid=localStorage.getItem("avatarId");


  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>
        <img
          src={extras.avatarUrl + `256_${avatarid}.${avatartype}`}
          //src={`https://www.dailymarketdash.com/services/images/avatar/256_${auth.avatar}.png`}
          alt=""
        />
      </span>
      <div className={styles.UserInput}>
        <input
          type="search"
          placeholder="Search..."
          value={searchUserName}
          onChange={(e) => {
            setSearchUserName(e.target.value);
            handleSearchUsers(e);
            setAdded(false)
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              _handleCreateUser();
            }
          }}
        />
      </div>
      <div className={styles.userName}>
        <span>{auth.username}</span>
      </div>
    </div>
  );
};

export default SidebarHeader;
