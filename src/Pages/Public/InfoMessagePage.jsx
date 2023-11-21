import React, { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
import parse from "html-react-parser";
// import "./styleModulesPublic/infoMessagePage.scss";
import styles from "./styleModulesPublic/infoMessagePage.module.scss";
import { appendScript } from "src/hooks/appendScript";
import { useNavigate } from "react-router";
import { extras } from "src/data/constants";

const InfoMessagePage = ({ CloseModel }) => {
   const [datas, setDatas] = useState([]);
   const navigate = useNavigate();

   const handaleNavigate = () => {
      navigate("/MainLandingPage");
   };

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
      <div className={styles.infoHomePage}>
         <div className={styles["header-logo"]}>
            <img src={extras.mainLogo} alt="" />
         </div>
         <div className={styles.InfoMessageSectionPage}>
            {datas && datas?.content && parse(`${datas.content}`)}
            {datas && datas?.content && (
               <div className={styles.Infobtn}>
                  <button
                     type="button"
                     className={styles["dmd-btn"]}
                     onClick={handaleNavigate}
                  >
                     Continue
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default InfoMessagePage;
