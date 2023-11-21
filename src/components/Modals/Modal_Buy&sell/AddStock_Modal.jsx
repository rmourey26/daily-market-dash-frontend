import React from "react";
import styles from "./ModalPopupStyles/AddStockModel.module.scss";

const AddStock_Modal = ({
  data,
  showDetails,
  detailView,
  name,
  marketMic,
  closeModal,
  addStocks,
  setLoading,
}) => {
  return (
    <>
      <div className={styles["stock-titleParent"]}>
        {!showDetails &&
          data &&
          data?.map((stock) => (
            <div
              className={styles["stock-title"]}
              key={stock.symbol}
              style={{ cursor: "pointer" }}
            >
              <div
                className={styles.det}
                onClick={() => detailView(stock.mic, stock.symbol, stock.name)}
              >
                <h3>{stock.symbol}</h3>
                <h3 className={styles.stkmic}>{stock.name}</h3>
                <h3 className={styles.stkmic}>{stock.mic}</h3>
              </div>
              <div className={styles.det}>
                {/*<div
                   className="plsarw"
                   onClick={() => addStocks(stock.mic, stock.symbol)}
                >
                   <img
                      src="assets/images/icons/plus-icon.png"
                      alt=""
                   />
       </div>*/}
              </div>
            </div>
          ))}
      </div>

      <div className={styles["profile-second-container"]}>
        {showDetails ? (
          <>
            <div className={styles.row}>
              <div className={styles["two-half"]}>
                <h3>{showDetails.symbol}</h3>
                <h3 className={styles.stkmic}>{name}</h3>
                <h3 className={styles.stkmic}>
                  {showDetails.mic_code ? showDetails.mic_code : marketMic}
                </h3>
              </div>
              <div className={styles["two-half"]}>
                <h6>Open</h6>
                <h4>
                  {showDetails.open > 1
                    ? Number(showDetails.open).toFixed(2)
                    : showDetails.open}
                </h4>
              </div>

              <div className={styles["two-half"]}>
                <h6>Low</h6>
                <h4>
                  {showDetails.low > 1
                    ? Number(showDetails.low).toFixed(2)
                    : showDetails.low}
                </h4>
              </div>

              <div className={styles["two-half"]}>
                <h6>High</h6>
                <h4>
                  {showDetails.high > 1
                    ? Number(showDetails.high).toFixed(2)
                    : showDetails.high}
                </h4>
              </div>

              <div className={styles["two-half"]}>
                <h6>Last</h6>
                <h4>
                  {showDetails.last > 1
                    ? Number(showDetails.last).toFixed(2)
                    : showDetails.last}
                </h4>
              </div>
            </div>
            {/*<div
                        className="buy-btn"
                        onClick={() =>
                           addStocks(showDetails.exchange, showDetails.symbol)
                        }
                        style={{ cursor: "pointer" }}
                     >
                        <h6>Add Symbol</h6>
                     </div>*/}
            <div
              className={styles["confirm-order"]}
              id="confirm-order-watchlist"
            >
              <div
                className={styles["input-section"]}
                style={{ display: "flex" }}
              >
                <button onClick={closeModal}>Cancel </button>
                <button
                  className={styles["buy-btn"]}
                  onClick={() => {
                    addStocks(
                      showDetails.mic_code ? showDetails.mic_code : marketMic,
                      showDetails.symbol
                    );
                    setLoading(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AddStock_Modal;
