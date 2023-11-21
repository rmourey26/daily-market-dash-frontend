import React from "react";
import { mainlandingpage } from "src/data/constants";
import { numFormatter } from "src/views/Screens/Dashboard/MainLandingPage/widgets";
import AmountFormatting from "src/utils/AmountFormatting";
import styles from "./MarketDataInternalstyles/MarketDataSymbol.module.scss";

const MarketDataSymbols = ({
  action,
  stock,
  market,
  refreshData,
  refreshDataStock,
  showdata,
  hidden,
  openModal,
  setBuyZIndex
}) => {
  return (
    <>
      {action && action === "tickers" && (
        <>
          <div className={styles["col-3"]} style={{ cursor: "pointer" }}>
            <h4 onClick={() => refreshData("symbol", stock.symbol, market)}>
              {stock.symbol}
            </h4>
          </div>
          <div className={`${hidden ? styles["col-3"]+ " " +styles["space-in"] : styles["col-3"]}`} >
            <h4>{stock.name}</h4>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => refreshDataStock("symbol", stock.symbol, stock.market)}
            className={`${hidden ? styles["btn-hide"] : styles["col-3"]}`}
          >
            <button
            // style={{ cursor: "pointer" }}
            // onClick={() => {
            //    refreshDataStock("symbol", stock.symbol, market);
            //    changeClass();
            // }}
            // className={HideBtn}
            >
              {mainlandingpage.marketData.buttons.details}
            </button>
          </div>
          <div className={hidden ? styles["col-3"] : styles["col"]}>
            {showdata && hidden !== false ? (
              <div
                className={
                  market == "XCRY"
                    ? styles["childrow"] + " " + styles["cryptorow"]
                    : styles["childrow"]
                }
              >
                <div className={styles["col-2"]}>
                  <h6 className={styles["pro-heads"]}>Low</h6>
                  <h4 className={styles["pro-content"]}>
                    {showdata.low > 1
                      ? AmountFormatting(Number(showdata.low).toFixed(2))
                      : showdata.low}
                  </h4>
                </div>
                <div className={styles["col-2"]}>
                  <h6 className={styles["pro-heads"]}>High</h6>
                  <h4 className={styles["pro-content"]}>
                    {showdata.high > 1
                      ? AmountFormatting(Number(showdata.high).toFixed(2))
                      : showdata.high}
                  </h4>
                </div>

                <div className={styles["col-2"]}>
                  <h6 className={styles["pro-heads"]}>Last</h6>
                  <h4 className={styles["pro-content"]}>
                    {showdata.last > 1
                      ? AmountFormatting(Number(showdata.last).toFixed(2))
                      : showdata.last}
                  </h4>
                </div>
                {market == "XCRY" ? (
                  <div className={styles["col-2"]}></div>
                ) : (
                  <div className={styles["col-2"]}>
                    <h6 className={styles["pro-heads"]}>Volume</h6>
                    <h4 className={styles["pro-content"]}>
                      {numFormatter(showdata.volume)}
                    </h4>
                  </div>
                )}

                <div className={styles.mobilebuton}>
                  <div className={styles["col-6"]}>
                    <button
                      onClick={() =>{
                        openModal(
                          "buy",
                          showdata,
                          stock.symbol,
                          market,
                          stock.name
                        ); setBuyZIndex(true)
                      }}
                    >
                      {mainlandingpage.marketData.buttons.buy}
                    </button>
                  </div>
                  <div className={styles["col-6"]}>
                    <button
                      onClick={() =>
                        openModal(
                          "watchlist",
                          showdata,
                          stock.symbol,
                          market,
                          stock.name
                        )
                      }
                    >
                      {mainlandingpage.marketData.buttons.watchlist}
                    </button>
                  </div>
                </div>
                <div className={styles["col-2"] + " " + styles["btn-001"]}>
                  <button
                    onClick={() =>{
                      openModal(
                        "buy",
                        showdata,
                        stock.symbol,
                        market,
                        stock.name
                      ); setBuyZIndex(true)
                    }}
                  >
                    {mainlandingpage.marketData.buttons.buy}
                  </button>
                </div>
                <div className={styles["col-2"] + " " + styles["btn-002"]}>
                  <button
                    onClick={() =>
                      openModal(
                        "watchlist",
                        showdata,
                        stock.symbol,
                        market,
                        stock.name
                      )
                    }
                  >
                    {mainlandingpage.marketData.buttons.watchlist}
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MarketDataSymbols;
