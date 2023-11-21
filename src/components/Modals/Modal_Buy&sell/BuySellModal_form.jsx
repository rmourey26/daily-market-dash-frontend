import React from "react";
import styles from "./ModalPopupStyles/BuySellModal.module.scss";

const BuySellModal_form = ({
   selectedStock,
   setSelectedStock,
   bank,
   limitPurchase,
   limitPurchaseCrypto,
   handleSubmitBuySell,
   disable,
   setDisable,
   closeModal,
   error,
}) => {
   return (
      <>
         <div className={styles["confirm-order"] + " " + styles["wrapper"]}>
            <div className={styles["rocket-notify"]}>
               <img src="assets/images/rocket-launch.png" alt="" />
            </div>

            <div className={styles["input-section"]}>
               <div>
                  <h3>QUANTITY</h3>
                  <input
                     type="number"
                     name="quantity"
                     id="quantity"
                     placeholder={1}
                     min={
                        (selectedStock.mic || selectedStock.mic_code) !== "XCRY"
                           ? 1
                           : 0.01
                     }
                     step={
                        (selectedStock.mic === "XCRY" ||
                           selectedStock.mic_code === "XCRY") &&
                        (selectedStock.last && selectedStock.last != 0
                           ? selectedStock.last
                           : selectedStock.close && selectedStock.close != 0
                           ? selectedStock.close
                           : selectedStock.open) > 5000
                           ? 0.01
                           : 1
                     }
                     value={selectedStock.quantity}
                     onChange={(e) =>
                        setSelectedStock({
                           ...selectedStock,
                           quantity:
                              (selectedStock.mic || selectedStock.mic_code) !==
                              "XCRY"
                                 ? parseInt(e.target.value)
                                 : e.target.value,
                        })
                     }
                  />
               </div>
               <div>
                  <h3>TOTAL Value</h3>
                  {/* {selectedStock.last == 0 || !selectedStock.last && <>Last Value Missing {selectedStock.open}</>} */}
                  <input
                     type="number"
                     name="total"
                     id="total"
                     value={
                        (selectedStock.last && selectedStock.last != 0
                           ? selectedStock.last
                           : selectedStock.close && selectedStock.close != 0
                           ? selectedStock.close
                           : selectedStock.open) *
                           selectedStock.quantity >
                        1
                           ? (
                                (selectedStock.last && selectedStock.last != 0
                                   ? selectedStock.last
                                   : selectedStock.close &&
                                     selectedStock.close != 0
                                   ? selectedStock.close
                                   : selectedStock.open) *
                                selectedStock.quantity
                             ).toFixed(2)
                           : (selectedStock.last && selectedStock.last != 0
                                ? selectedStock.last
                                : selectedStock.close &&
                                  selectedStock.close != 0
                                ? selectedStock.close
                                : selectedStock.open) * selectedStock.quantity
                     }
                  />
               </div>
               {error === false && (
                  <div className={styles["notification-mess"]}>
                     {bank >= selectedStock.price * selectedStock.quantity &&
                     selectedStock.quantity > 0 ? (
                        <p>
                           You have ${bank} available, you are allowed to buy
                           between{" "}
                           {(selectedStock.mic === "XCRY" ||
                              selectedStock.mic_code === "XCRY") &&
                           Number(
                              selectedStock.last && selectedStock.last != 0
                                 ? selectedStock.last
                                 : selectedStock.close &&
                                   selectedStock.close != 0
                                 ? selectedStock.close
                                 : selectedStock.open
                           ) > 5000
                              ? 0.01
                              : 1}{" "}
                           and{" "}
                           {selectedStock.mic === "XCRY" ||
                           selectedStock.mic_code === "XCRY"
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
                  <button onClick={closeModal}>Cancel Order</button>
                  {bank >= selectedStock.price * selectedStock.quantity &&
                  selectedStock.quantity > 0 ? (
                     <button
                        disabled={disable}
                        className={disable ? styles["green-disable"] : ""}
                        onClick={() => {
                           handleSubmitBuySell();
                           setDisable(true);
                        }}
                     >
                        Confirm Order
                     </button>
                  ) : (
                     <button style={{ backgroundColor: "#D36135" }}>
                        Can&apos;t Place the Order
                     </button>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default BuySellModal_form;
