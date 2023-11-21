import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "src/utils/Cookies";

export default function LoadingScreen() {
   const navigate = useNavigate();
   useEffect(() => {
      setTimeout(() => {
         let isLoggedin = getCookie("isLoggedIn");
         if (isLoggedin) {
            navigate("/FirstSignupScreen");
            return;
         }
         // navigate('/FirstSignupScreen');

         navigate("/FirstSignupScreen");
      });
   }, []);
   return (
      <div className="welcome now main-loader">
         {/*<div className="app_loader">
            <img
               src="assets/images/Bull_Bear-once.gif"
               alt=""
               className="img-fluid"
            />
   </div>*/}
      </div>
   );
}
