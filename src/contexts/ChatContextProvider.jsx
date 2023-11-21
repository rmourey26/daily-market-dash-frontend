import React, { createContext, useReducer } from "react";
import { chatReducer } from "src/reducers/chatReducer";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
   const [chat, dispatch] = useReducer(chatReducer);

   return (
      <ChatContext.Provider value={{ chat, dispatch }}>
         {children}
      </ChatContext.Provider>
   );
};

export default ChatContextProvider;
