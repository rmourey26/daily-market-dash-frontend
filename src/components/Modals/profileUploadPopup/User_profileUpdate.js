import React, { useState } from "react";
import "./user.scss";

const User_profileUpdate = ({
   onSelectFile,
   setWebCamActive,
   setUserProfilePopup,
}) => {
   return (
      <div className="proActarSelection">
         <div className="uploadingWrapper">
            <div
               className="closeme"
               onClick={() => {
                  setUserProfilePopup(false);
               }}
            >
               x
            </div>
            <div className="row">
               <div className="col-6" onClick={() => setWebCamActive(true)}>
                  <div className="uploadingImage">
                     <img src="./assets/choosephoto.jpg" />
                  </div>
                  <div className="uploadContant">
                     <p>Take Photo</p>
                  </div>
               </div>
               <div className="col-6">
                  <div className="Crop-Controls" style={{ display: "none" }}>
                     <input
                        type="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        id="uploadAvtar"
                     />
                  </div>
                  <label htmlFor="uploadAvtar">
                     <div
                        className="uploadingImage"

                        //  onChange={onSelectFile}
                     >
                        {/* <i class="fa-solid fa-camera"></i> */}
                        <img src="./assets/takephoto.jpg" />
                     </div>
                     <div className="uploadContant">
                        <p>Choose Photo</p>
                     </div>
                  </label>
               </div>
            </div>
         </div>
      </div>
   );
};

export default User_profileUpdate;
