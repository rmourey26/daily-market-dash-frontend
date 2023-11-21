import React, { useEffect } from "react";
import { useChat } from "src/hooks/useChat";
import { getHeadToHeadMessages } from "src/services/firebase";
import { MessageInput } from "./MessageInput";
import MessageList from "./MessageList";
import "./styles.scss";

const room = {
   title: "Head to Head",
   id: "head-to-head",
};

function ChatRoom() {
   const { chat, setHeadToHeadMessages } = useChat();
   // Take snapshot here with chatId
   useEffect(() => {
      if (chat.headToHeadChat.chatId) {
         const unsubscribe = getHeadToHeadMessages(
            chat.headToHeadChat.chatId,
            setHeadToHeadMessages
         );

         return unsubscribe;
      }
   }, [chat.headToHeadChat.chatId]);

   return (
      <div className="chat">
         <MessageList />
         <MessageInput />
      </div>
   );
}

export { ChatRoom };
