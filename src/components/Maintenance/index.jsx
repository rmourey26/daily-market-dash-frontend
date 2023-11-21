import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "src/services/axios";
import Header from "src/views/Screens/Header";
import parse from "html-react-parser";
import "./style.scss";
import { getCookie, setCookie } from "src/utils/Cookies";
import { extras } from "src/data/constants";
import debounce from "lodash.debounce";

const Maintenance = ({ children }) => {
   const [data, setData] = useState([]);
   let currentVersion = parseFloat(getCookie("appVersion"));
   const getSettingsData = async () =>
      await axiosInstance
         .post("/maintenance/", {
            action: "verify",
         })
         .then(function (response) {
            setData(response.data);
            if (currentVersion != response.data.app_version) {
               if (response.data.active === 0) {
                  window.location.reload(true);
               }
            }
            setCookie("appVersion", response.data.app_version, 365);
         })
         .catch(function (errors) {
            console.log(errors);
         });

   const debouncedSaveMaintenance = useCallback(
      debounce(() => getSettingsData(), extras.setIntervalTime),
      []
   );
   debouncedSaveMaintenance();
   useEffect(() => {
      getSettingsData();
   }, []);
   return data.active === 1 && process.env.NODE_ENV === "production" ? (
      <div className="MaintenancePage">
         <div className="maintainenace-logo">
            <img src="assets/images/logo-dtw.png" alt="" />
         </div>

         <div className="Maintenance-section">
            <div className="heads">
               <h1>Maintenance Alert</h1>
            </div>
            <div className="contents">
               <p>{parse(`${data.html}`)}</p>
               <br />
            </div>
         </div>
         <div className="copyright-section">
            <div className="row">
               <div className="leftside">
                  <div className="mailus">
                     <a href="mailto:dmd@dailymarketdash.com">
                        <img src="assets/images/icons/envelope.png" />
                     </a>
                  </div>
               </div>
               <div className="rightside">
                  <div className="copyrights">
                     <p>&copy; 2021-2022, Daily Market Dash</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   ) : (
      children
   );
};
export { Maintenance };
