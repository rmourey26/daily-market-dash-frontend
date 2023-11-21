import React, { useState, useRef } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axiosInstance from "src/services/axios";
import { setCookie } from "src/utils/Cookies";
import { sha256 } from "js-sha256";
// import { sha224 } from "js-sha256";
// import "./style.scss";
import "../../views/Screens/SignupSteps/style.scss";
import { avatars, checkIcon, uploadIcon } from "src/data/assets";
import { updateUser } from "src/services/firebase";
import { useAuth } from "src/hooks/useAuth";
import PrivacyMessageModal from "src/components/Modals/PrivacyModalPopup/Index";
import TermMessageModal from "src/components/Modals/TermsModalPopup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { extras } from "src/data/constants";
import styles from "./styleModulesPublic/SecongSignUpScreen.module.scss";
import ReactCrop, {
   centerCrop,
   makeAspectCrop,
   PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./profileCrop/canvasPreview";
import { useDebounceEffect } from "./profileCrop/useDebounceEffect";
import User_profileUpdate from "src/components/Modals/profileUploadPopup/User_profileUpdate";
import ProfileWebCam from "./profileuploadviacamera/webcam";
import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
   return centerCrop(
      makeAspectCrop(
         {
            unit: "%",
            width: 90,
         },
         aspect,
         mediaWidth,
         mediaHeight
      ),
      mediaWidth,
      mediaHeight
   );
}

const SecondSignupScreen = () => {
   const navigate = useNavigate();
   const [avatar, setAvatar] = useState(1);
   const [value, setValue] = useState("");
   const [images, setImages] = useState("");
   const { auth } = useAuth();
   const [privacyPopup, setPrivacyPopup] = useState(false);
   const [terms, setTerms] = useState(false);
   const [userNameExist, setUserNameExist] = useState(false);
   const [loading, setLoading] = useState(false);

   const [imgSrc, setImgSrc] = useState("");
   const previewCanvasRef = useRef(null);
   const imgRef = useRef(null);
   const [crop, setCrop] = useState();
   const [completedCrop, setCompletedCrop] = useState();
   const [scale, setScale] = useState(1);
   const [rotate, setRotate] = useState(0);
   const [aspect, setAspect] = useState(16 / 9);
   const [previewcrop, setPreviewcrop] = useState("");
   const [userProfilePopup, setUserProfilePopup] = useState(false);

   const [picture, setPicture] = useState("");
   const [webcamactive, setWebCamActive] = useState(false);

   console.log("userProfilePopup", userProfilePopup);
   console.log("picture", picture);

   function onSelectFile(e) {
      if (e.target.files && e.target.files.length > 0) {
         setCrop(undefined); // Makes crop preview update between images.
         const reader = new FileReader();
         reader.addEventListener("load", () =>
            setImgSrc(reader.result?.toString() || "")
         );
         reader.readAsDataURL(e.target.files[0]);
      }
      setUserProfilePopup(false);
   }
   function onImageLoad(e) {
      if (aspect) {
         const { width, height } = e.currentTarget;
         setCrop(centerAspectCrop(width, height, aspect));
      }
   }

   useDebounceEffect(
      async () => {
         if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
         ) {
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(
               imgRef.current,
               previewCanvasRef.current,
               completedCrop,
               setPreviewcrop
            );
         }
      },
      100,
      [completedCrop]
   );

   console.log("completedCrop", completedCrop);

   const handleprivacy = (event) => {
      event.preventDefault();
      setPrivacyPopup(true);
      // console.log(infoPopup)
   };

   const handleterms = (event) => {
      event.preventDefault();
      setTerms(true);
      // console.log(infoPopup)
   };

   const handleAvatarUpdate = (id) => setAvatar(id);
   const handleChangeUser = (event) => {
      setValue(event.target.value);
   };
   const AvatarSrc = (no) => {
      var s = no.split("_")[1];
      var imageNo = s.split(".")[0];
      setImages(imageNo);
      console.log("part", imageNo);
   };

   // console.log("croppedImageUrl", croppedImageUrl, "crop", crop, "src", src);

   //  console.log("resizedImage", resizedImage, "selectedFile", selectedFile);

   // const handleFileUpload = () => {
   //    const formData = new FormData();
   //    formData.append("file", resizedImage);

   //    // const base64String = resizedImage.split(",")[1];
   //    // console.log("base64String", base64String);
   //    // formData.append("base64Image", base64String);

   //    axiosInstance
   //       .post("/members/", {
   //          action: "avatar",
   //          filetype: "base64",
   //          device: device,
   //          binary: resizedImage,
   //       })
   //       .then(async (response) => {
   //          console.log("File uploaded successfully", response);
   //       })
   //       .catch((error) => {
   //          console.error("Error uploading file: ", error);
   //       });
   // };

   // // const url = window.location.href.includes;
   // if (previewImage) {
   //    // Example: Print the selected file name
   //    console.log("resized", resizedImage, "selected file", selectedFile);
   //    handleFileUpload();
   // }

   const handleFormSubmit = async (values, setSubmitting) => {
      // setUserNameExist(false);
      setLoading(true);
      let email = window.localStorage.getItem("register");
      let data = window.localStorage.getItem("data");
      // let data = window.localStorage.getItem('appId')
      let device = sha256(JSON.parse(data).appid + "+" + email);
      // let device = sha256(data + '+' + email)
      // let device = window.localStorage.getItem('deviceId')

      let action = {
         action: "register",
         device: device,
         email: email,
         terms: 1,
         privacy: 1,
         marketing: 1,
         username: values.name,
         avatar: images ? images : 1,
         private: values.private ? 1 : 0,
         handle: values.name,
         binary: previewcrop ? previewcrop : picture,
      };

      setTimeout(() => {
         axiosInstance
            .post("/members/", action)
            .then(async (response) => {
               // setErrors({ email: 'This is a dummy procedure error' });
               let data = response.data;
               if (data.status === "exists") {
                  // setErrors({ email: 'Email already exists' });
               } else {
                  // window.sessionStorage.setItem('register', values.email)
               }
               // setCookie("isLoggedIn", device, 30);

               // Update username if given
               if (
                  values.name &&
                  values.name !== auth.username &&
                  auth.userId !== ""
               )
                  await updateUser(auth.userId, {
                     email,
                     username: values.name,
                     avatar: images ? images : 1,
                  });

               setCookie("isLoggedIn", email, 30);
               navigate("/SecondSignupScreen");
               setLoading(false);
               // navigate("/TermsandConditions");
            })
            .catch(function (error) {
               // console.log(error);
               toast.error("UserName Already Exist!");
               setUserNameExist(true);
               setLoading(false);
            });
         // alert(JSON.stringify(values, null, 2));
         setSubmitting(false);
      }, 400);
   };

   // const notify = () => toast("UserName Already Exist!");

   return (
      <Formik
         initialValues={{
            termsofexperience: false,
            privacypolicy: false,
            unsubscribe: false,
         }}
         validate={(values) => {
            const errors = {};
            if (!values.name) {
               errors.name = "Username can't be Empty";
            } else if (!values.termsofexperience) {
               errors.termsofexperience =
                  "Please check the Terms of Experience";
            }
            // else if (!values.privacypolicy) {
            //    errors.privacypolicy = "Please check the Privacy Policy";
            // }
            return errors;
         }}
         onSubmit={async (values, { setSubmitting, setErrors }) => {
            await handleFormSubmit(values, setSubmitting);
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
                          styles["spinner-loads"]
                        : styles["welcome-us"] + " " + styles["main-loader"]
                  }
               >
                  <div className={styles["app_loader"]}>
                     <img
                        src={extras.mainLogo}
                        alt=""
                        className={styles["img-fluid"]}
                     />
                  </div>

                  <div className={styles["place-market-dash"]}>
                     <h6 className={styles.red}>
                        Welcome to Day Trading Wars.
                     </h6>
                     <p className={styles["stock-content"]}>
                        You have now joined the most exciting stock market
                        competition online where you use our money to build your
                        own portfolio based on your special skills, and your
                        market knowledge. Every day, you will be competing for
                        the Daily Prize. If you are really awesome you might be
                        invited to the Brackets Contest competition with even
                        more chances to win!
                     </p>
                     <p
                        className={
                           styles["stock-content"] + " " + styles["last"]
                        }
                     >
                        Do you want to complete your account setup at this time?
                        This is optional, and you can complete this information
                        at a later time.
                     </p>
                     <form className={styles.termsofusers}>
                        <input
                           type="text"
                           name="name"
                           placeholder="Username"
                           className={styles["form-control"]}
                           onChange={handleChange}
                           value={values.name}
                        />
                        {userNameExist === true && <ToastContainer />}
                        <span
                           className={
                              styles["form-error"] +
                              " " +
                              styles["form-error-user"]
                           }
                        >
                           {errors.name && errors.name}
                        </span>
                        <label className={styles.wish}>
                           I wish to keep my username and avatar private
                           <input
                              type="checkbox"
                              name="private"
                              value="false"
                           />
                           <span className={styles.checkmark}></span>
                        </label>
                        {/* {previewImage && <img src={previewImage} alt="Preview" />} */}
                        <div
                           className={styles["uploadAvtarSection"]}
                           style={{ width: "220px", position: "relative" }}
                        >
                           <div>
                              <div>
                                 {picture && <img src={picture} />}
                                 {webcamactive && (
                                    <ProfileWebCam
                                       setPicture={setPicture}
                                       picture={picture}
                                       setUserProfilePopup={setUserProfilePopup}
                                       onSelectFile={onSelectFile}
                                    />
                                 )}
                              </div>
                           </div>
                           {!webcamactive && (
                              <div>
                                 {!!imgSrc && (
                                    <ReactCrop
                                       crop={crop}
                                       onChange={(_, percentCrop) =>
                                          setCrop(percentCrop)
                                       }
                                       onComplete={(c) => setCompletedCrop(c)}
                                       aspect={aspect}
                                    >
                                       <img
                                          ref={imgRef}
                                          alt="Crop me"
                                          src={imgSrc}
                                          style={{
                                             transform: `scale(${scale}) rotate(${rotate}deg)`,
                                          }}
                                          onLoad={onImageLoad}
                                       />
                                    </ReactCrop>
                                 )}
                                 {!!completedCrop && (
                                    <>
                                       <div className="profileCanvas">
                                          <canvas
                                             ref={previewCanvasRef}
                                             style={{
                                                border: "1px solid black",
                                                objectFit: "contain",
                                                width: completedCrop.width,
                                                height: completedCrop.height,
                                             }}
                                          />
                                       </div>
                                    </>
                                 )}
                              </div>
                           )}

                           <label
                              onClick={() => {
                                 setUserProfilePopup(true);
                                 setWebCamActive(false);
                              }}
                           >
                              Pick your avatar
                           </label>
                        </div>
                     </form>

                     <div
                        className={styles["private-avatar"]}
                        style={{ marginBottom: "15px" }}
                     >
                        <div className={styles["avatar-wrapper"]}>
                           {previewcrop && (
                              <div className={styles["active"]}>
                                 <img alt="" src={previewcrop} />
                              </div>
                           )}

                           {picture && (
                              <div className={styles["active"]}>
                                 <img alt="" src={picture} />
                              </div>
                           )}
                           {avatars.map((item) => (
                              <div
                                 onClick={() => {
                                    handleAvatarUpdate(item.id);
                                    AvatarSrc(item.src);
                                    setPreviewcrop("");
                                    setPicture("");
                                 }}
                                 key={`${item.id}-id`}
                                 className={`${
                                    item.id === avatar &&
                                    !previewcrop &&
                                    !picture
                                       ? styles["active"]
                                       : ""
                                 }`}
                              >
                                 <img src={item.src} alt="Avatar" />
                                 <span className={styles["over-icon"]}>
                                    <img
                                       src={
                                          item.id === avatar
                                             ? checkIcon
                                             : uploadIcon
                                       }
                                       alt=""
                                    />
                                 </span>
                              </div>
                           ))}
                        </div>
                     </div>
                     <label className={styles.container}>
                        I have read and agree to the{" "}
                        <Link
                           to=""
                           className={styles["conditonal-links"]}
                           onClick={handleterms}
                        >
                           Terms of Experience
                        </Link>
                        {/* <a href="#" onClick={handleInfo} className="conditonal-links">Terms of Experience</a> */}
                        <input
                           type="checkbox"
                           name="termsofexperience"
                           value={values.termsofexperience}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           checked={values.termsofexperience}
                        />
                        <span className={styles.checkmark} />
                        <span className={styles["form-error"]}>
                           {errors.termsofexperience &&
                              touched.termsofexperience &&
                              errors.termsofexperience}
                        </span>
                     </label>
                     <label className={styles.container}>
                        I have read and agree to the{" "}
                        <Link
                           to=""
                           className={styles["conditonal-links"]}
                           onClick={handleprivacy}
                        >
                           Privacy Policy
                        </Link>
                        <input
                           type="checkbox"
                           name="privacypolicy"
                           value={values.privacypolicy}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           checked={values.privacypolicy}
                        />
                        <span className={styles.checkmark} />
                        <span className={styles["form-error"]}>
                           {errors.privacypolicy &&
                              touched.privacypolicy &&
                              errors.privacypolicy}
                        </span>
                     </label>
                     <label className={styles.container}>
                        I agree to have Day Trading Wars send me informational
                        messages from time-to-time. I understand I can
                        unsubscribe to these at any time.
                        <input
                           type="checkbox"
                           name="unsubscribe"
                           value={values.unsubscribe}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           checked={values.unsubscribe}
                        />
                        <span className={styles.checkmark} />
                        <span className={styles["form-error"]}>
                           {errors.unsubscribe &&
                              touched.unsubscribe &&
                              errors.unsubscribe}
                        </span>
                     </label>
                  </div>
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className={styles["dmd-btn"]}
                     // onClick={notify}
                  >
                     Continue
                  </button>
                  <div className={styles["terms-policy"]}>
                     <ul>
                        <li>
                           <Link to="/Terms" target="_blank">
                              Terms
                           </Link>
                        </li>
                        <li>
                           <Link to="/Privacy" target="_blank">
                              Privacy
                           </Link>
                        </li>
                     </ul>
                  </div>
               </div>
               {privacyPopup === true && (
                  <PrivacyMessageModal CloseModel={setPrivacyPopup} />
               )}

               {terms && <TermMessageModal CloseModel={setTerms} />}
               {userProfilePopup && (
                  <User_profileUpdate
                     setWebCamActive={setWebCamActive}
                     setUserProfilePopup={setUserProfilePopup}
                     onSelectFile={onSelectFile}
                  />
               )}
            </form>
         )}
      </Formik>
   );
};

export default SecondSignupScreen;
