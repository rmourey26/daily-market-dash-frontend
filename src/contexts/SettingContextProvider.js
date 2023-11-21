import React, { createContext, useReducer } from "react";
import { settingReducer } from "src/reducers/settingReducer";

export const SettingContext = createContext();

const SettingContextProvider = ({ children }) => {
   const [setting, dispatch] = useReducer(settingReducer);

   return (
      <SettingContext.Provider value={{ setting, dispatch }}>
         {children}
      </SettingContext.Provider>
   );
};

export default SettingContextProvider;
