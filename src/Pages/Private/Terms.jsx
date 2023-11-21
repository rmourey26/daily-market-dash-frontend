import React, { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
import parse from "html-react-parser";
// import "./styleModulesPrivate/termsPage.scss";
import styles from "./styleModulesPrivate/Terms.module.scss";

const TermsMessagePage = ({ CloseModel }) => {
   const [datas, setDatas] = useState([]);

   useEffect(() => {
      const getSettingsData = async () => {
         await axiosInstance
            .post("/settings/", {
               action: "register",
            })
            .then(function (response) {
               setDatas(response.data.html[2]);
            })
            .catch(function (errors) {
               console.log(errors);
            });
      };

      getSettingsData();
   }, []);

   return (
      <div className={styles.TermHomePage}>
         <div className={styles.TermMessageSectionPage}>
            {datas && datas?.content && parse(`${datas.content}`)}
            <div className={styles.Termbtn}></div>
         </div>
      </div>
   );
};

export default TermsMessagePage;
