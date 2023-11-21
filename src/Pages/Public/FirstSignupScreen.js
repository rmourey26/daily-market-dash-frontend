import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router";
// import { userInfo } from "src/data/userInfo";
import { Link } from "react-router-dom";
import axiosInstance from "src/services/axios";
import { deleteAllCookies, getCookie } from "src/utils/Cookies";
import { sha256 } from "js-sha256";
// import { getCookie, setCookie } from "src/utils/Cookies";
import { createUser, getUserByEmail } from "src/services/firebase";
import { useAuth } from "src/hooks/useAuth";
import { useChat } from "src/hooks/useChat";
import TourModalPopup from "src/components/Modals/TourModalPopup";
import { extras } from "src/data/constants";
// import "../Dashboard/HeadToHead/style.scss";
// import "../../views/Screens/Dashboard/HeadToHead/style.scss";
// import "../index.scss";
// import "../../views/Screens/index.scss";
import styles from "./styleModulesPublic/FirstSignupScreen.module.scss";
import moment from "moment/moment";
import { addSecure } from "src/data/addSecure";

const FirstSignupScreen = () => {
   const navigate = useNavigate();
   const { setAuth } = useAuth();
   const { setChatInitial } = useChat();
   const [closeModal, setCloseModal] = useState(true);
   const openModal = () => setCloseModal(false);
   const [loading, setLoading] = useState(false);

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

   useEffect(() => {
      localStorage.removeItem("LogingProcess");
   }, [])
   

   let alreadyLoggedInEmail = getCookie("isLoggedIn");

   var date = moment();

   var currentDate = date.format("YYYY-MM-DD");
   // console.log("currentDate", currentDate);

   const handleEmailSubmit = async (values, setSubmitting) => {
      setLoading(true);
      let action = {
         action: "status",
         member: values.email,
      };

      if (currentDate.toString() < addSecure.earlyAccessDate) {
         await axiosInstance
            .post("/earlyaccess/", {
               action: "verify",
               email: values.email,
            })
            .then(async (response) => {
               if (response.data.status === "unknown") {
                  // console.log("status", response)
                  window.location.replace(extras.redirectUrl);
                  return;
               } else {
                  axiosInstance
                     .post("/members/", action)
                     .then(async (response) => {
                        let isUser = getCookie("isLoggedIn");
                        let isVerified = getCookie("isVerifiedLogin");
                        
                        // let existingData = window.localStorage.getItem("data");
                        let existingEmail =
                           window.localStorage.getItem("register");
                        if (isUser !== values.email) {
                           deleteAllCookies();
                        }

                        let data = response.data;
                        window.localStorage.setItem("appid", data.appid);
                        window.localStorage.setItem("status", data.status);
                        let device;
                        if (
                           data.status === "exists" &&
                           existingEmail !== values.email
                        ) {
                           device = sha256(data.appid + "+" + values.email);
                        } else {
                           device = sha256(data.appid + "+" + values.email);
                        }

                        window.localStorage.setItem("deviceId", device);
                        window.localStorage.setItem("register", values.email);
                        window.localStorage.setItem("LogingProcess", values.email);

                        //Create User if not exist in firestore
                        let user = await getUserByEmail(values.email);

                        if (!user) {
                           const username = values.email.split("@")[0];
                           await createUser(
                              values.email,
                              username,
                              data.appid,
                              1
                           );
                           user = await getUserByEmail(values.email);
                        }

                        //Chat set initial
                        setChatInitial();

                        //Update auth content here

                        setAuth({
                           uid: data.appid,
                           userId: user.id,
                           username: user.username,
                           email: user.email,
                           isAuthenticated: false,
                        });
                        setLoading(false);
                        // if (response.data.status === "unknown") {
                        //    window.location.replace(extras.redirectUrl);
                        //    return;
                        // }
                        if (response.data.status === "exists" && isVerified) {
                           if (values.email === isUser) {
                              navigate("/MainLandingPage");
                              return;
                           }
                           navigate("/SecondSignupScreen");
                           return;
                        } else {
                           deleteAllCookies();
                           navigate("/AdditionalPassword");
                           return;
                        }
                     })
                     .catch(function (error) {
                        console.log(error);
                     });
               }
            });
      }
      // setTimeout(() => {
      else {
         axiosInstance
            .post("/members/", action)
            .then(async (response) => {
               let isUser = getCookie("isLoggedIn");
               let isVerified = getCookie("isVerifiedLogin");
               // let existingData = window.localStorage.getItem("data");
               let existingEmail = window.localStorage.getItem("register");
               if (isUser !== values.email) {
                  deleteAllCookies();
               }

               let data = response.data;
               window.localStorage.setItem("appid", data.appid);
               window.localStorage.setItem("status", data.status);
               let device;
               // if (data.status === "exists" && existingEmail !== values.email) {
               //    device = sha256(data.appid + "+" + values.email);
               // } else {
               //    device = sha256(data.appid + "+" + values.email);
               // }

               device = sha256(data.appid + "+" + values.email);
               // console.log("hiii", device, data.appid, data.appid + "+" + values.email)
               // return false
               window.localStorage.setItem("deviceId", device);
               window.localStorage.setItem("register", values.email);
               window.localStorage.setItem("LogingProcess", values.email);

               //Create User if not exist in firestore
               let user = await getUserByEmail(values.email);

               if (!user) {
                  const username = values.email.split("@")[0];
                  await createUser(values.email, username, data.appid, 1);
                  user = await getUserByEmail(values.email);
               }

               //Chat set initial
               setChatInitial();

               //Update auth content here

               setAuth({
                  uid: data.appid,
                  userId: user.id,
                  username: user.username,
                  email: user.email,
                  isAuthenticated: false,
               });
               setLoading(false);
               // if (response.data.status === "unknown") {
               //    window.location.replace(extras.redirectUrl);
               //    return;
               // }
               if (response.data.status === "exists" ) {
                  if (values.email === isUser&& isVerified) {
                     navigate("/MainLandingPage");
                     return;
                  }
                  navigate("/SecondSignupScreen");
                  return;
               } else {
                  deleteAllCookies();
                  navigate("/AdditionalPassword");
                  return;
               }
            })
            .catch(function (error) {
               console.log(error);
            });
      }
      // alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      // }, 400);
   };

   return (
      <React.Fragment>
         <Formik
            initialValues={{ email: alreadyLoggedInEmail, password: "" }}
            validate={(values) => {
               const errors = {};
               if (!values.email) {
                  errors.email = "Please enter the email address";
               } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
               ) {
                  errors.email = "Invalid email address";
               }
               return errors;
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
               await handleEmailSubmit(values, setSubmitting);
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
                     className={
                        loading
                           ? styles["welcome-us"] +
                           " " +
                           styles["main-loader"] +
                           " " +
                           styles["frst"] +
                           " " +
                           styles["spinner-loads"]
                           : styles["welcome-us"] +
                           " " +
                           styles["main-loader"] +
                           " " +
                           styles["frst"]
                     }
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
                           YOUR EMAIL
                        </h1>
                        {width>=475 ?                         <h4
                           className={
                              styles["sub-code"] + " " + styles["no-error"]
                           }
                        >
                           Please share your email address <br/> to continue.
                        </h4>:                        <h4
                        className={
                           styles["sub-code"] + " " + styles["no-error"]
                        }
                     >
                        Please share your email address to continue.
                     </h4>}
 
                        <input
                           type="email"
                           name="email"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.email}
                           placeholder=""
                           className={styles["form-control"]}
                        />
                        <span className={styles["form-error"]}>
                           {errors.email && touched.email && errors.email}
                        </span>
                     </div>
                     <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles["dmd-btn"]}
                     >
                        Continue
                     </button>

                     <div className={styles.tour}>
                        <Link to="" onClick={openModal}>
                           Click here for a tour
                        </Link>
                     </div>
                  </div>
               </form>
            )}
         </Formik>
         {closeModal === false && (
            <TourModalPopup
               data={extras.FirstSignupScreen.youtube}
               setCloseModal={setCloseModal}
            />
         )}
      </React.Fragment>
   );
};

export default FirstSignupScreen;
