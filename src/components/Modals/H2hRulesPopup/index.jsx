import React, { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
import parse from "html-react-parser";
import "./style.scss";
import { appendScript } from "src/hooks/appendScript";

const H2hRulesPopup = ({ CloseModel }) => {
   const [datas, setDatas] = useState([]);

   useEffect(() => {
      const getSettingsData = async () => {
         await axiosInstance
            .post("/settings/", {
               action: "all",
            })
            .then(function (response) {
               setDatas(response.data.settings);
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
         <div className="H2hHome">
            <button
               className="btn-all btn-add"
               onClick={() => CloseModel(false)}
            > 
               X
            </button>
            <div className="H2hMessageSection">
               {datas && datas?.h2hrules && parse(`${datas.h2hrules}`)}
            </div>
         </div>
      </div>
   );
};

export default H2hRulesPopup;
