import React, { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
import parse from "html-react-parser";
// import "./style.scss";
import styles from "./InfoMessageModal.module.scss";
import { appendScript } from "src/hooks/appendScript";

const InfoMessageModal = ({ closeModal }) => {
   const [datas, setDatas] = useState([]);

   useEffect(() => {
      const getSettingsData = async () => {
         await axiosInstance
            .post("/settings/", {
               action: "all",
            })
            .then(function (response) {
               setDatas(response.data.html[0]);
               // console.log("htmlfaq", response.data.html[0].content);
               appendScript("assets/js/script.js");
            })
            .catch(function (errors) {
               console.log(errors);
            });
      };

      getSettingsData();
   }, []);

   return (
      <div className={styles["outer-home"]}>
         <div className={styles.infoHome}>
            <button
               className={styles["btn-all"] + " " + styles["btn-add"]}
               onClick={() => closeModal(false)}
            >
               X
            </button>
            <div className={styles.InfoMessageSection}>
               {datas && datas?.content && parse(`${datas.content}`)}
            </div>
         </div>
      </div>
   );
};

export default InfoMessageModal;
