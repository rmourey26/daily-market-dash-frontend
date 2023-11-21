import React, { useState } from "react";
import { popups } from "src/data/constants";
// import "./style.scss";
import styles from "./WelcomePopup.module.scss";
import axiosInstance from "src/services/axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from "src/utils/Cookies";

const WelcomePopUp = ({
  // CloseModel,
  data,
  data1,
  welPopUpPage,
  // heading,
  nav,
  handlecontinue,
  btnContinue,
  setCloseGameh2h
}) => {
  const [rules, setRules] = useState(false);
  // const [h2hrule, setH2hrule] = useState(false);
  // const [h2hrule, setH2hrule] = useState(false);

  const showRules = () => {
    setRules(!rules);
   
  };
 






  const handleupdate = () =>{
    if(welPopUpPage == "true"){
      axiosInstance
         .post("/members/", {
            action: "rules",
            daily:"agreed"
         })
         .then(function (response) {
         })
         .catch(function (errors) {
            console.log(errors);
         });
    }
    else if(welPopUpPage=="false"){
      axiosInstance
      .post("/members/", {
         action: "rules",
         brackets:"agreed"
      })
      .then(function (response) {
      })
      .catch(function (errors) {
         console.log(errors);
      });
    }
  handlecontinue()
  }

  const handleCloseh2hPopup = () => {
    setCookie("welPopupCloseh2h", true, 30);
    setCloseGameh2h(true)
  };

  return (
    data !== "undefined" && (
      <div className={styles.WelcomedmdParent}>
        <div className={styles.overlay}></div>
        <div className={styles.welcomeDMD}>
       {rules && <button className={styles.btn_closeme} onClick={showRules}>
        {/* <i className="fa-solid fa-xmark"></i> */}
        &times;
        </button>}
          {/*<div className="welcomeHead"><h1>{heading}</h1></div>*/}
          <div className={styles.welcomemessage}>
            <div className={styles.content}>
              {rules === true
               ?data1:
                 data}
            </div>
          </div>
          <div className={styles.welcomebutton}>
            <div
              className={
                btnContinue == ""
                  ? styles.butns
                  // styles["butns"] + " " + styles["btnContinue"]
                  : styles.butns
              }
            >
              <button onClick={nav}>Exit DTWars</button>

               <button onClick={showRules}>
             {popups.welcomepopup.readrules}
              </button>

              
              {btnContinue == "" ? (
                <button onClick={handleCloseh2hPopup}>Close</button>
              ) : (
                <button onClick={handleupdate}>{btnContinue}</button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default WelcomePopUp;
