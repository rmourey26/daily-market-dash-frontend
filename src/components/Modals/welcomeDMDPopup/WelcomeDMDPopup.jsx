import React, { useState } from "react";
import styles from "./WelcomeDMDPopup.module.scss";
import "./welcomDMDPopUp.scss";

const WelcomeDMDPopup = ({ data, handlecontinue }) => {
  return (
    data !== "undefined" && (
      <div className={styles.MarketDatadmdParent}>
        <div className={styles.overlay}></div>
        <div className={styles.welcomeDMD}>
          <div className={styles["close-me"]} onClick={handlecontinue}>
            X
          </div>
          {/*<div className="welcomeHead"><h1>{heading}</h1></div>*/}
          <div className={styles.welcomemessage}>
            <div className={styles.content}>{data}</div>
          </div>
          {/*<div className={styles.welcomebutton}>
                  <div
                     className={
                        btnContinue == ""
                           ? styles["butns"] + " " + styles["btnContinue"]
                           : styles.butns
                     }
                  >
                     <button onClick={nav}>Exit</button>

                     <button onClick={showRules}>
                        {rules === true
                           ? welPopUpPage === "true"
                              ? popups.welcomepopup.h2hrule
                              : popups.welcomepopup.dailyrule
                           : h2hrule === true
                           ? welPopUpPage === "false"
                              ? popups.welcomepopup.H2H
                              : popups.welcomepopup.dailycontest
                           : welPopUpPage === "false"
                           ? popups.welcomepopup.h2hrule
                           : popups.welcomepopup.dailyrule}
                     </button>
                     {btnContinue == "" ? (
                        ""
                     ) : (
                        <button onClick={handlecontinue}>{btnContinue}</button>
                     )}
                  </div>
                     </div>*/}
        </div>
      </div>
    )
  );
};

export default WelcomeDMDPopup;
