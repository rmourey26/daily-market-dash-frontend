import React, { useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import { sendMessageInHeadToHead } from "src/services/firebase";
import InputEmoji from "react-input-emoji";
import "./styles.scss";
import { useChat } from "src/hooks/useChat";

function MessageInput() {
   const [value, setValue] = useState("");
   const { auth } = useAuth();
   const { chat } = useChat();

   const handleChange = (event) => {
      setValue(event.target.value);
   };

   const handleSubmit = async (event) => {
      if (chat.headToHeadChat.chatId === "" || value?.trim === "" || !value)
         return;

      await sendMessageInHeadToHead(
         {
            uid: auth.uid,
            username: auth.username,
            chatId: chat.headToHeadChat.chatId,
         },
         value
      );
      setValue("");
   };

   return (
      <form onSubmit={handleSubmit} className="editor-inputs">
         <div className="editor-text">
            <InputEmoji
               id="text-message"
               type="text"
               placeholder="Enter a message"
               value={value}
               onChange={setValue}
               onEnter={handleSubmit}
               required
               minLength={1}
            />
         </div>
         <div className="editor-buttons">
            <button
               type="button"
               onClick={handleSubmit}
               disabled={value < 1}
               className="send-message"
            >
               <img src="assets/images/icons/send-now.svg" alt="" />
            </button>
         </div>
      </form>
   );
}

export { MessageInput };
