import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router";

import { getCookie } from "src/utils/Cookies";

function AdditionGuard({ children }) {
   const registerEmail = window.localStorage.getItem("additionProcess");
   let UserStatus = window.localStorage.getItem("status");


   if (UserStatus !== "exists" && !registerEmail) {
      return <Navigate to="/FirstSignupScreen"/>;
   }
   else if (UserStatus == "exists"){
    return children
   }

   return children;
}

AdditionGuard.propTypes = {
   children: PropTypes.any,
};

export default AdditionGuard;
