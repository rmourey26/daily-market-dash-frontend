import React, { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
import parse from "html-react-parser";
// import "./styleModulesPrivate/privacyPage.scss";
import styles from "./styleModulesPrivate/Privacy.module.scss";

const PrivacyMessagePage = ({ CloseModel }) => {
   const [datas, setDatas] = useState([]);

   useEffect(() => {
      const getSettingsData = async () => {
         await axiosInstance
            .post("/settings/", {
               action: "register",
            })
            .then(function (response) {
               setDatas(response.data.html[1]);
            })
            .catch(function (errors) {
               console.log(errors);
            });
      };

      getSettingsData();
   }, []);

   return (
      <div className={styles.PrivacyHomePage}>
         <div className={styles.PrivacyMessageSectionPage}>
            {datas && datas?.content && parse(`${datas.content}`)}
            <div className={styles.Privacybtn}></div>
         </div>
      </div>
   );
};

export default PrivacyMessagePage;
