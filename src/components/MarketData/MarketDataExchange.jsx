import React from "react";
import { mainlandingpage } from "src/data/constants";
import { numFormatter } from "src/views/Screens/Dashboard/MainLandingPage/widgets";
import AmountFormatting from "src/utils/AmountFormatting";
import styles from "./MarketDataInternalstyles/MarketDataExchange.module.scss";

const MarketDataExchange = ({ action, stock, market, refreshData }) => {
  return (
    <>
      {action && action === "exchanges" && (
        <div className={styles["market-first-data"]}>
          <div className={styles.exchange}>
            <div className={styles["col-2"] + " " + styles["marketTime"]}>
              <div className={styles.mCurrency}>
                <h4>{stock?.market_name}</h4>
              </div>
              <div className={styles.mTime} style={{color:stock?.marketTime == "Market is Open" ? "#9dbaad":"#d36135"}}>
                <h5>{stock?.marketTime}</h5>
              </div>
            </div>

            <div className={styles["col-2"]}>
              <button
                onClick={() => refreshData("tickers", stock.market_mic, market)}
              >
                {mainlandingpage.marketData.buttons.symbol}
              </button>
            </div>
            <div className={styles["auto-dmd"]} style={{ display: "none" }}>
              <div className={styles["col-2"]}>
                <h6 className={styles["pro-heads"]}>
                  {mainlandingpage.marketData.open}
                </h6>
                <h4 className={styles["pro-content"]}>
                  {stock.open > 1 || stock.open == 0
                    ? AmountFormatting(Number(stock.open).toFixed(2))
                    : stock.open}
                </h4>
              </div>
              <div className={styles["col-2"]}>
                <h6 className={styles["pro-heads"]}>
                  {mainlandingpage.marketData.high}
                </h6>
                <h4 className={styles["pro-content"]}>
                  {stock.high > 1 || stock.high == 0
                    ? AmountFormatting(Number(stock.high).toFixed(2))
                    : stock.high}
                </h4>
              </div>
              <div className={styles["col-2"]}>
                <h6 className={styles["pro-heads"]}>
                  {mainlandingpage.marketData.low}
                </h6>
                <h4 className={styles["pro-content"]}>
                  {stock.low > 1 || stock.low == 0
                    ? AmountFormatting(Number(stock.low).toFixed(2))
                    : stock.low}
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
            <div className={styles["col-2"]}>
              <button
                onClick={() => refreshData("held", stock.market_mic, market)}
              >
                {mainlandingpage.marketData.buttons.mostHeld}
              </button>
            </div>
            <div className={styles["col-2"]}>
              <button
                onClick={() => refreshData("watched", stock.market_mic, market)}
              >
                {mainlandingpage.marketData.buttons.mostWatched}
              </button>
            </div>
            <div className={styles["mobile-btnsexchange"]}>
              <div className={styles.row}>
                <div className={styles["col-4"]}>
                  <button
                    onClick={() =>
                      refreshData("tickers", stock.market_mic, market)
                    }
                  >
                    {mainlandingpage.marketData.buttons.symbol}
                  </button>
                </div>
                <div className={styles["col-4"]}>
                  <button
                    onClick={() =>
                      refreshData("held", stock.market_mic, market)
                    }
                  >
                    {mainlandingpage.marketData.buttons.mostHeld}
                  </button>
                </div>
                <div className={styles["col-4"]}>
                  <button
                    onClick={() =>
                      refreshData("watched", stock.market_mic, market)
                    }
                  >
                    {mainlandingpage.marketData.buttons.mostWatched}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketDataExchange;
