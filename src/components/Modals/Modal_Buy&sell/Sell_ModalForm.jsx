import React from "react";
import styles from "./ModalPopupStyles/SellModal.module.scss";

const Sell_ModalForm = ({
   type,
   sellData,
   min,
   handleChange,
   quantityValue,
   bank,
   limitPurchaseCrypto,
   limitPurchase,
   closeModal,
   disable,
   handleSubmitBuySell,
   setDisable,
   readOnly,
   error,
   setBuys,
   buys
}) => {
   console.log("buys",buys)
   return (
      <>
         {type && type !== "watchlist" && (
            <div className={styles["confirm-order"]}>
               {type !== "sell" && (
                  <div className={styles["rocket-notify"]}>
                     <img src="assets/images/rocket-launch.png" alt="" />
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
                                 : sellData.close && sellData.close != 0
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
                           (sellData.market_mic === "XCRY" || sellData.mic_code === "XCRY")
                               ? (sellData.quantity ? sellData.quantity : quantityValue)
                               : parseInt(
                                   sellData.quantity ? sellData.quantity : quantityValue
                               )
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
                              : sellData.close && sellData.close != 0
                              ? sellData.close
                              : sellData.open) *
                              quantityValue >
                           // (sellData.quantity
                           //    ? sellData.quantity
                           //    : quantityValue)
                           1
                              ? (
                                   (sellData.last && sellData.last != 0
                                      ? sellData.last
                                      : sellData.close && sellData.close != 0
                                      ? sellData.close
                                      : sellData.open) * quantityValue
                                )
                                   //   (sellData.quantity
                                   //      ? sellData.quantity
                                   //      : quantityValue)
                                   .toFixed(2)
                              : (sellData.last && sellData.last != 0
                                   ? sellData.last
                                   : sellData.close && sellData.close != 0
                                   ? sellData.close
                                   : sellData.open) * quantityValue
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
                     <div className={styles["notification-mess"]}>
                        {/* {
                 quantityGreater === true && <p style={{ color: "#ddac2f" }}>
                    Sorry quantity of sell is greater than bough
                 </p>
              } */}
                        {bank >=
                           Number(
                              sellData.last && sellData.last != 0
                                 ? sellData.last
                                 : sellData.close && sellData.close != 0
                                 ? sellData.close
                                 : sellData.open
                           ) *
                              (quantityValue ? quantityValue : 1) &&
                        quantityValue > 0 ? (
                           <p>
                              You have ${bank} available, you are allowed to buy
                              between{" "}
                              {(sellData.market_mic === "XCRY" ||
                                 sellData.mic_code === "XCRY") &&
                              Number(
                                 sellData.last && sellData.last != 0
                                    ? sellData.last
                                    : sellData.close && sellData.close != 0
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
                              Sorry you don&apos;t have enough Balance
                           </p>
                        )}
                     </div>
                  )}
                  <div className={styles["order-type"]}>
                     <button onClick={closeModal}>Cancel {type} Order</button>
                     {type !== "sell" &&
                        (bank >=
                           Number(
                              sellData.last && sellData.last != 0
                                 ? sellData.last
                                 : sellData.close && sellData.close != 0
                                 ? sellData.close
                                 : sellData.open
                           ) *
                              (quantityValue ? quantityValue : 1) &&
                        quantityValue > 0 ? (
                           <button
                              className={disable ? "green-disable" : ""}
                              disabled={disable}
                              onClick={() => {
                                 handleSubmitBuySell();
                                 setDisable(true);
                                 // setBuys(true);
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
      </>
   );
};

export default Sell_ModalForm;
