import React from "react";
// import axiosInstance from "src/services/axios";
// import "./style.scss";
import styles from "./HoldingModals.module.scss";
import { sha256 } from "js-sha256";
import "src/components/Modals/CustomModal/styles.scss";
import "../../MainLandingPage/Modals/WatchListTabModal/style.scss";

const HoldingModal = ({
   closeModel,
   // openHolding,
   // checkHandle,
   dataHolding,
   // setDataHolding,
}) => {
   // const [data, setData] = useState([]);
   // const [checkhandle, setCheckHandle] = useState([]);
   let email = window.localStorage.getItem("register");
   let localData = window.localStorage.getItem("data");
   let device = sha256(JSON.parse(localData).appid + "+" + email);

   // useEffect(() => {
   //    const getHoldingData = async () => {
   //       axiosInstance
   //          .post("/members/", {
   //             action: "myprofile",
   //             device: device,
   //          })
   //          .then(function (response) {
   //             if (response.data.handle)
   //                axiosInstance
   //                   .post("/brackets/", {
   //                      action: "holdings",
   //                      checkhandle: response.data.handle,
   //                   })
   //                   .then(function (response) {
   //                      setData(response.data.holdings);
   //                   })
   //                   .catch(function (errors) {
   //                      console.log(errors);
   //                   });
   //          })
   //          .catch(function (errors) {
   //             console.log(errors);
   //          });
   //    };
   // }, []);

   // useEffect(() => {
   //    const getSettingsData = async () => {
   //       if (checkhandle)
   //          await axiosInstance
   //             .post("/brackets/", {
   //                action: "holdings",
   //                checkhandle: checkhandle ? checkhandle : "",
   //             })
   //             .then(function (response) {
   //                setData(response.data.holdings);
   //             })
   //             .catch(function (errors) {
   //                console.log(errors);
   //             });
   //    };

   //    getSettingsData();
   // }, [checkhandle]);

   const handleClose = () => {
      closeModel(false);
   };

   return (
      <div className={styles.modalBackground}>
         <div
            className={styles["modalContainer"] + " " + styles["HoldingModal"]}
         >
            <div className={styles.close} onClick={handleClose}>
               X
            </div>
            <div className={styles["modal-body"]}>
               <div className={styles["table-header"]}>
                  <table cellPadding="0" cellSpacing="0" border="0">
                     <thead>
                        <tr>
                           <th>Exchange</th>
                           <th>Ticker</th>
                           <th>Name</th>
                        </tr>
                     </thead>
                  </table>
               </div>
               <div className={styles["table-content"]}>
                  <table cellPadding="0" cellSpacing="0" border="0">
                     <tbody>
                        {dataHolding &&
                           dataHolding.map((stock, i) => (
                              <tr key={i}>
                                 <td>{stock.exchange}</td>
                                 <td>{stock.ticker}</td>
                                 <td>{stock.name}</td>
                              </tr>
                           ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HoldingModal;
