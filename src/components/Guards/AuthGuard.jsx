import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router";
import { useChat } from "src/hooks/useChat";
import { useAuth } from "src/hooks/useAuth";
import {
   getConversationList,
   getUserSnapshotByEmail,
   getAllMessagesSnapshot,
} from "src/services/firebase";
import { getCookie } from "src/utils/Cookies";

function AuthGuard({ children }) {
   const { auth, setFirebaseUser } = useAuth();
   const { chat, setConversationList, setAllMessages } = useChat();
   // const register = window.localStorage.getItem("register");
   // console.log("isLoggedIn", getCookie("isLoggedIn"))
   //    const account = useSelector((state) => state.account);
   const register = getCookie("isLoggedIn");
   // console.log("register", register);

   useEffect(() => {
      if (auth.userId !== "" && chat.conversationList.length == 0) {
         const unsubscribe = getConversationList(
            setConversationList,
            auth.userId
         );

         return unsubscribe;
      }
   }, [auth.userId]);

   //New message snapshot
   useEffect(() => {
      // conversationIds
      if (chat.isConversationLoaded) {
         const conversationIds = [];
         if (chat.conversationList) {
            if (chat.conversationList.length > 0)
               for (var i = 0; i < chat.conversationList.length; i++) {
                  if (i < 10) conversationIds.push(chat.conversationList[i].id);
               }
         }

         if (conversationIds.length > 0) {
            const unsubscribe = getAllMessagesSnapshot(
               conversationIds,
               setAllMessages,
               auth.userId
            );

            return unsubscribe;
         }
      }
   }, [chat.isConversationLoaded, chat.conversationList.length]);

   useEffect(() => {
      if (auth?.email !== "") {
         const unsubscribe = getUserSnapshotByEmail(
            auth.email,
            setFirebaseUser
         );
         return unsubscribe;
      }
   }, [auth.email]);

   useEffect(() => {
      // console.log("log: chat", chat);
   }, [chat]);

   if (!register) {
      return <Navigate to="/FirstSignupScreen" />;
   }

   return children;
}

AuthGuard.propTypes = {
   children: PropTypes.any,
};

export default AuthGuard;
