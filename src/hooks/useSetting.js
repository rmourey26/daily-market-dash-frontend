import { SettingContext } from "src/contexts/SettingContextProvider";
import { useContext } from "react";
import {
   initialSettingState,
   SETTING_KEYBOARD_TOGGLE,
   SETTING_MENU_OPEN,
   SETTING_POPUP_TOGGLE,
   SETTING_CUSTOM_MESSAGE,
   SETTING_CUSTOM_MESSAGE_FIND,
   SETTING_INFO_POPUP_TOGGLE,
   SETTING_CHAT_POPUP_TOGGLE,
   SETTING_NOTIFICATION_POPUP_TOGGLE,
   SETTING_PROFILE_POPUP_TOGGLE
} from "src/reducers/settingReducer";

function useSetting() {
   const { setting, dispatch } = useContext(SettingContext);

   const toggleMenu = () => {
      dispatch({
         type: SETTING_MENU_OPEN,
      });
   };

   const toggleKeyboard = () => {
      dispatch({
         type: SETTING_KEYBOARD_TOGGLE,
      });
   };

   const togglePopup = () => {
      dispatch({
         type: SETTING_POPUP_TOGGLE,
      });
   };

   const toggleInfoPopup =()=>{
      dispatch({
         type:SETTING_INFO_POPUP_TOGGLE
      });
   }

   const customMessage = (message) => {
      dispatch({
         type: SETTING_CUSTOM_MESSAGE,
         payload: message
      })
   }

   const toggleTostify=()=>{
      dispatch({
         type:SETTING_CUSTOM_MESSAGE_FIND
      })
   }

   const toggleChatPopup=()=>{
      dispatch({
         type:SETTING_CHAT_POPUP_TOGGLE
      })
   }

   const toggleNotification=()=>{
      dispatch({
         type:SETTING_NOTIFICATION_POPUP_TOGGLE
      })
   }

   const toggleProfile=()=>{
      dispatch({
         type:SETTING_PROFILE_POPUP_TOGGLE
      })
   }
   return {
      setting: setting ? setting : initialSettingState,
      toggleMenu,
      toggleKeyboard,
      togglePopup,
      customMessage,
      toggleTostify,
      toggleInfoPopup,
      toggleChatPopup,
      toggleNotification,
      toggleProfile
   };
}

export { useSetting };
