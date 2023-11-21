// import React, { useState, useEffect } from "react";
import React from "react";
// import "./style.scss";
import styles from "./TourModal.module.scss";
const TourModalPopup = ({ setCloseModal, data }) => {
  return (
    <div className={styles["outer-home"]}>
      <div className={styles["tourHome"]}>
        <button
          className={styles["btn-add"]}
          onClick={() => setCloseModal(true)}
        >
          X
        </button>
        <div className={styles.tourMessageSection}>
          <iframe
            frameBorder={0}
            width="100%"
            height="100%"
            src={data}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TourModalPopup;
