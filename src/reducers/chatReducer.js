import sortByTimestampDESC from "src/hooks/functions/sortByTimestampDESC";
import { groupByMessage } from "src/hooks/functions/";

export const CHAT_OPEN_CONVERSATION = "@chat-open-conversation";
export const CHAT_SET_CONVERSATION_LIST = "@chat-set-conversation-list";
export const CHAT_SET_INITIAL = "@chat-set-initial";
export const CHAT_SET_CHATS = "@chat-set-chats";
export const CHAT_SET_NOTIFICATIONS = "@chat-set-notifications";
export const CHAT_UPDATE_CONVERSATIONLIST_UNSEEN_MESSAGES =
   "@chat-update-conversationList-unseen-messages";
export const CHAT_SET_SEARCH_USERS = "@chat-set-search-users";
export const CHAT_SET_HEADTOHEAD_CHATID = "@chat-set-headtohead-chat-id";
export const CHAT_SET_HEADTOHEAD_MESSAGES = "@chat-set-headtohead-message";

export const initialChatState = {
   conversationId: "",
   conversationList: [],
   isConversationLoaded: false,
   messages: [],
   users: [],
   searchConversationList: [],
   searchConversationListNotFound: false,
   searchUsers: [],
   searchUsersNotFound: false,
   notifications: 0,
   chats: null,
   headToHeadChat: {
      chatId: "",
      messages: [],
   },
};

export const chatReducer = (state = initialChatState, action) => {
   switch (action.type) {
      case CHAT_OPEN_CONVERSATION:
         return { ...state, conversationId: action.payload.conversationId };

      case CHAT_SET_INITIAL:
         return {
            ...initialChatState,
         };

      case CHAT_SET_CONVERSATION_LIST:
         return {
            ...state,
            conversationList: action.payload.conversationList,
            isConversationLoaded: action.payload.isConversationLoaded,
         };

      case CHAT_SET_SEARCH_USERS:
         return {
            ...state,
            searchConversationList: action.payload.searchConversationList,
            searchConversationListNotFound:
               action.payload.searchConversationListNotFound,
            searchUsers: action.payload.searchUsers,
            searchUsersNotFound: action.payload.searchUsersNotFound,
            conversationId: "",
         };

      case CHAT_SET_NOTIFICATIONS: {
         let noti = action.payload.notifications + state.notifications;
         return {
            ...state,
            notifications: noti < 0 ? 0 : noti,
         };
      }

      case CHAT_SET_CHATS: {
         let messages = action.payload.messages;
         let userId = action.payload.userId;

         const groupByChatId = groupByMessage(messages, "chatId");

         //Calculate notifications here
         let notifications = 0;
         messages.forEach(
            (message) =>
               !message.seen &&
               message.userId !== userId &&
               message.chatId !== state.conversationId &&
               notifications++
         );

         // Sort conversation based on last message
         let lastestMessageList = [];

         if (groupByChatId) {
            Object.keys(groupByChatId).map((key) => {
               if (
                  groupByChatId[key].length > 0 &&
                  !groupByChatId[key][groupByChatId[key].length - 1].seen
               )
                  lastestMessageList.push({
                     chatId: key,
                     message: groupByChatId[key][groupByChatId[key].length - 1],
                  });
            });
         }

         lastestMessageList = sortByTimestampDESC(lastestMessageList);

         let conversationList = state.conversationList;

         //Set unSeenMessage in conversationList based on lastMessage
         if (lastestMessageList.length > 0) {
            let toBeUpdatedList = [];
            for (const item of lastestMessageList) {
               let findIndex = conversationList.findIndex(
                  (con) => con.id === item.chatId
               );

               if (findIndex !== -1) {
                  let unSeenMessages = false;

                  if (
                     item.chatId.toString() !==
                     state.conversationId.toString() &&
                     item.message.userId !== userId
                  ) {
                     unSeenMessages = true;
                  }

                  toBeUpdatedList.push({
                     ...conversationList[findIndex],
                     unSeenMessages,
                  });

                  conversationList = conversationList.filter(
                     (con) => con.id !== item.chatId
                  );
               }
            }

            if (toBeUpdatedList.length > 0)
               conversationList = [...toBeUpdatedList, ...conversationList];
         }

         return {
            ...state,
            chats: groupByChatId,
            notifications: notifications,
            conversationList: conversationList,
         };
      }

      case CHAT_UPDATE_CONVERSATIONLIST_UNSEEN_MESSAGES: {
         const tempConList = state.conversationList;
         const findIndex = tempConList.findIndex(
            (item) => item.id === action.payload.conversationId
         );
         if (findIndex === -1) return state;
         tempConList[findIndex].unSeenMessages = action.payload.unSeenMessages;
         return { ...state, conversationList: tempConList };
      }

      case CHAT_SET_HEADTOHEAD_CHATID: {
         console.log("log: action.payload.chatId", action.payload.chatId);
         return {
            ...state,
            headToHeadChat: {
               ...state.headToHeadChat,
               chatId: action.payload.chatId,
               messages: [],
            },
         };
      }

      case CHAT_SET_HEADTOHEAD_MESSAGES:
         return {
            ...state,
            headToHeadChat: {
               ...state.headToHeadChat,
               messages: action.payload.messages,
            },
         };

      default:
         return state;
   }
};
