import { useContext } from "react";
import { ChatContext } from "src/contexts/ChatContextProvider";
import {
   initialChatState,
   CHAT_OPEN_CONVERSATION,
   CHAT_SET_SEARCH_USERS,
   CHAT_SET_CHATS,
   CHAT_SET_CONVERSATION_LIST,
   CHAT_SET_INITIAL,
   CHAT_UPDATE_CONVERSATIONLIST_UNSEEN_MESSAGES,
   CHAT_SET_HEADTOHEAD_CHATID,
   CHAT_SET_HEADTOHEAD_MESSAGES,
} from "src/reducers/chatReducer";
import { updateMessagesSeenStatus } from "src/services/firebase";
import { useAuth } from "./useAuth";

function useChat() {
   const { chat, dispatch } = useContext(ChatContext);
   const { auth } = useAuth();

   const setChatInitial = () => {
      dispatch({
         type: CHAT_SET_INITIAL,
      });
   };

   const setConversationList = (conversationList, isConversationLoaded) => {
      dispatch({
         type: CHAT_SET_CONVERSATION_LIST,
         payload: {
            conversationList,
            isConversationLoaded,
         },
      });
   };

   const setUsersSearch = (
      searchConversationList,
      searchConversationListNotFound,
      searchUsers,
      searchUsersNotFound
   ) => {
      dispatch({
         type: CHAT_SET_SEARCH_USERS,
         payload: {
            searchConversationList,
            searchConversationListNotFound,
            searchUsers,
            searchUsersNotFound,
            conversationId: "",
         },
      });
   };

   const setOpenConversation = (conversationId) => {
      dispatch({
         type: CHAT_OPEN_CONVERSATION,
         payload: {
            conversationId,
         },
      });
   };

   const setAllMessages = (messages, userId) => {
      dispatch({
         type: CHAT_SET_CHATS,
         payload: {
            messages,
            userId: userId,
         },
      });
   };

   const setUsersMessageSeen = async () => {
      if (chat.chats && chat.chats[chat.conversationId]) {
         let tempList = chat.chats[chat.conversationId].filter(
            (item) => item.userId !== auth.userId
         );

         if (tempList === 0) return;

         //Update conversationList here
         updateConversationListUnSeenMessages(chat.conversationId);

         for (const item of tempList) {
            updateMessagesSeenStatus(item.id);
         }
      }
   };

   const updateConversationListUnSeenMessages = (conversationId) => {
      dispatch({
         type: CHAT_UPDATE_CONVERSATIONLIST_UNSEEN_MESSAGES,
         payload: {
            conversationId,
            unSeenMessages: false,
         },
      });
   };

   const getOpenConversationUser = () => {
      const conversation = chat.conversationList.filter(
         (item) => item.id === chat.conversationId
      )[0];

      return conversation.user;
   };

   const findUserInConversationById = async (id) => {
      let index = chat.conversationList.findIndex(
         (item) => item.user.id === id
      );
      return index === -1 ? false : true;
   };

   const setHeadToHeadChatId = (chatId) => {
      dispatch({
         type: CHAT_SET_HEADTOHEAD_CHATID,
         payload: {
            chatId,
         },
      });
   };

   const setHeadToHeadMessages = (messages) => {
      dispatch({
         type: CHAT_SET_HEADTOHEAD_MESSAGES,
         payload: {
            messages,
         },
      });
   };

   return {
      chat: chat ? chat : initialChatState,
      setConversationList,
      setOpenConversation,
      setUsersMessageSeen,
      getOpenConversationUser,
      findUserInConversationById,
      setChatInitial,
      setAllMessages,
      setUsersSearch,
      setHeadToHeadMessages,
      setHeadToHeadChatId,
   };
}

export { useChat };
