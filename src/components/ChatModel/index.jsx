import React, { Fragment, useState, useEffect } from "react";
import Sidebar from "src/components/chatModel";
import Chat from "src/components/chatModel";
import { useChat } from "src/hooks/useChat";
import styles from "./chatModal.module.scss";

const ChatModel = ({ CloseModel }) => {
  const [chatDisable, setChatDisable] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const { setUsersSearch } = useChat();

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const handleCloseChat = () => {
    setUsersSearch([], false, [], false, "");
    CloseModel(false);
  };

  return (
    <div className={styles["outer-home"]}>
      <div className={styles.home}>
        <div className={styles["chat-container"]}>
          <button
            className={styles["btn-all"] + " " + styles["btn-add"]}
            onClick={handleCloseChat}
          >
            X
          </button>

          {width > 992 ? (
            <Fragment>
              <Sidebar
                setChatDisable={setChatDisable}
                chatDisable={chatDisable}
              />
              <Chat setChatDisable={setChatDisable} chatDisable={chatDisable} />
            </Fragment>
          ) : chatDisable === true ? (
            <Chat setChatDisable={setChatDisable} chatDisable={chatDisable} />
          ) : (
            <Sidebar
              setChatDisable={setChatDisable}
              chatDisable={chatDisable}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatModel;
