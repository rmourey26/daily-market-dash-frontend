import React, { useState } from "react";
import styles from "./webcame.module.scss";
import Webcam from "react-webcam";
const WebcamComponent = () => <Webcam />;
// const videoConstraints = {
//   width: 400,
//   height: 400,
//   facingMode: 'user',
// }
const ProfileWebCam = ({ setPicture, picture, setUserProfilePopup }) => {
   //   const [picture, setPicture] = useState('')
   setUserProfilePopup(false);
   const webcamRef = React.useRef(null);
   const capture = React.useCallback(() => {
      const pictureSrc = webcamRef.current.getScreenshot();
      setPicture(pictureSrc);
   });

   return (
      <div>
         <div>
            {picture == "" && (
               <Webcam
                  audio={false}
                  height={400}
                  ref={webcamRef}
                  width={400}
                  screenshotFormat="image/jpeg"
                  // videoConstraints={videoConstraints}
               />
            )}
         </div>
         <div>
            {picture != "" ? (
               <button
                  onClick={(e) => {
                     e.preventDefault();
                     setPicture("");
                  }}
                  className={styles["retakeButton"]}
               >
                  Retake
               </button>
            ) : (
               <button
                  onClick={(e) => {
                     e.preventDefault();
                     capture();
                     handleClick();
                  }}
                  className={styles["captureButton"]}
               >
                  Capture
               </button>
            )}
         </div>
      </div>
   );
};
export default ProfileWebCam;
