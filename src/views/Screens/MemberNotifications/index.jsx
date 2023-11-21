import React from "react";
import { useState } from "react";
// import axiosInstance from "src/services/axios";
import ReadMessage from "./Messagetype/ReadMessage";
import NewMessage from "./Messagetype/NewMessage";
// import "./style.scss";
import styles from "./MemberNotification.module.scss";

const TABs = [
   { value: "newmessage", labal: "New Messages" },
   { value: "readmessage", labal: "Read Messages" },
];
const MemberNotifications = ({ CloseModel }) => {
   const [currentTab, setCurrentTab] = useState(TABs[0].value);

   const handleTabChange = (value) => {
      setCurrentTab(value);
   };

   const getTabContent = () => {
      switch (currentTab) {
         case "newmessage":
            return <NewMessage />;
         case "readmessage":
            return <ReadMessage />;

         default:
            return <NewMessage />;
      }
   };

   return (
      <div className={styles["member-notification-section"]}>
         <div className={styles["member-notification"]}>
            <button
               onClick={() => CloseModel(false)}
               className={styles["btn-all"] + " " + styles["btn-add"]}
            >
               X
            </button>
            <div className={styles["tab-head"]}>
               <h2>Member Notifications</h2>
            </div>
            <div className={styles["tabs-body"]}>
               <div className={styles.tabs}>
                  {TABs.map((tab) => (
                     <div
                        className={`${styles.tab} ${tab.value === currentTab ? `${styles.active}` : ""
                           }`}
                        onClick={() => handleTabChange(tab.value)}
                        key={tab.value}
                     >
                        <span>{tab.labal}</span>
                     </div>
                  ))}
               </div>

               {getTabContent()}
            </div>
            {/* <div className="tab-button">
               <div className="row">
                  <button type="button" onClick={() => CloseModel(false)}>
                     Cancel
                  </button>
                  <button type="button">Save Changes</button>
               </div>
            </div> */}
         </div>
      </div>
   );
};

export default MemberNotifications;
