import React, { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
import parse from "html-react-parser";
import "./style.scss";
import { appendScript } from "src/hooks/appendScript";

const PrivacyMessageModal = ({ CloseModel }) => {
   const [datas, setDatas] = useState([]);

   useEffect(() => {
      const getSettingsData = async () => {
         await axiosInstance
            .post("/settings/", {
               action: "register",
            })
            .then(function (response) {
               setDatas(response.data.html[1]);
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
      <div className="outer-home">
         <div className="PrivacyHome">
            <button
               className="btn-all btn-add"
               onClick={() => CloseModel(false)}
            >
               X
            </button>
            <div className="PrivacyMessageSection">
               {datas && datas?.content && parse(`${datas.content}`)}
            </div>
         </div>
      </div>
   );
};

export default PrivacyMessageModal;
