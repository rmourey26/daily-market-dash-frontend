import React from "react";
import { useEffect, useState } from "react";

import styles from "./boosterModal.module.scss";
import axiosInstance from "src/services/axios";
import { useSetting } from "src/hooks/useSetting";

const BoosterModalPopup = ({ handleTogglePopup, customMessage }) => {
   const [boosterdata, setBoosterdata] = useState();
   const [switchBtn, setSwitchBtn] = useState(false);
   const [name, setName] = useState("Use Boost");
   const [btnDisable, setBtnDisable] = useState(false);
   const [buttonDisabled, setButtonDisabled] = useState(false);
   const [statusCode, setStatusCode] = useState('');

   // const [message, setMessage] = useState(false);

   const { setting, toggleTostify } = useSetting();

   useEffect(() => {
      const getBoosterPopupData = async () => {
         await axiosInstance
            .post("/boost/", {
               // token: "good4loadtests",
               action: "status",
               // device:"0ab5221569381bae44779a43acb6e5f8e3ea6b1092adaeaf471589a6db05d8f2",
               email: window.localStorage.getItem("register"),
            })
            .then(function (response) {
               // toast.success("hello");
               // toggleTostify(true)
  
               setBoosterdata(response.data);
               // console.log("booster", response);
            })
            .catch(function (errors) {
               setStatusCode(errors.response.status);
               console.log(errors);

            });
      };

      getBoosterPopupData();
   }, []);

   const closeModal = () => {
      // if (message) {
      //    // alert(message)
      //    customMessage(message, 1)

      // }
      handleTogglePopup();

      // setBoosterPopup(false);
   };

   const BtnSwitcher = () => {
      setName("Confirm Boost");
      
      if (switchBtn) {
         setButtonDisabled(true)
         axiosInstance
            .post("/boost/", {
               // token: "good4loadtests",
               action: "consume",
               // device:"0ab5221569381bae44779a43acb6e5f8e3ea6b1092adaeaf471589a6db05d8f2",
               email: window.localStorage.getItem("register"),
            })
            .then(function (response) {
               setBtnDisable(true);
               // setMessage(response.data.message)
               // toggleTostify(true)
               customMessage(response.data.message, 1);
               setButtonDisabled(true)
               axiosInstance
               .post("/members/", {
                 action: "ranking",
               })
               .then(function (response) {
                 window.localStorage.setItem(
                   "membersInfo",
                   JSON.stringify(response.data)
                 );
               })
               .catch(function (errors) {
                 console.log(errors);
               });   
               closeModal();
               
               // setBoosterdata(response.data);
               console.log("Usebooster", response);
            })
            .catch(function (errors) {
               console.log(errors);
            });
      }
   };
console.log("status: " + statusCode)
   return (
      <>
         {boosterdata ?(
            <div className={styles.boosterMainParent}>
               <div className={styles.boosterMainModal}>
                  <div className={styles.boosterSection}>
                     <div className={styles.boostContainer}>
                        <div className={styles.boostContent}>
                           <div className={styles.boostHead}>
                              <img
                                 src="assets/images/icons/booster.png"
                                 alt=""
                              />
                              <h2>boost your roi</h2>
                           </div>
                           <div className={styles.boostPara}>
                              <p>
                                 Available by subscription only, boost your ROI
                                 by 1% between 12:00 noon and 4:00pm Eastern{" "}
                                 <br />
                                 Time. The boost can only be used once per day,
                                 and only two times every week.
                              </p>
                           </div>
                        </div>
                        <div className={styles.periodicBoost}>
                           <div className={styles.pbRow}>
                              <div className={styles.pCol}>
                                 <div className={styles.bContent}>
                                    <h3>{boosterdata.boosts}</h3>
                                 </div>
                                 <div className={styles.sContent}>
                                    <p>Your</p> <p>Boosts</p>
                                 </div>
                              </div>
                              <div className={styles.pCol}>
                                 <div className={styles.bContent}>
                                    <img
                                       src={
                                          boosterdata.today === 0
                                             ? "assets/images/wrong-01.jpg"
                                             : "assets/images/right-01.jpg"
                                       }
                                       alt=""
                                       id="incorrect"
                                    />
                                 </div>
                                 <div className={styles.sContent}>
                                    <p>Daily</p> <p>Available</p>
                                 </div>
                              </div>
                              <div className={styles.pCol}>
                                 <div className={styles.bContent}>
                                    <img
                                       src={
                                          boosterdata.week === 0
                                             ? "assets/images/wrong-01.jpg"
                                             : "assets/images/right-01.jpg"
                                       }
                                       alt=""
                                       id="correct"
                                    />
                                 </div>
                                 <div className={styles.sContent}>
                                    <p>Weekly</p> <p>Available</p>
                                 </div>
                              </div>
                              <div className={styles.pCol}>
                                 <div className={styles.bContent}>
                                    <img
                                       src={
                                          boosterdata.tod === 0
                                             ? "assets/images/wrong-01.jpg"
                                             : "assets/images/right-01.jpg"
                                       }
                                       alt=""
                                       id="correct"
                                    />
                                 </div>
                                 <div className={styles.sContent}>
                                    <p>Time of</p> <p>Day</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {boosterdata.boosts > 0 &&
                        boosterdata.today === 1 &&
                        boosterdata.tod === 1 &&
                        boosterdata.week === 1 ? (
                           <div className={styles.boostBtnRow}>
                              <div
                                 className={styles.btnOne}
                                 onClick={() => {
                                    setSwitchBtn(true);
                                    BtnSwitcher();
                                 }}
                                 
                              >
                                 <button
                                    type="button"
                                    className={
                                       btnDisable ? styles.Disabled : ""
                                    }
                                    style={{background:"#9DBBAE"}}
                                    disabled={buttonDisabled}
                                 >
                                    {name}
                                 </button>
                              </div>
                              <div className={styles.btnTwo}>
                                 <button
                                    type="button"
                                    className={styles.Disabled}
                                    onClick={closeModal}
                                   
                                 >
                                    {btnDisable === true ? "close" : "cancel"}
                                 </button>
                              </div>
                           </div>
                        ) : (
                           <div className={styles.boostBtnRow}>
                              <div
                                 className={styles.btnOne}
                                 onClick={() => {
                                    closeModal();
                                 }}
                              >
                                 <button
                                    type="button"
                                    className={styles.Disabled}
                                 >
                                    Close
                                 </button>
                              </div>{" "}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         ):(statusCode ==500 &&
            <div className={styles.boosterMainParent}>
            <div className={styles.boosterMainModal}>
               <div className={styles.boosterSection}>
                  <div className={styles.boostContainer}>
                     <div className={styles.boostContent}>
                        <div className={styles.boostHead}>
                           <img
                              src="assets/images/icons/booster.png"
                              alt=""
                           />
                           <h2>boost your roi</h2>
                        </div>
                        <div className={styles.boostPara}>
                           <p>
                           Server Failed to Respond
                           </p>
                        </div>
                        </div>
                        <div className={styles.boostBtnRow}>
                        <div
                           className={styles.btnOne}
                           onClick={() => {
                              closeModal();
                           }}
                        >
                           <button
                              type="button"
                              className={styles.Disabled}
                           >
                              Close
                           </button>
                        </div>{" "}
                     </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        
         )
   
                        }
      </>
   );
};

export default BoosterModalPopup;
