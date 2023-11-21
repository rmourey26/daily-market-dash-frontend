import React, { useState, useEffect, useRef } from "react";
import styles from "./accountSettings.module.scss";
// import "./style.scss";
import { Formik } from "formik";
import { avatars } from "src/data/assets";
// import { checkIcon, uploadIcon } from "src/data/assets";
import { sha256 } from "js-sha256";
// import { sha224 } from "js-sha256";
import { Link } from "react-router-dom";
import axiosInstance from "src/services/axios";
import { updateUser } from "src/services/firebase";
import { useAuth } from "src/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateIfMounted } from "use-state-if-mounted";
import { extras } from "src/data/constants";
import ReactCrop, {
   centerCrop,
   makeAspectCrop,
   PixelCrop,
} from "react-image-crop";

import { canvasPreview } from "src/Pages/Public/profileCrop/canvasPreview";
import { useDebounceEffect } from "src/Pages/Public/profileCrop/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import User_profileUpdate from "../profileUploadPopup/User_profileUpdate";
import ProfileWebCam from "src/Pages/Public/profileuploadviacamera/webcam";
import TermMessageModal from "../TermsModalPopup";
import PrivacyMessageModal from "../PrivacyModalPopup/Index";
import heic2any from 'heic2any';
import  Resizer  from 'react-image-file-resizer';
import DailyRulesPopup from "../DailyrulesPopup";
import H2hRulesPopup from "../H2hRulesPopup";
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

const UserAccountSetting = ({ CloseModel }) => {
   let avatarId = localStorage.getItem("avatarId");
   let avatartypeid = localStorage.getItem("avatartype");
   console.log("avatartypeid", avatartypeid, avatarId);
   const [avatar, setAvatar] = useState(avatarId ? avatarId : 1);
   const [avatarnew, setAvatarNew] = useState(null);
   const [avatartype, setAvatarType] = useState(avatartypeid);
   const { auth } = useAuth();
   const [profileData, setProfileData] = useStateIfMounted([]);

   const [imgSrc, setImgSrc] = useState("");
   const previewCanvasRef = useRef(null);
   const imgRef = useRef(null);
   const [crop, setCrop] = useState();
   const [completedCrop, setCompletedCrop] = useState();
   const [scale, setScale] = useState(1);
   const [rotate, setRotate] = useState(0);
   const [aspect, setAspect] = useState(1 / 1);
   const [previewcrop, setPreviewcrop] = useState("");
   const [userProfilePopup, setUserProfilePopup] = useState(false);

   const [picture, setPicture] = useState("");
   const [webcamactive, setWebCamActive] = useState(false);


   const [privacyPopup, setPrivacyPopup] = useState(false);
   const [terms, setTerms] = useState(false);
   const [loadingProfile, setLoadingProfile] = useState(false);
   const [dailyRules, setDailyRules] = useState(false);
   const [H2hRules, setH2hRules] = useState(false);

   let email = window.localStorage.getItem("register");
   let data = window.localStorage.getItem("data");
   let device = sha256(JSON.parse(data).appid + "+" + email);
   const handleAvatarUpdate = (id) => {
      setAvatar(id);
   };
   const [showToast, setShowToast] = useState(false);


   function onSelectFile(e) {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
    
        // Check if the file is in the HEIC format
        if (file.type === 'image/heic') {
          // Convert HEIC to JPG using heic2any
          heic2any({ blob: file, toType: 'image/jpeg', quality: 0.8 })
            .then((conversionResult) => {
              // Resize and compress the converted image
              Resizer.imageFileResizer(
                conversionResult,
                300, // Set the desired width
                300, // Set the desired height
                'JPEG', // Set the desired format
                100, // Set the quality (0-100)
                0, // Set the rotation (0-360)
                (uri) => {
                  // Handle the compressed image URI
                  setCrop(undefined);
                  setImgSrc(uri);
                },
                'base64' // Set the output type ('base64', 'blob', or 'file')
              );
            })
            .catch((error) => {
              console.error('Error converting HEIC to JPG:', error);
            });
        } else {
          // For non-HEIC images, proceed with resizing and compressing as before
          Resizer.imageFileResizer(
            file,
            300, // Set the desired width
            300, // Set the desired height
            'JPEG', // Set the desired format
            100, // Set the quality (0-100)
            0, // Set the rotation (0-360)
            (uri) => {
              // Handle the compressed image URI
              setCrop(undefined);
              setImgSrc(uri);
            },
            'base64' // Set the output type ('base64', 'blob', or 'file')
          );
        }
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

   const handleClickScroll = (avatarId) => {
      const element = document.getElementById(avatarId);
      if (element) {
         // 👇 Will scroll smoothly to the top of the next section
         setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
         }, 500);
      }
   };

   useEffect(() => {
      axiosInstance
         .post("/members/", {
            action: "myprofile",
            device: device,
         })
         .then(function (response) {
            setProfileData(response.data);
            setAvatar(response.data.avatar);
            setAvatarNew(response.data.avatar);
            setAvatarType(response.data.avatartype);
           

            updateUser(auth.userId, {
               avatar: response.data.avatar,
               avatartype: response.data.avatartype,
            });
            localStorage.removeItem("avatarId");
            localStorage.setItem("avatarId", response.data.avatar);
            localStorage.removeItem("avatartype");
            localStorage.setItem("avatartype", response.data.avatartype);
            handleClickScroll(response.data.avatar);
            if (response.data.private == 1) {
               setIsChecked(true);
            }
            if (response.data.terms == 1) {
               setIsTermsChecked(true);
            }
            
            if (response.data.privacy == 1) {
               setIsprivacyChecked(true);
            }
            if (response.data.marketing == 1) {
               setIsMarketingChecked(true);
            }
         })
         .catch(function (errors) {
            console.log(errors);
         });
   }, []);
   const [isChecked, setIsChecked] = useState(false);
   const [isTermsChecked, setIsTermsChecked] = useState(false);
   const [isprivacyChecked, setIsprivacyChecked] = useState(false);
   const [ismarketingChecked, setIsMarketingChecked] = useState(false);

   const handleOnChanges = () => {
      setIsChecked(!isChecked);
   };

   const handleOnTermsChanges = () => {
      setIsTermsChecked(!isTermsChecked);
   };

   const handleOnMarketingChanges = () => {
      setIsMarketingChecked(!ismarketingChecked);
   };

   const handleOnprivacyChanges = () => {
      setIsprivacyChecked(!isprivacyChecked);
   };

   const handleProfileSubmit = async (values, setSubmitting) => {
      let action = {
         action: "profile",
         device: device,
         email: email,
         handle: values.handle,
         marketing: ismarketingChecked ? 1 : 0,
         private: isChecked ? 1 : 0,
         terms: isTermsChecked? 1 : 0,
         privacy: isprivacyChecked? 1: 0,
         avatar: avatar,
         paypal: values.paypal,
         binary: previewcrop ? previewcrop : picture,
      };
      console.log("privacy", values.marketing);
      setLoadingProfile(true)
      
      axiosInstance  
         .post("/members/", action)
         .then(async (response) => {
            if (response.data.status) {
               // console.log(response.data.errornum)
               let errorNum = response.data.errornum;
               console.log("response", response);
               if (errorNum == 2104 || errorNum === undefined) {
                  //update username in firestore here
                  await updateUser(auth.userId, {
                     email: values.email,
                     username: values.handle,
                  });

                  // CloseModel(false);
               } else {
                  setShowToast(true);
                  toast.error("UserName Already Exist!");
               }
               setSubmitting(false);
               // setTimeout(() => {
                  axiosInstance
                     .post("/members/", {
                        action: "myprofile",
                        device: device,
                     })
                     .then(function (response) {
                        updateUser(auth.userId, {
                           avatar: response.data.avatar,
                           avatartype: response.data.avatartype,
                        });
                        setLoadingProfile(false)
                        localStorage.removeItem("avatarId");
                        localStorage.setItem("avatarId", response.data.avatar);
                        localStorage.removeItem("avatartype");
                        localStorage.setItem("avatartype", response.data.avatartype);
         
                        window.localStorage.setItem(
                           "membersProfileInfo",
                           JSON.stringify(response.data)
                        );
                        // if (response.data.avatar) {
                        //    CloseModel(false);
                        // }
                        
                         CloseModel(false);
                     })
                     .catch(function (errors) {
                        console.log(errors);
                     });
               // }, 1000);
            }
         })
         .catch(function (error) {
            console.log(error);
         });
      setSubmitting(false);

   };

 
   console.log("avtar", avatartype, avatar);
   console.log("marketing", ismarketingChecked)
   const handleprivacy = (event) => {
      event.preventDefault();
      setPrivacyPopup(true);
      // console.log(infoPopup)
   };
   console.log(profileData.terms, profileData.privacy,"see data")

   const handleterms = (event) => {
      event.preventDefault();
      setTerms(true);
      // console.log(infoPopup)
   };
  

   return (
      <Formik
         initialValues={{
            email: profileData?.email,
            handle: profileData?.handle,
            paypal: profileData?.paypal,
            private: profileData?.private,
            terms:profileData?.terms,
            privacy: profileData?.privacy,
            marketing:profileData?.marketing
         }}
         enableReinitialize
         validate={(values) => {
            const errors = {};
            if (!values.email) {
               errors.email = "Please enter the email";
            } else if (
               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
               errors.email = "Invalid email address";
            } 
            // else if (!values.paypal) {
            //    errors.paypal = "Please enter the paypal address";
            // } 
            else if (!values.handle) {
               errors.handle = "Please enter the username";
            }

            else if (!isTermsChecked) {
               errors.terms =
                  "Please check the Terms of Experience";
            }
            else if (!isprivacyChecked) {
               errors.privacy = "Please check the Privacy Policy";
            }
            return errors;
         }}
         onSubmit={async (values, { setSubmitting, setErrors }) => {
            await handleProfileSubmit(values, setSubmitting);
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
            <div className={styles.accountsettings_bg}>
               <div className={styles.accountsettings}>
               <div
               className={
                 loadingProfile
                   &&styles["spinner-loads"]
                   
               }
             ></div>
                  <div className={styles.avatar}>
                     <h2>Account Settings</h2>
                     <form onSubmit={handleSubmit}>
                        <label>Email address</label>
                        <input
                           type="email"
                           name="email"
                           placeholder="Email Address"
                           className="form-control"
                           onChange={handleChange}
                           value={values.email}
                           readOnly
                        />
                        <span className="form-error">
                           {errors.email && touched.email && errors.email}
                        </span>
                        <label>Paypal email or Phone Number</label>
                        <input
                           type="text"
                           name="paypal"
                           placeholder="Paypal email or Phone Number"
                           className="form-control"
                           onChange={handleChange}
                           value={values.paypal}
                        />
                        {showToast === true && <ToastContainer />}
                        {/*<span className="form-error">
                           {errors.paypal && touched.paypal && errors.paypal}
            </span>*/}
                        <label>Username</label>
                        <input
                           type="text"
                           name="handle"
                           placeholder="Username"
                           className="form-control"
                           onChange={handleChange}
                           value={values.handle}
                        />
                        <span className="form-error">
                           {errors.handle && touched.handle && errors.handle}
                        </span>
                        <div className={styles.private_avatar}>
                           <label>
                              I wish to keep my username and avatar private
                              <input
                                 type="checkbox"
                                 name="private"
                                 value={values.private}
                                 onChange={handleOnChanges}
                                 onBlur={handleBlur}
                                 checked={isChecked}
                              />
                              <span className={styles.checkmark}></span>
                           </label>

                           <div
                              className="uploadAvtarSection"
                              style={{ width: "220px", position: "relative" }}
                           >
                              <div>
                                 {!picture ? <img src={picture} />  :   <div>
                                    
                                 <ReactCrop
                                    crop={crop}
                                    onChange={(_, percentCrop) =>
                                       setCrop(percentCrop)
                                    }
                                    onComplete={(c) =>
                                       setCompletedCrop(c)
                                    }
                                    aspect={aspect}
                                 >
                                    <img
                                       ref={imgRef}
                                       alt="Crop me"
                                       src={picture}
                                       style={{
                                          transform: `scale(${scale}) rotate(${rotate}deg)`,
                                       }}
                                       onLoad={onImageLoad}
                                    />
                                 </ReactCrop>
                              
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
                           </div>}
                                 {webcamactive && (
                                    <>
                                    <ProfileWebCam
                                       setPicture={setPicture}
                                       picture={picture}
                                       setUserProfilePopup={setUserProfilePopup}
                                       onSelectFile={onSelectFile}
                                    />
                                  
                                 </>
                                 )}
                              </div>

                              {!webcamactive && (
                                 <div>
                                    {!!imgSrc && (
                                       <ReactCrop
                                          crop={crop}
                                          onChange={(_, percentCrop) =>
                                             setCrop(percentCrop)
                                          }
                                          onComplete={(c) =>
                                             setCompletedCrop(c)
                                          }
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
                              >
                                 Pick your avatar
                              </label>
                           </div>

                          

                           <div className={styles.avatar_wrapper}>

                           <div
                           className={styles.uploadIcon}
                           onClick={() => {
                              setUserProfilePopup(true);
                              setWebCamActive(false);
                           }}
                        >
                        
                           <img alt="" src="assets/uploadIcon.png" />
                        </div>


                              {previewcrop && (
                                 <div
                                    className={
                                       previewcrop ? styles["active"] : ""
                                    }
                                 >
                                    <img alt="" src={previewcrop} />
                                 </div>
                              )}
                             

                              {avatarnew !== 0 && avatarnew  &&
                                 avatartype &&
                                 typeof avatarnew == "string" && (
                                    <div
                                       className={
                                          avatar === avatarnew &&
                                          !previewcrop &&
                                          !picture
                                             ? styles["active"]
                                             : ""
                                       }
                                       onClick={() =>
                                          handleAvatarUpdate(avatarnew)
                                       }
                                    >
                                       <img
                                          src={
                                             extras.avatarUrl +
                                             `256_${avatarnew}.${avatartype}`
                                          }
                                          alt=""
                                       />
                                    </div>
                                 )}

                              {avatars.map((item) => (
                                 <div
                                    className={`${
                                       item.id === avatar &&
                                       !previewcrop &&
                                       !picture
                                          ? styles.active
                                          : ""
                                    }`}
                                    id={item.id}
                                    onClick={() => {
                                       handleAvatarUpdate(item.id);
                                       setPreviewcrop("");
                                       setPicture("");
                                    }}
                                    key={`${item.id}-id`}
                                 >
                                    <img src={item.src} alt="Avatar" />
                                    <span className={styles.over_icon}>
                                       {/* <img
                                          src={
                                             item.id === avatar
                                                ? checkIcon
                                                : uploadIcon
                                          }
                                          alt=""
                                       /> */}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>

                       { profileData.terms==0 || profileData.privacy==0 ?( <>
                         <div className={styles.newexperience}>
                          
                           <label className={styles.container}>
                       
                       {/* <a href="#" onClick={handleInfo} className="conditonal-links">Terms of Experience</a> */}
                       <input
                          type="checkbox"
                          name="terms"
                          value={values.terms}
                          onChange={handleOnTermsChanges}
                          onBlur={handleBlur}
                          checked={isTermsChecked}
                          id="checkedOne"
                           className={styles.termscheck}
                       />
                        <label htmlFor="checkedOne"></label>
                       <span className={styles.checkmark} />
                       
                    </label>
                    <div className={styles.profile_error_validation}>
                    <p>
                           I have read and agree to the{" "}
                           <Link
                              to=""
                              className={styles["conditonal-links"]}
                              onClick={handleterms}
                              
                           >
                              Terms of Experience
                           </Link>
                           </p>
                           <span className="form-error" style={{marginTop:"5px"}}>
                           {errors.terms &&
                              touched.terms &&
                              errors.terms}
                        </span>
                        </div>
                        </div>
        
                        <div className={styles.newexperience}>
                                
                                 <label className={styles.container}>
                     
                     <input
                        type="checkbox"
                        name="privacy"
                        value={values.privacy}
                        onChange={handleOnprivacyChanges}
                        onBlur={handleBlur}
                        checked={isprivacyChecked}
                        id="checkedTwo"
                           className={styles.termscheck}
                     />
                      <label htmlFor="checkedTwo"></label>
                     <span className={styles.checkmark} />
                    
                  </label>
                  <div className={styles.profile_error_validation}>
                  <p>
                                 I have read and agree to the{" "}
                     <Link
                        to=""
                        className={styles["conditonal-links"]}
                        onClick={handleprivacy}
                        
                     >
                        Privacy Policy
                     </Link>
                                 </p>
                                 <span className="form-error" style={{marginTop:"5px"}}>
                           {errors.privacy && touched.privacy && errors.privacy}
                        </span>
                        </div>
                        </div>
                        </>):null}
                       

                         <div className={styles.newexperience}>
                                
                                 <label className={styles.container}>
                     
                     <input
                        type="checkbox"
                        name="Agree_msg"
                        value={values.marketing}
                        onChange={handleOnMarketingChanges}
                        onBlur={handleBlur}
                        checked={ismarketingChecked}
                        id="checkedThree"
                           className={styles.termscheck}
                     />
                      <label htmlFor="checkedThree"></label>
                     <span className={styles.checkmark} />
                    
                  </label>
                   <p>I agree to have Day Trading Wars send me infomational messages from time-to-time. I understand I can unsubscribe to these at any time.</p>
                        </div>
                  
                       
                        <div className={styles.update}>
                           <div className={styles.avatar_row}>
                              <div className="col-6">
                                 <button
                                    type="button"
                                    className={styles.dmd_btn}
                                    onClick={() => CloseModel(false)}
                                 >
                                    Cancel
                                 </button>
                              </div>
                              <div className="col-6">
                                 <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className={styles.dmd_btn}
                                    
                                    
                                 >
                                    {" "}
                                    Update
                                 </button>
                              </div>
                           </div>
                        </div>
                        {privacyPopup === true && (
                           <PrivacyMessageModal CloseModel={setPrivacyPopup} />
                        )}
         
                        {terms && <TermMessageModal CloseModel={setTerms} />}
                        {dailyRules && <DailyRulesPopup CloseModel={setDailyRules}/>}
                        { H2hRules && <H2hRulesPopup CloseModel={setH2hRules}/>}
                        {userProfilePopup && (
                           <User_profileUpdate
                              setWebCamActive={setWebCamActive}
                              setUserProfilePopup={setUserProfilePopup}
                              onSelectFile={onSelectFile}
                           />
                        )}
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <div style={{display:'flex', flexDirection:'column', margin:'20px'}}>
                        <span 
                        onClick={()=>{setDailyRules(true)}}
                        style={{color:'black', cursor:'pointer', textDecoration:'underline'}}
                     >
                     Daily and Weekly Rules
                     </span>
                     <span 
                        onClick={()=>{setH2hRules(true)}}
                        style={{color:'black',  marginTop:'15px', cursor:'pointer',  textDecoration:'underline'}}
                     >
                     Battle Royale Rules
                     </span>
                        </div>
                        <div style={{display:'flex', flexDirection:'column',  margin:'20px'}}>
                        <span 
                        onClick={handleterms}
                        style={{color:'black', cursor:'pointer', textDecoration:'underline'}}
                     >
                       View Terms and Conditions
                     </span>
                     <span 
                        onClick={handleprivacy}
                        style={{color:'black', marginTop:'15px', cursor:'pointer',textDecoration:'underline'}}
                     >
                       View Privacy Policy 
                     </span>
                        </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
           
         )}
      </Formik>
   );
};

export default UserAccountSetting;