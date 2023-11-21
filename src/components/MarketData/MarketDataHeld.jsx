import React from "react";
import { mainlandingpage } from "src/data/constants";
import AmountFormatting from "src/utils/AmountFormatting";
import { numFormatter } from "src/views/Screens/Dashboard/MainLandingPage/widgets";
import styles from "./MarketDataInternalstyles/MostHeld.module.scss";

const MarketDataHeld = ({ action, stock, openModal }) => {
  return (
    <>
      {stock !== "null" && stock && action && action === "held" && (
        <div className={styles["market-sec-last"]}>
          {stock?.portfolio.map((stock) => (
            <div className={styles.row} key={stock.market_symbol}>
              <div className={styles["col-4"]}>
                <h3>{stock.market_symbol}</h3>
                <h3 className={styles.stkmic}>{stock.market_name}</h3>
                <h3 className={styles.stkmic}>{stock.market_mic}</h3>
              </div>
              <div
                className={
                  stock.market_mic == "XCRY"
                    ? styles["col-4"] + " " + styles["heldcrypto"]
                    : styles["col-4"]
                }
              >
                <div className={styles.row}>
                  <div className={styles["col-2"]}>
                    <h6 className={styles["pro-heads"]}>
                      {mainlandingpage.marketData.open}
                    </h6>
                    <h4 className={styles["pro-content"]}>
                      {stock.open > 1
                        ? AmountFormatting(Number(stock.open).toFixed(2))
                        : stock.open}
                    </h4>
                  </div>
                  <div className={styles["col-2"]}>
                    <h6 className={styles["pro-heads"]}>
                      {mainlandingpage.marketData.low}
                    </h6>
                    <h4 className={styles["pro-content"]}>
                      {stock.low > 1
                        ? AmountFormatting(Number(stock.low).toFixed(2))
                        : stock.low}
                    </h4>
                  </div>
                  <div className={styles["col-2"]}>
                    <h6 className={styles["pro-heads"]}>
                      {mainlandingpage.marketData.high}
                    </h6>
                    <h4 className={styles["pro-content"]}>
                      {stock.high > 1
                        ? AmountFormatting(Number(stock.high).toFixed(2))
                        : stock.high}
                    </h4>
                  </div>

                  <div className={styles["col-2"]}>
                    <h6 className={styles["pro-heads"]}>
                      {mainlandingpage.marketData.last}
                    </h6>
                    <h4 className={styles["pro-content"]}>
                      {stock.close > 1
                        ? AmountFormatting(Number(stock.close).toFixed(2))
                        : stock.close}
                    </h4>
                  </div>
                  {stock.market_mic == "XCRY" ? (
                    <div className={styles["col-2"]}></div>
                  ) : (
                    <div className={styles["col-2"]}>
                      <h6 className={styles["pro-heads"]}>
                        {mainlandingpage.marketData.volume}
                      </h6>
                      <h4 className={styles["pro-content"]}>
                        {numFormatter(stock.volume)}
                      </h4>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles["col-4"]}>
                <div className={styles["row"] + " " + styles["mobiline-btn"]}>
                  <div className={styles["col-6"]}>
                    <button onClick={() => openModal("buy", stock)}>
                      {mainlandingpage.marketData.buttons.buy}
                    </button>
                  </div>
                  <div className={styles["col-6"]}>
                    <button onClick={() => openModal("watchlist", stock)}>
                      {" "}
                      {mainlandingpage.marketData.buttons.watchlist}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MarketDataHeld;
