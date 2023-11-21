import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router";
// import { userInfo } from "src/data/userInfo";
import { Link } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import axiosInstance from "src/services/axios";
import { setCookie } from "src/utils/Cookies";
import { extras } from "src/data/constants";
import styles from "./styleModulesPrivate/ThirdSignupScreen.module.scss";
import { sha256 } from "js-sha256";

const ThirdSignupScreen = () => {
   const { auth, setAuthenticated } = useAuth();
   const navigate = useNavigate();
   const email = window.localStorage.getItem("register");
   const [OTP, setOTP] = useState();
   const [resendStatus, setResendStatus] = useState("");

   const [width, setWidth] = useState(window.innerWidth);
   const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
   };
   useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
         window.removeEventListener("resize", handleWindowSizeChange);
      };
   }, []);   


   let data = window.localStorage.getItem("data");
   let device = sha256(JSON.parse(data).appid + "+" + email);

   // useEffect(() => {
   //    if(UserStatus !== "exists"){
   //    axiosInstance
   //    .post("/members/", {action: "register",
   //    device: device,
   //    email: email,
   //    })
   //    .then(async (response) => {
   //       // setErrors({ email: 'This is a dummy procedure error' });
   //       let data = response.data;

   //       setCookie("isLoggedIn", email, 30);
         
   //    })
   //    .catch(function (error) {
   //       console.log(error);
   //       // toast.error("UserName Already Exist!");
        
   //    });}
   // }, [])
   

   useEffect(() => {
      axiosInstance
         .post(
            "/sendgrid/",
            { action: "otp" },
            {
               headers: {
                  credsend: email,
               },
            }
         )
         .then(function (response) {
            setOTP(response.data.otp);
         })
         .catch(function (errors) {
            console.log(errors);
         });
   }, []);

   const sendgridResend = async () => {
      await axiosInstance
         .post(
            "/sendgrid/",
            { action: "otp" },
            {
               headers: {
                  credsend: email,
               },
            }
         )
         .then(function (response) {
            setOTP(response.data.otp);
            
         })
         .catch(function (errors) {
            console.log(errors);
         });
   };

   let UserStatus = window.localStorage.getItem("status");
   console.log("UserStatus", UserStatus);

   const handleSubmitThird = async (values, setSubmitting) => {
      setCookie("isLoggedIn", email, 30);
      setCookie("isVerifiedLogin", true, 30);
      setAuthenticated(true);
      // axiosInstance.post("/sendgrid/sendgrid_loginmsg.php",
      //    {
      //       "action": "verify"
      //    },
      //    {
      //       headers: {
      //          "credsend": email
      //       }
      //    }).then(function (request, response) {
      //       console.log("request", request)
      //       navigate("/MainLandingPage");
      //    }).catch(function (errors) {
      //       console.log(errors)
      //    })
      // if (UserStatus === "exists") {
      //    navigate("/MainLandingPage");
      // } else {
      //    navigate("/Info");
      // }
      navigate("/MainLandingPage");
      setSubmitting(false);
   };

   const handleChangeStatus = () => {
      // preventDefault();
      setResendStatus("OTP has been resend");
   };

   return (
      <Formik
         initialValues={{ code: "" }}
         validate={(values) => {
            const errors = {};
            if (!values.code) {
               errors.code = "Please enter the code";
               setResendStatus("");
            } else if (
               values.code !== OTP &&
               process.env.NODE_ENV === "production"
            ) {
               errors.code = "Incorrect OTP";
               setResendStatus("");
            }
            return errors;
         }}
         onSubmit={async (values, { setSubmitting }) => {
            await handleSubmitThird(values, setSubmitting);
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
                     <img src={extras.mainLogo} alt="" className="img-fluid" />
                  </div>
                  <div className={styles["place-input"]}>
                  <h1 className={styles["email-enter"]}>
                  PASSCODE
               </h1>
               {width>=475 ? <h4 className={styles["email-enters"]}>
               We&apos;ve sent your one-time <br/> passcode to your email.
            </h4>:<h4 className={styles["email-enters"]}>
            We&apos;ve sent your one-time passcode to your email.
         </h4>}

                     <h4
                        className={
                           styles["sub-code"] + " " + styles["no-error"]
                        }
                        
                     >
                        Enter your code:
                     </h4>
                     <input
                        type="password"
                        name="code"
                        placeholder=""
                        className={styles["form-control"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                     />
                     {resendStatus == "" ? (
                        <span className={styles["form-error"]}>
                           {errors.code && touched.code && errors.code}
                        </span>
                     ) : (
                        <span className={styles["form-error"]}>
                           {resendStatus}
                        </span>
                     )}
                  </div>
                  <div
                  className={styles["tour"]}
                  onClick={() => {
                     handleChangeStatus();
                     sendgridResend();
                  }}
               >
                  <Link to="">Resend access code</Link>
               </div>
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className={styles["dmd-btn"]}
                  >
                     Continue
                  </button>
               </div>
            </form>
         )}
      </Formik>
   );
};

export default ThirdSignupScreen;

