import React, { Fragment, useState } from "react";
import ChatHeader from "src/components/ChatModel/SidebarHeader";
import SidebarItem from "src/components/ChatModel/SidebarItem";
import "./style.scss";
import { useChat } from "src/hooks/useChat";
import { useAuth } from "src/hooks/useAuth";
import SidebarSearchItem from "src/components/ChatModel/SidebarSearchItem";
import { createChat } from "src/services/firebase";
import styles from "./chatModal.module.scss";

const Sidebar = ({ chatDisable, setChatDisable }) => {
  const { auth } = useAuth();
  const { chat, findUserInConversationById } = useChat();
  const [isUserAdded, setIsUserAdded] = useState(false);
  const [added, setAdded] = useState(false);

  const handleCreateUser = async (id) => {
    const findUser = await findUserInConversationById(id);

    console.log("log: findUser", findUser);

    if (!findUser) {
      await createChat([auth.userId, id]);
      setIsUserAdded(true);
      setTimeout(() => {
        setIsUserAdded(false);
      }, 3000);
      setAdded(true);
    }

    //Remove added item from search list
    // TODO:
    // const searchConversationList = chat.searchConversationList.filter()
  };
  const uniqueUserIds = Array.from(new Set(chat.conversationList.map(conversation => conversation.user.id)));
  const uniqueUser = Array.from(new Set(chat.searchConversationList.map(conversation => conversation.user.id)));
  return (
    <div className={styles.sidebar}>
      <ChatHeader handleCreateUser={handleCreateUser} setAdded={setAdded} added={added}/>

      <div className={styles.chatprofilelist}>
        {isUserAdded && (
          <div
            style={{
              padding: "40px 10px",
              textAlign: "center",
              color: "#000",
            }}
          >
            <p>User added!</p>
          </div>
        )}

        {chat.searchConversationListNotFound && chat.searchUsersNotFound ? (
          <div style={{ padding: "40px 10px", textAlign: "center", color:"black" }}>
            <p>No user found!</p>
          </div>
        ) : (
          <Fragment>
            {chat.searchConversationList.length > 0 ||
            chat.searchUsers.length > 0
              ? uniqueUser.map((userId) => {
                const conversation = chat.searchConversationList.find(conversation => conversation.user.id === userId);
              // chat.searchConversationList.map((conversation) => (
                if (conversation) {
                  return(
                  <SidebarItem
                    conversation={conversation}
                    key={conversation.id}
                    setChatDisable={setChatDisable}
                  />)}else {
                    return null; // Handle the case where the conversation is not found for the user
                  }
                })
                // ))
              : uniqueUserIds.map((userId) => {
                const conversation = chat.conversationList.find(conversation => conversation.user.id === userId);
                if (conversation) {
                  return (
                    <SidebarItem
                      conversation={conversation}
                      key={conversation.id}
                      setChatDisable={setChatDisable}
                    />
                  );
                } else {
                  return null; // Handle the case where the conversation is not found for the user
                }
              })}

            {chat.searchUsers.length > 0 &&
              chat.searchUsers.map((user) => (
                <SidebarSearchItem
                  user={user}
                  key={user.id}
                  handleCreateUser={handleCreateUser}
                  added={added}
                />
              ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
