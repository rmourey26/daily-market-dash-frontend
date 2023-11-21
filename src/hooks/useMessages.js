import React from "react";
import { getHeadToHeadMessages } from "../services/firebase";

function useMessages(roomId) {
   const [messages, setMessages] = React.useState([]);

   React.useEffect(() => {
      const unsubscribe = getHeadToHeadMessages(roomId, setMessages);

      return unsubscribe;
   }, [roomId]);

   return messages;
}

export { useMessages };
