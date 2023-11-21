import React from "react";
import styles from "./ModalPopupStyles/SellModal.module.scss";

const Sell_Modal = ({ sellData, type }) => {
  return (
    <>
      <div className={styles.row}>
        {type && type == "sell" ? (
          <div className={styles["two-half"]}>
            <h3>{sellData.symbol}</h3>
            <h3 className={styles["stkmic"]}>{sellData.name}</h3>
            <h3 className={styles["stkmic"]}>{sellData.mic_code ? sellData.mic_code : sellData.market_mic}</h3>
          </div>
        ) : (
          <div className={styles["two-half"]}>
            <h3>{sellData.market_symbol}</h3>
            <h3 className={styles["stkmic"]}>{sellData.market_name}</h3>
            <h3 className={styles["stkmic"]}>{sellData.mic_code ? sellData.mic_code : sellData.market_mic}</h3>
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
    </>
  );
};

export default Sell_Modal;
