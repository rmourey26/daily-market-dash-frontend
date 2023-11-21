import React, { Fragment } from "react";
import { mainlandingpage } from "src/data/constants";
import styles from "./ModalPopupStyles/BuySellModal.module.scss";

const BuySell_Model = ({
   selectedStock,
   showDetails,
   data,
   getStockInfo,
   search,
   loading,
   BuySell,
   message,
   error,
}) => {
   return (
      <>
         <div className={styles["watchlist-popup"]}>
            <div className={styles["watchlist-modal"]}>
               <div style={{ textAlign: "center", color: "#3AD6A1" }}>
                  {message}
               </div>
               <div className={styles["sell-order"]}>
                  <h2
                     style={{
                        color: "#fff",
                        fontSize: "20px",
                     }}
                  >
                     Buy{" "}
                     {(selectedStock.mic || selectedStock.mic_code) !== "XCRY"
                        ? "Stock"
                        : "Crypto"}
                  </h2>
                  <div className={styles["appl-search"]}>
                     <input
                        type="search"
                        id="watchlist"
                        placeholder={
                           mainlandingpage.portfolioData.search.placeholder
                        }
                        onChange={(e) => search(e.target.value)}
                        autoFocus
                     />
                     <img src="assets/images/icons/search.svg" alt="" />
                  </div>
               </div>
               <div className={styles["stock-titleParent"]}>
                  <div
                     className={
                        showDetails
                           ? styles["showDetailList"]
                           : styles["hideDetailList"]
                     }
                  >
                     {!showDetails && selectedStock &&
                        data &&
                        data?.map((stock) => (
                           <div
                              className={styles["stock-title"]}
                              style={{ cursor: "pointer" }}
                              key={stock.symbol}
                           >
                              <div
                                 className={styles.det}
                                 onClick={() =>{
                                    getStockInfo(stock.mic, stock.symbol); showDetails(true)
                                 }
                                 }
                              >
                                 <h3>{stock.symbol}</h3>
                                 <h3 className={styles.stkmic}>{stock.name}</h3>
                                 <h3 className={styles.stkmic}>{stock.mic}</h3>
                              </div>
                              <div className={styles.det}></div>
                           </div>
                        ))}
                  </div>
               </div>
               <div
                  className={`${
                     loading
                        ? styles["profile-second-container"] +
                          " " +
                          styles["spinner-loads"]
                        : styles["profile-second-container"]
                  }`}
               >
                  {showDetails && selectedStock && (
                     <Fragment key={selectedStock.symbol}>
                        <div className={styles.row}>
                           <div className={styles["two-half"]}>
                              <h3>{selectedStock.symbol}</h3>
                              <h3 className={styles.stkmic}>
                                 {selectedStock.name}
                              </h3>
                              <h3 className={styles.stkmic}>
                                 {selectedStock.mic}
                              </h3>
                           </div>
                           <div className={styles["two-half"]}>
                              <h6>open</h6>
                              <h4>
                                 {selectedStock.open > 1 ||
                                 selectedStock.open == 0
                                    ? Number(selectedStock.open).toFixed(2)
                                    : selectedStock.open}
                              </h4>
                           </div>

                           <div className={styles["two-half"]}>
                              <h6>low</h6>
                              <h4>
                                 {selectedStock.low > 1 ||
                                 selectedStock.low == 0
                                    ? Number(selectedStock.low).toFixed(2)
                                    : selectedStock.low}
                              </h4>
                           </div>

                           <div className={styles["two-half"]}>
                              <h6>high</h6>
                              <h4>
                                 {selectedStock.high > 1 ||
                                 selectedStock.high == 0
                                    ? Number(selectedStock.high).toFixed(2)
                                    : selectedStock.high}
                              </h4>
                           </div>

                           <div className={styles["two-half"]}>
                              <h6>last</h6>
                              <h4>
                                 {selectedStock.last > 1 ||
                                 selectedStock.last == 0
                                    ? Number(selectedStock.last).toFixed(2)
                                    : selectedStock.last}
                              </h4>
                           </div>
                        </div>
                        {BuySell()}
                     </Fragment>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default BuySell_Model;
