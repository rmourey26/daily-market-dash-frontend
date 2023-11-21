import React from "react";
// import "./styles.scss";
import styles from "./customModal.module.scss";

function CustomModal({ handleClose, classNames, children }) {
   return (
      <div className={styles.modalBackground}>
         <div className={styles["modalContainer"] + " " + classNames}>
            <div className={styles["modal-title"]}>
               <button
                  className={styles["btn-all"] + " " + styles["btn-add"]}
                  onClick={handleClose}
               >
                  X
               </button>
            </div>
            <div className={styles["modal-body"]}>{children}</div>
         </div>
      </div>
   );
}

export default CustomModal;
