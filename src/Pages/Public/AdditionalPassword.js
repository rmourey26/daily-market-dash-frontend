import React,{useEffect, useState} from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import { addSecure } from "src/data/addSecure";
// import "../Dashboard/HeadToHead/custom.scss";
import "../../views/Screens/Dashboard/HeadToHead/custom.scss";
import styles from "./styleModulesPublic/additionalPassword.module.scss";
// import styles from "./styleModulesPublic/additionalPassword.module.scss"
import axiosInstance from "src/services/axios";
import { extras } from "src/data/constants";
import { sha256 } from "js-sha256";

const AdditionalPassword = () => {
   const navigate = useNavigate();
   let email = window.localStorage.getItem("register");
   let data = window.localStorage.getItem("data");
   // let device = sha256(JSON.parse(data).appid + "+" + email);
   let UserStatus = window.localStorage.getItem("status");
   let device = localStorage.getItem("deviceId");

   useEffect(() => {
      localStorage.removeItem("additionProcess");
   }, [])
   
   useEffect(() => {
      if(UserStatus !== "exists"){
      axiosInstance
      .post("/members/", {action: "register",
      device: device,
      email: email,
      })
      .then(async (response) => {
         // setErrors({ email: 'This is a dummy procedure error' });
         let data = response.data;

         setCookie("isLoggedIn", email, 30);
         
      })
      .catch(function (error) {
         console.log(error);
         // toast.error("UserName Already Exist!");
        
      });}
   }, [])
   const [code, setCode] = useState(""); 
   

   const handleCodeClick = () => {
      const generatedCode = "DTWars"; 
      setCode(generatedCode);
      
  
   };
   const handleInputChange = (event) => {
      setCode(event.target.value);
   };
   const handleadditionalProcess = () => {
      localStorage.setItem("additionProcess", code);
   };
 
   return (
      <Formik
         initialValues={{ code: "" }}
         validate={(values) => {
            const errors = {};
            if (!code ){
               errors.code = "Please enter the code";
               setInputType("text")
            }
            // else if ((values.code !== addSecure.code) && (values.code !== addSecure.code1)) {
            //    errors.code = "Invalid code"; 
            //  }
            return errors;
            
         }}
         onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
               // if (values.code != addSecure.code && values.code != addSecure.code1) {
               //    // window.location.replace(extras.redirectUrl);
               //    navigate("/AdditionalPassword");
               //    return
               // }
               axiosInstance
               .post("/members/", {
                  // token: "good4loadtests",
                  action:"accesscode",
                  // device:device,
                  email:email,
                  code:code
               })
               .then(async (response) => {
                  console.log("accessCodeResponse", response)
               })
               .catch(function (error) {
                  console.log(error);
               });
               navigate("/SecondSignupScreen");
               setSubmitting(false);
            }, 1000);
         }}
      >
         {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
         }) => (
            <form onSubmit={handleSubmit}>
               <div
                  className={styles["welcome-us"] + " " + styles["main-loader"]}
               >
                  <div className={styles["app_loader"]}>
                     <img
                        src={extras.mainLogo}
                        alt=""
                        className={styles["img-fluid"]}
                     />
                  </div>
                  <div className={styles["place-input"]}>
                     <h1 className={styles["email-enter"]}>
                        {extras.AdditionalPassword.welcome}
                     </h1>
                     <h4
                     className={styles["email-enters"]}
                     >
                        {extras.AdditionalPassword.enterCode}
                     </h4>
                     <h4
                     className={
                        styles["sub-code"] + " " + styles["no-error"]
                     }
                     
                  >
                     Please Enter Code Below
                  </h4>
                     <input
                     type="text"
                     name="code"
                     placeholder=""
                     className={styles["form-control"]}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                     value={code} // Use the code state as the value of the input field
                  />
                     <span className={styles["form-error"]}>
                        {errors.code && touched.code && errors.code}
                     </span>
                  </div>
                  <div className={styles["tour"]}>
                  {/* Add an onClick handler to the span */}
                  <span onClick={handleCodeClick}>
                     Don't have an access code? You can find one here
                  </span>
               </div>
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className={styles["dmd-btn"]}
                     onClick={handleadditionalProcess}
                  >
                     Continue
                  </button>

                 
               </div>

            </form>
         )}
      </Formik>
   );
};

export default AdditionalPassword;
