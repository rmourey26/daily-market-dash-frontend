import React, { useState, useEffect, Fragment } from "react";
import { portfolioAction } from "src/actions/portfolio.actions";
import axiosInstance from "src/services/axios";
import CustomModal from "src/components/Modals/CustomModal";
import { useStateIfMounted } from "use-state-if-mounted";
// import "./style.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSetting } from "src/hooks/useSetting";
import styles from "./WatchlistBuyModal.module.scss";

const InitialSelectedStock = {
   name: "",
   symbol: "",
   mic: "",
   quantity: 1,
};

const WatchListTabModal = ({
   handleTabChangeMain,
   type,
   setNewData,
   closeModal,
   sellData,
   sellDatas,
   sellQuantity,
   selluid,
}) => {
   var readOnly;
   if (type === "sell") {
      readOnly = true;
   } else {
      readOnly = false;
   }
   const { toggleTostify } = useSetting();
   // console.log("sellData", sellData)
   const [quantityValue, setQuantityValue] = useState(0);

   const [message, setMessage] = useState();
   const [data, setData] = useStateIfMounted([]);
   const [searchVal, setSearchVal] = useState();
   const [price, setPrice] = useState();
   const [quantityGreater, setQuantityGreater] = useState(false);
   const [stocks, setStocks] = useState();
   const [showDetails, setShowDetails] = useState(false);
   const [selectedStock, setSelectedStock] = useState(InitialSelectedStock);
   const [tabData, setTabData] = useState({
      buy: false,
      sell: true,
   });
   const [status, setStatus] = useState("block");
   const [disable, setDisable] = useState(false);
   const [limitPurchase, setLimitPurchase] = useState(0);
   const [limitPurchaseCrypto, setLimitPurchaseCrypto] = useState(0);
   const [bank, setBank] = useState(0);
   const [min, setmin] = useState(1);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   useEffect(() => {
      let child1 = document.getElementById("stopScroll");
      let child2 = document.getElementById("scrollStopHeader");
      child1.classList.add("tab-overlay");
      child2.classList.add("active-tp-head");
      if (sellData) {
         const memberDetails = JSON.parse(
            window.localStorage.getItem("membersInfo")
         );

         if (memberDetails) {
            const tempBank =
               memberDetails.bank != 0
                  ? memberDetails.bank
                  : memberDetails.current;

            setBank(tempBank);

            let tempLimitPurchase = Math.floor(
               Number(
                  tempBank /
                     (sellData?.last && sellData?.last != 0
                        ? sellData?.last
                        : sellData?.close && sellData?.close != 0
                        ? sellData?.close
                        : sellData?.open)
               )
            );

            if (isNaN(tempLimitPurchase)) {
               tempLimitPurchase = null;
            }
            setLimitPurchase(tempLimitPurchase);

            let tempLimitPurchaseCrypto = Number(
               tempBank /
                  (sellData?.last && sellData?.last != 0
                     ? sellData?.last
                     : sellData?.close && sellData?.close != 0
                     ? sellData?.close
                     : sellData?.open)
            );
            console.log(tempLimitPurchaseCrypto);
            if (isNaN(tempLimitPurchaseCrypto)) {
               tempLimitPurchaseCrypto = null;
            }

            if (
               Number(
                  sellData?.last && sellData?.last != 0
                     ? sellData?.last
                     : sellData?.close && sellData?.close != 0
                     ? sellData?.close
                     : sellData?.open
               ) > 5000
            ) {
               setLimitPurchaseCrypto(
                  Number(tempLimitPurchaseCrypto).toFixed(2)
               );
            } else {
               setLimitPurchaseCrypto(Math.floor(tempLimitPurchaseCrypto));
            }
         }
      }
      if (sellData) {
         if (sellData.market_mic === "XCRY" || sellData.mic_code === "XCRY") {
            setmin(0);
         }
      }

      if (sellData) {
         if (
            (sellData.market_mic === "XCRY" || sellData.mic_code === "XCRY") &&
            (sellData?.last && sellData?.last != 0
               ? sellData?.last
               : sellData?.close && sellData?.close != 0
               ? sellData?.close
               : sellData?.open) > 5000
         ) {
            setQuantityValue(0.01);
         } else {
            setQuantityValue(1);
         }
      }

      // console.log("log: sellData", sellData);
   }, [sellData]);

   const handleChange = (event) => {
      if (event.target.value === "0") {
         return false;
      }
      if (type !== "sell")
         setPrice(
            sellData.last
               ? sellData.last
               : sellData.close * parseInt(event.target.value) > 1
               ? sellData.last
                  ? sellData.last
                  : sellData.close * parseInt(event.target.value).toFixed(2)
               : sellData.last
               ? sellData.last
               : sellData.close * parseInt(event.target.value)
         );
      let value = event.target.value;
      // if (value <= 0) {
      //    value = 1;
      // }

      if (value > Number(sellData.quantity)) {
         // alert(sellData.quantity)
         // console.log(value, sellData)
         setQuantityGreater(true);
         return;
      }
      // else {
      //    value = sellData.quantity;
      // }
      // else if (value >= sellData.quantity) {
      //    value = sellData.quantity;
      // }
      // alert(value)
      // if (type === "sell") {
      //    setQuantityValue(value);
      // } else {
      //    setQuantityValue(value);
      // }

      setQuantityValue(value);

      // console.log('value is:', event.target.value);
   };

   useEffect(() => {
      // console.log(sellData)
      if (sellData) {
         if (type === "sell") {
            // setQuantityValue(sellData.quantity);
            setQuantityValue(sellQuantity);
         }
         setPrice(sellData.last ? sellData.last : sellData.close);
      }
      // console.log(searchVal)
      const getMarketData = async () => {
         if (searchVal.length >= 3)
            await axiosInstance
               .post("/portfolio/", {
                  action: "search",
                  search: searchVal,
               })
               .then(function (response) {
                  setData(response.data.tickers);
                  setShowDetails(false);
                  // console.log("log:", response);
               })
               .catch(function (errors) {
                  console.log(errors);
               });
      };
      let timer = setTimeout(() => {
         if (searchVal) getMarketData();
      });
      return () => clearTimeout(timer);
   }, [searchVal]);

   const search = (value) => {
      setSearchVal(value);
   };

   // console.log(memberDetails)

   // useEffect(() => {
   //    const addToWatchList = async () => {
   //       // console.log(stocks);
   //       if (stocks)
   //          await axiosInstance
   //             .post("/watchlist/", stocks)
   //             .then(function (response) {
   //                setMessage("Added successfully");
   //                setNewData(response.data.total);
   //                // setData(response.data.tickers);
   //                // console.log("log:", response);
   //             })
   //             .catch(function (errors) {
   //                setMessage("Oops something wrong");
   //                console.log(errors);
   //             });
   //    };
   //    addToWatchList();
   // }, [stocks]);

   useEffect(() => {
      setTimeout(() => setMessage(""), 3000);
   }, [message]);

   useEffect(() => {
      // console.log("log: selec", selectedStock);
   }, [selectedStock]);

   // const addStocks = (market_mic, market_symbol) => {
   //    let addWatchList = {
   //       action: "add",
   //       market_mic: market_mic,
   //       market_symbol: market_symbol,
   //    };
   //    // setStocks({ ...addWatchList });
   //    setStocks(addWatchList);
   // };

   const getStockInfo = async (market_mic, market_symbol) => {
      const stock = data.filter((item) => item.symbol === market_symbol);
      const res = await portfolioAction({
         action: "symbol",
         market_mic,
         market_symbol,
      });
      if (!res || res?.portfolio?.length <= 0) return;

      setSelectedStock({
         name: stock[0].name,
         mic: market_mic,
         price: res.last ? res.last : res.close,
         quantity:
            sellData.market_mic === "XCRY" || sellData.mic_code === "XCRY"
               ? 0
               : 1,
         ...res,
      });
      setShowDetails(true);

      // console.log("log: res", res);
   };

   const handleSubmitBuySell = async () => {
      if (!selectedStock) return alert("Please select stock first!");

      // action: "buy"
      // market_mic: "XNYS"
      // market_symbol: "V"
      // price: 217.16
      // quantity: 1

      let options = {
         action: type,
         // uuid: sellData.uuid,
         uuid: selluid,
         market_symbol: sellData.market_symbol
            ? sellData.market_symbol
            : sellData.symbol,
         market_mic: sellData.market_mic
            ? sellData.market_mic
            : sellData.mic_code,
         quantity: Number(quantityValue ? quantityValue : sellData.quantity),
         // price: Number(sellData.price ? sellData.price : sellData.high) * Number(sellData.quantity ? sellData.quantity : quantityValue),
         // price: Number(sellData.last ? sellData.last : sellData.close),
         price: Number(
            sellData.last && sellData.last != 0
               ? sellData.last
               : sellData.close && sellData.close != 0
               ? sellData.close
               : sellData.open
         ),
      };
      // console.log("log: submit", options);
      setLoading(true);
      const res = await portfolioAction(options);
      // console.log(portfolioAction, "portfolioactions");
      if (res) {
         // setNewData(res.total);
         // sellData(res.total)
         if (type === "buy") {
            // handleTabChangeMain("myprofile")
         }
         // setNewData(options);
         closeModal();
         // toast.success("Your order is placed successfully", {
         //    onOpen: () => toggleTostify(),
         //    onClose: () => toggleTostify()
         // })
         setMessage(tabData.buy ? "Successfully Buy" : "Successfully Sell");
      } else {
         alert("You don't have enough fund available to buy these shares");
         setError(true);
         // toast.error("Sorry your order is not placed", {
         //    onOpen: () => toggleTostify(),
         //    onClose: () => toggleTostify()
         // });
         // closeModal();
      }
      setLoading(false);
   };

   const watchListAdd = async () => {
      var payload = {
         action: "add",
         market_mic: sellData.market_mic,
         market_symbol: sellData.market_symbol,
      };
      await axiosInstance
         .post("/watchlist/", payload)
         .then(function (response) {
            closeModal();
         })
         .catch(function (errors) {
            console.log(errors);
         });
   };

   const handleTabChange = async (e) => {
      let notChanged = e.target.name === "buy" ? "sell" : "buy";
      setTabData({
         [`${e.target.name}`]: e.target.checked,
         [`${notChanged}`]: !e.target.checked,
      });
   };

   const SellSection = () => {
      return (
         <div className="row">
            <div className={styles["two-half"]}>
               <h3>{sellData.symbol}</h3>
               <h3 className={styles.stkmic}>{sellData.name}</h3>
               <h3 className={styles.stkmic}>{sellData.mic_code}</h3>
            </div>
            <div className={styles["two-half"]}>
               <h6>open</h6>
               <h4>
                  {sellData.open > 1 || sellData.open == 0
                     ? Number(sellData.open).toFixed(2)
                     : sellData.open}
               </h4>
            </div>
            <div className={styles["two-half"]}>
               <h6>low</h6>
               <h4>
                  {sellData.low > 1 || sellData.low == 0
                     ? Number(sellData.low).toFixed(2)
                     : sellData.low}
               </h4>
            </div>
            <div className={styles["two-half"]}>
               <h6>high</h6>
               <h4>
                  {sellData.high > 1 || sellData.high == 0
                     ? Number(sellData.high).toFixed(2)
                     : sellData.high}
               </h4>
            </div>
            <div className="">
               <h6>Last</h6>
               <h4>
                  {/* {sellData.last > 1 || sellData.open == 0
? Number(sellData.last).toFixed(2)
: sellData.last} */}
                  {Number(
                     sellData.last && sellData.last != 0
                        ? sellData.last
                        : sellData.close && sellData.close != 0
                        ? sellData.close
                        : isNaN(sellData.open)
                        ? null
                        : sellData.open
                  ).toFixed(2)}
               </h4>
            </div>
         </div>
      );
   };

   return (
      <CustomModal handleClose={closeModal}>
         <div className={styles["watchlist-popup"]}>
            <div className={styles["watchlist-modal"]}>
               {sellData && (
                  <Fragment>
                     <div style={{ textAlign: "center", color: "#3AD6A1" }}>
                        {message}
                     </div>

                     <div
                        className={`${
                           loading
                              ? styles["profile-second-container"] +
                                " " +
                                styles["sell-order"] +
                                " " +
                                styles["wtch"] +
                                " " +
                                styles["spinner-loads"]
                              : styles["profile-second-container"] +
                                " " +
                                styles["sell-order"] +
                                " " +
                                styles["wtch"]
                        }`}
                     >
                        <h2
                           style={{
                              textAlign: "left",
                              textTransform: "capitalize",
                           }}
                        >
                           {type} Stock
                        </h2>
                        <div className={styles.row}>
                           {type && type == "sell" ? (
                              <div className={styles["two-half"]}>
                                 <h3>{sellData.symbol}</h3>
                                 <h3 className={styles.stkmic}>
                                    {sellData.name}
                                 </h3>
                                 <h3 className={styles.stkmic}>
                                    {sellData.mic_code}
                                 </h3>
                              </div>
                           ) : (
                              <div className={styles["two-half"]}>
                                 <h3>{sellData.market_symbol}</h3>
                                 <h3 className={styles.stkmic}>
                                    {sellData.market_name}
                                 </h3>
                                 <h3 className={styles.stkmic}>
                                    {sellData.market_mic}
                                 </h3>
                              </div>
                           )}
                           <div className={styles["two-half"]}>
                              <h6>open</h6>
                              <h4>
                                 {sellData.open > 1 || sellData.open == 0
                                    ? Number(sellData.open).toFixed(2)
                                    : sellData.open}
                              </h4>
                           </div>
                           <div className={styles["two-half"]}>
                              <h6>low</h6>
                              <h4>
                                 {sellData.low > 1 || sellData.low == 0
                                    ? Number(sellData.low).toFixed(2)
                                    : sellData.low}
                              </h4>
                           </div>
                           <div className={styles["two-half"]}>
                              <h6>high</h6>
                              <h4>
                                 {sellData.high > 1 || sellData.high == 0
                                    ? Number(sellData.high).toFixed(2)
                                    : sellData.high}
                              </h4>
                           </div>
                           <div className="">
                              <h6>Last</h6>
                              <h4>
                                 {/* {sellData.last > 1 || sellData.open == 0
            ? Number(sellData.last).toFixed(2)
            : sellData.last} */}
                                 {Number(
                                    sellData.last && sellData.last != 0
                                       ? sellData.last
                                       : sellData.close && sellData.close != 0
                                       ? sellData.close
                                       : isNaN(sellData.open)
                                       ? null
                                       : sellData.open
                                 ).toFixed(2)}
                              </h4>
                           </div>
                        </div>

                        {/* <div className="buy-btn">
                     <h6>Sell</h6>
                  </div> */}
                        {type && type !== "watchlist" && (
                           <div
                              className={
                                 styles["confirm-order"] +
                                 " " +
                                 styles["wrapper"]
                              }
                           >
                              {type !== "sell" && (
                                 <div className={styles["rocket-notify"]}>
                                    <img
                                       src="assets/images/rocket-launch.png"
                                       alt=""
                                    />
                                 </div>
                              )}
                              <div className={styles["input-section"]}>
                                 <div>
                                    <h3>QUANTITY</h3>
                                    <input
                                       style={{
                                          position: "inherit",
                                          opacity: 1,
                                          cursor: "pointer",
                                          height: "auto",
                                          width: "85px",
                                       }}
                                       type="number"
                                       min={min}
                                       max={sellData.quantity}
                                       step={
                                          (sellData.market_mic === "XCRY" ||
                                             sellData.mic_code === "XCRY") &&
                                          Number(
                                             sellData.last && sellData.last != 0
                                                ? sellData.last
                                                : sellData.close &&
                                                  sellData.close != 0
                                                ? sellData.close
                                                : sellData.open
                                          ) > 5000
                                             ? 0.01
                                             : 1
                                       }
                                       name="quantity"
                                       id="quantity"
                                       onChange={handleChange}
                                       value={
                                          sellData.quantity
                                             ? sellData.quantity
                                             : quantityValue
                                       }
                                       ////comment bcoz crypto > 5000 quantity not working////
                                       // {sellData.market_mic === "XCRY" ||
                                       //    sellData.mic_code === "XCRY"
                                       //       ? // quantityValue
                                       //         sellData.quantity
                                       //          ? sellData.quantity
                                       //          : quantityValue
                                       //       : parseInt(
                                       //            sellData.quantity
                                       //               ? sellData.quantity
                                       //               : quantityValue
                                       //         )
                                       // }
                                       // {...readOnly}
                                       readOnly={readOnly}
                                    />
                                    {/* {(sellData.market_mic === "XCRY" || sellData.mic_code === "XCRY") ? sellData.market_mic + "crypto" : 'stock'} */}
                                 </div>
                                 <div>
                                    <h3>TOTAL Values</h3>
                                    <input
                                       style={{
                                          position: "inherit",
                                          opacity: 1,
                                          cursor: "pointer",
                                          height: "auto",
                                          width: "85px",
                                       }}
                                       type="number"
                                       name="total"
                                       id="total"
                                       value={
                                          (sellData.last && sellData.last != 0
                                             ? sellData.last
                                             : sellData.close &&
                                               sellData.close != 0
                                             ? sellData.close
                                             : sellData.open) *
                                             quantityValue >
                                          // (sellData.quantity
                                          //    ? sellData.quantity
                                          //    : quantityValue)
                                          1
                                             ? (
                                                  (sellData.last &&
                                                  sellData.last != 0
                                                     ? sellData.last
                                                     : sellData.close &&
                                                       sellData.close != 0
                                                     ? sellData.close
                                                     : sellData.open) *
                                                  quantityValue
                                               )
                                                  //   (sellData.quantity
                                                  //      ? sellData.quantity
                                                  //      : quantityValue)
                                                  .toFixed(2)
                                             : (sellData.last &&
                                               sellData.last != 0
                                                  ? sellData.last
                                                  : sellData.close &&
                                                    sellData.close != 0
                                                  ? sellData.close
                                                  : sellData.open) *
                                               quantityValue
                                          //   (sellData.quantity
                                          //      ? sellData.quantity
                                          //      : quantityValue)
                                       }
                                       // value={
                                       //    sellData.last ? sellData.last : sellData.close ? sellData.close : sellData.open * sellData.quantity > 1
                                       //       ? (
                                       //          sellData.last ? sellData.last : sellData.close ? sellData.close : sellData.open * sellData.quantity
                                       //       ).toFixed(2)
                                       //       : sellData.last ? sellData.last : sellData.close ? sellData.close : sellData.open * sellData.quantity
                                       // }

                                       {...readOnly}
                                    />
                                 </div>
                                 {type !== "sell" && error === false && (
                                    <div
                                       className={styles["notification-mess"]}
                                    >
                                       {/* {
                                    quantityGreater === true && <p style={{ color: "#ddac2f" }}>
                                       Sorry quantity of sell is greater than bough
                                    </p>
                                 } */}
                                       {bank >=
                                          Number(
                                             sellData.last && sellData.last != 0
                                                ? sellData.last
                                                : sellData.close &&
                                                  sellData.close != 0
                                                ? sellData.close
                                                : sellData.open
                                          ) *
                                             (quantityValue
                                                ? quantityValue
                                                : 1) && quantityValue > 0 ? (
                                          <p>
                                             You have ${bank} available, you are
                                             allowed to buy between{" "}
                                             {(sellData.market_mic === "XCRY" ||
                                                sellData.mic_code === "XCRY") &&
                                             Number(
                                                sellData.last &&
                                                   sellData.last != 0
                                                   ? sellData.last
                                                   : sellData.close &&
                                                     sellData.close != 0
                                                   ? sellData.close
                                                   : sellData.open
                                             ) > 5000
                                                ? 0.01
                                                : 1}{" "}
                                             and{" "}
                                             {sellData.market_mic === "XCRY" ||
                                             sellData.mic_code === "XCRY"
                                                ? limitPurchaseCrypto
                                                : limitPurchase}{" "}
                                             shares
                                          </p>
                                       ) : (
                                          <p style={{ color: "#ddac2f" }}>
                                             Sorry you don&apos;t have enough
                                             Balance
                                          </p>
                                       )}
                                    </div>
                                 )}
                                 <div className={styles["order-type"]}>
                                    <button onClick={closeModal}>
                                       Cancel {type} Order
                                    </button>
                                    {type !== "sell" &&
                                       (bank >=
                                          Number(
                                             sellData.last && sellData.last != 0
                                                ? sellData.last
                                                : sellData.close &&
                                                  sellData.close != 0
                                                ? sellData.close
                                                : sellData.open
                                          ) *
                                             (quantityValue
                                                ? quantityValue
                                                : 1) && quantityValue > 0 ? (
                                          <button
                                             disabled={disable}
                                             className={
                                                disable ? "green-disable" : ""
                                             }
                                             onClick={() => {
                                                handleSubmitBuySell();
                                                setDisable(true);
                                             }}
                                          >
                                             Place {type} Order
                                          </button>
                                       ) : (
                                          <button
                                             style={{
                                                backgroundColor: "#D36135",
                                             }}
                                          >
                                             Can&apos;t Place the Order
                                          </button>
                                       ))}
                                    {type === "sell" &&
                                       (quantityValue == "" ? (
                                          <button
                                             style={{
                                                backgroundColor: "#D36135",
                                             }}
                                          >
                                             Can&apos;t Place the Order
                                          </button>
                                       ) : (
                                          <button onClick={handleSubmitBuySell}>
                                             {/*{loading && (
                                                <svg
                                                   className="spinner"
                                                   role="alert"
                                                   aria-live="assertive"
                                                >
                                                   <circle
                                                      cx="30"
                                                      cy="30"
                                                      r="20"
                                                      className="circle"
                                                   />
                                                </svg>
                                             )}*/}
                                             Place {type} Order
                                          </button>
                                       ))}
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                     {type && type === "watchlist" && (
                        <div
                           className={
                              styles["confirm-order"] + " " + styles["wrapper"]
                           }
                           id="confirm-order-watchlist"
                        >
                           <div
                              className={
                                 styles["input-section"] +
                                 " " +
                                 styles["ad-wtchbtn"]
                              }
                              style={{}}
                           >
                              <button onClick={closeModal}>Cancel </button>
                              <button onClick={watchListAdd}>
                                 Add to Watchlist
                              </button>
                           </div>
                        </div>
                     )}
                  </Fragment>
               )}
            </div>
         </div>
         <ToastContainer />
      </CustomModal>
   );
};

export default WatchListTabModal;
