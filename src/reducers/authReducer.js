export const AUTH_SET = "@auth-set";
export const AUTH_SET_FIREBASE_USER = "@auth-set-firebase-username";
let avatarIdLocal = localStorage.getItem("avatarId");
let avatartypeLocal = localStorage.getItem("avatartype");

console.log("avatartypeLocal", avatartypeLocal)
export const initialAuthState = {
   uid: "",
   userId: "",
   username: "",
   email: "",
   isAuthenticated: false,
   avatar: avatarIdLocal ? avatarIdLocal : 1,
   avatartype:avatartypeLocal
};
console.log("avatartypeLocal", avatartypeLocal)

export const authReducer = (state = initialAuthState, action) => {
   switch (action.type) {
      case AUTH_SET:
         return { ...state, ...action.payload };

      case AUTH_SET_FIREBASE_USER:
         return {
            ...state,
            ...action.payload.user,
         };

      default:
         return state;
   }
};
