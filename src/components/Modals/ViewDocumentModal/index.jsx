import React, { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
import parse from "html-react-parser";
// import "./style.scss";
import styles from "./ViewDocumentModal.module.scss";
import { appendScript } from "src/hooks/appendScript";

const ViewDocumentModal = ({setViewModelOpen, legals, setZindexHead}) => {
   const [datas, setDatas] = useState([]);

   useEffect(() => {
      const getViewDocData = async (legalscontent) => {
         await axiosInstance
            .post("/members/", {
               action: "legals",
               content:legals
            })
            .then(function (response) {
                console.log("viewdocument",response.data);
               setDatas(response.data);
              
            })
            .catch(function (errors) {
               console.log(errors);
            });
      };

      getViewDocData();
   }, []);

   return (
      <div className={styles["viewDoc_outer-home"]}>
         <div className={styles.viewDoc_Home}>
            <button
               className={styles["viewDoc_btn-all"] + " " + styles["viewDoc_btn-add"]}
               onClick={() =>{ setViewModelOpen(false); setZindexHead(false)}}
            >
               X
            </button>
            <div className={styles.viewDoc_MessageSection} >
               {datas && datas?.content && parse(`${datas.content}`)}
            </div>
         </div>
      </div>
   );
};

export default ViewDocumentModal;
