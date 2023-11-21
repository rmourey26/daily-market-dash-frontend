import React, { useRef, useLayoutEffect } from "react";
import moment from "moment/moment";
import { useAuth } from "src/hooks/useAuth";
import "./styles.scss";
import toDateTime from "src/utils/Extra";
import { useChat } from "src/hooks/useChat";

function MessageList() {
   const containerRef = useRef(null);
   const { auth } = useAuth();
   const { chat } = useChat();

   useLayoutEffect(() => {
      if (containerRef.current) {
         containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
   });

   return (
      <div className="chat-message-section" ref={containerRef}>
         <div className="drop-chat">
            {chat.headToHeadChat.messages.map((message) => (
               <Message
                  key={message.id}
                  message={message}
                  isOwnMessage={message.uid === auth.uid}
                  messageTime={message.timestamp}
               />
            ))}
         </div>
      </div>
   );
}

function Message({ message, isOwnMessage, messageTime }) {
   const { username, message: text } = message;

   return (
      <div className={isOwnMessage ? "own-message" : "friend-message"}>
         <div className="meta-content">
            <div className="chat-bubble">
               <div className="chat-user">
                  {isOwnMessage ? "You" : username}
               </div>
               <div className="chat-text">
                  <p>{text}</p>
               </div>
            </div>
            <time>
               ⏰{" "}
               {moment(
                  messageTime
                     ? toDateTime(messageTime.seconds)
                     : new Date().toLocaleString(),
                  ""
               ).fromNow()}
            </time>
         </div>
      </div>
   );
}

export default MessageList;
