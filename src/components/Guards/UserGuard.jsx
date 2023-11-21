import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router";

import { getCookie } from "src/utils/Cookies";

function UserGuard({ children }) {
//    const { auth, setFirebaseUser } = useAuth();
//    const { chat, setConversationList, setAllMessages } = useChat();
   // const register = window.localStorage.getItem("register");
   // console.log("isLoggedIn", getCookie("isLoggedIn"))
   //    const account = useSelector((state) => state.account);
   const registerEmail = window.localStorage.getItem("LogingProcess");
   // console.log("register", register);

//    useEffect(() => {
//       if (auth.userId !== "" && chat.conversationList.length == 0) {
//          const unsubscribe = getConversationList(
//             setConversationList,
//             auth.userId
//          );

//          return unsubscribe;
//       }
//    }, [auth.userId]);

   //New message snapshot
//    useEffect(() => {
//       // conversationIds
//       if (chat.isConversationLoaded) {
//          const conversationIds = [];
//          if (chat.conversationList) {
//             if (chat.conversationList.length > 0)
//                for (var i = 0; i < chat.conversationList.length; i++) {
//                   if (i < 10) conversationIds.push(chat.conversationList[i].id);
//                }
//          }

//          if (conversationIds.length > 0) {
//             const unsubscribe = getAllMessagesSnapshot(
//                conversationIds,
//                setAllMessages,
//                auth.userId
//             );

//             return unsubscribe;
//          }
//       }
//    }, [chat.isConversationLoaded, chat.conversationList.length]);

//    useEffect(() => {
//       if (auth?.email !== "") {
//          const unsubscribe = getUserSnapshotByEmail(
//             auth.email,
//             setFirebaseUser
//          );
//          return unsubscribe;
//       }
//    }, [auth.email]);

//    useEffect(() => {
//       // console.log("log: chat", chat);
//    }, [chat]);

   if (!registerEmail) {
      return <Navigate to="/FirstSignupScreen" />;
   }
   return children;
}

UserGuard.propTypes = {
   children: PropTypes.any,
};

export default UserGuard;
