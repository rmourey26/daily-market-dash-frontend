import React, { createContext, useReducer } from "react";
import { authReducer } from "src/reducers/authReducer";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
   const [auth, dispatch] = useReducer(authReducer);

   return (
      <AuthContext.Provider value={{ auth, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContextProvider;
