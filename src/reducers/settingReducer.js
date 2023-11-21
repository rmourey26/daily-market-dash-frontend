export const SETTING_MENU_OPEN = "@setting-menu-open";
export const SETTING_KEYBOARD_TOGGLE = "@setting-keyboard-toggle";
export const SETTING_POPUP_TOGGLE = "@setting-popup-toggle";
export const SETTING_CUSTOM_MESSAGE = "@setting-message-toggle";
export const SETTING_CUSTOM_MESSAGE_FIND = "@setting-message-toggle-find";
export const SETTING_INFO_POPUP_TOGGLE = "@setting-info-popup-toggle";
export const SETTING_CHAT_POPUP_TOGGLE = "@setting-chat-popup-toggle";
export const SETTING_NOTIFICATION_POPUP_TOGGLE = "@setting-notification-popup-toggle";
export const SETTING_PROFILE_POPUP_TOGGLE = "@setting-profile-popup-toggle";
export const initialSettingState = {
   toggleSidebar: false,
   isKeyboardActive: false,
   isPopupActive: false,
   customMessage: false,
   istostifyActive:false,
   isinfoPopupActive:false,
   ischatPopupActive:false,
   isnotificationActive:false,
   isprofileActive:false
};

export const settingReducer = (state = initialSettingState, action) => {
   switch (action.type) {
      case SETTING_MENU_OPEN:
         return { ...state, toggleSidebar: !state.toggleSidebar };

      case SETTING_KEYBOARD_TOGGLE:
         return { ...state, isKeyboardActive: !state.isKeyboardActive };

      case SETTING_POPUP_TOGGLE:
         return { ...state, isPopupActive: !state.isPopupActive };

         case SETTING_CUSTOM_MESSAGE_FIND:
            return { ...state, istostifyActive: !state.istostifyActive };

      case SETTING_CUSTOM_MESSAGE:
         return { ...state, message: action.payload };

      case SETTING_INFO_POPUP_TOGGLE:
         return{...state, isinfoPopupActive: !state.isinfoPopupActive};

      case SETTING_CHAT_POPUP_TOGGLE:
         return{...state, ischatPopupActive: !state.ischatPopupActive};

      case SETTING_NOTIFICATION_POPUP_TOGGLE:
         return{...state, isnotificationActive: !state.isnotificationActive};

      case SETTING_PROFILE_POPUP_TOGGLE:
         return{...state, isprofileActive: !state.isprofileActive};

      default:
         return state;
   }
};
