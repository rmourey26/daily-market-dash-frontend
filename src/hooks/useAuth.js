import { AuthContext } from "src/contexts/auth";
import { useContext, useEffect } from "react";
import {
   AUTH_SET,
   AUTH_SET_FIREBASE_USER,
   initialAuthState,
} from "src/reducers/authReducer";

function useAuth() {
   const { auth, dispatch } = useContext(AuthContext);

   let tempAuth = initialAuthState;

   useEffect(() => {
      if (!auth || !auth?.isAuthenticated) {
         const appId = window.localStorage.getItem("appid");
         const register = window.localStorage.getItem("register");

         if (appId && register) {
            // console.log("log: running", register);

            if (auth) {
               tempAuth = { ...auth, isAuthenticated: true };
            } else
               tempAuth = {
                  ...tempAuth,
                  uid: appId,
                  username: register.split("@")[0],
                  email: register,
                  isAuthenticated: true,
               };
            dispatch({
               type: AUTH_SET,
               payload: tempAuth,
            });
         }
      }
   }, []);

   const clearSession = async () => {
      localStorage.removeItem("");
   };

   const setFirebaseUser = (user) => {
      dispatch({
         type: AUTH_SET_FIREBASE_USER,
         payload: { user },
      });
   };

   const setAuth = (user) => {
      dispatch({
         type: AUTH_SET,
         payload: { ...user },
      });
   };

   const setAuthenticated = (isAuthenticated) => {
      dispatch({
         type: AUTH_SET,
         payload: { isAuthenticated },
      });
   };

   return {
      auth: auth ? auth : tempAuth,
      setFirebaseUser,
      setAuth,
      setAuthenticated,
   };
}

export { useAuth };
