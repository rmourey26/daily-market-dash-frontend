import React, { useState } from "react";
// import { MyProfileCollapsedRow } from ".";
// import { SellModal } from "../Modals";
import { numFormatter } from ".";
import { AmountFormatting } from "src/components";
import { mainlandingpage } from "src/data/constants";
import styles from "./WidgetsTabModuleStyle/MyProfileRow.module.scss";

const MyProfileRow = ({ setNewData, stock, handleSellButton, DataSymbol, setStreakable }) => {
  const [open, setOpen] = useState(false);
  const openModal = (type) => setOpen(type);
  const closeModal = () => setOpen(false);

  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  var stockPrice = stock.price;
  var stockSold = stock.sold;
  var stockReturns = stock.returns;
  const handleToggle = () => setOpen(!open);
  var profitandloss, roi;
  // alert((stock.quantity * stock.last - stock.quantity * stock.price) / 100)
  if (stock.sold == 0 && stock.last != 0) {
    profitandloss = stock.quantity * stock.last - stock.quantity * stock.price;
    roi =
      (stock.quantity * stock.last - stock.quantity * stock.price) /
      (stock.quantity * 100);
  } else if (stock.sold == 0 && stock.last == 0) {
    profitandloss = 0;
    // profitandloss = ((stock.quantity * stock.close) - (stock.quantity * stock.price))
    // var roi = ((stock.quantity * stock.close) - (stock.quantity * stock.price)) / ((stock.quantity) * 100)
    roi = 0;
  } else if (stock.sold == 1) {
    profitandloss = stock.quantity * stock.close - stock.quantity * stock.price;
    roi =
      (stock.quantity * stock.close - stock.quantity * stock.price) /
      (stock.quantity * 100);
  }

  return (
    <>
      <div
        className={
          open
            ? styles["container"] +
              " " +
              styles["mypro"] +
              " " +
              styles["symbol-mrkt"] +
              " " +
              styles["toggle-active"]
            : styles["container"] +
              " " +
              styles["mypro"] +
              " " +
              styles["symbol-mrkt"]
        }
        key={stock.sym}
        style={{ maxWidth: "100%" }}
      >
        <div className={styles.row}>
          <h2 className={styles.title} style={{ marginBottom: "10px" }}>
            {stock.market_name}
          </h2>
          <div className={styles["mobile-symbol-market"]}>
            <div
              style={{
                width: "50%",
                float: "left",
                display: "inline-flex",
                gap: "3px",
              }}
            >
              <h2 className={styles["sub-title"]}>{stock.market_symbol}</h2>
              <h2>on</h2>
              <h2 className={styles["pro-title"]}>{stock.market_exchange}</h2>
            </div>
            {stockSold != 1 && (<div className={styles["mobileThumps"]}>
              {stock.streakable==1 &&
                <div className={styles["tooltip-container"]} >
                <div className={styles["sellImgMobile"]+ " " + styles["tooltip-trigger"]}
              // onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleMouseEnter}
              >
              <img className={styles["thumpsupImg"]} src="assets/thumsup.png" alt="thumsup"/>
              {showTooltip && <div className={styles["tooltip"]}>This trade is streak positive. If you choose to sell this item from your portfolio, your streak will increase and points will be awarded.</div>}
              </div>
              </div>

            }
              <div
                style={{
                  width: "60%",
                  float: "right",
                  textAlign: "right",
                  lineHeight: "0",
                }}
              >
                <h2
                  className={styles["mobile-sell-head"]}
                  onClick={() => {
                    // openModal("sell");
                    handleSellButton();
                  }}
                >
                  Sell
                </h2>
              </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles["col-one"]}>
            <h2 className={styles["sub-title"]}>{stock.market_symbol}</h2>
            <h2 className={styles["pro-title"]}>{stock.market_exchange}</h2>
          </div>

          <div className={styles["col-one"]}>
            <h6 className={styles["pro-heads"]}>
              {mainlandingpage.portfolioData.quantity}
            </h6>
            <h4 className={styles["pro-content"]}>{stock.quantity}</h4>
          </div>
          <div className={styles["col-one"]}>
            <h6 className={styles["pro-heads"]}>
              {mainlandingpage.portfolioData.bought}
            </h6>
            <h4 className={styles["pro-content"]}>
              {stockPrice > 1 || stockPrice == 0
                ? AmountFormatting(Number(stockPrice).toFixed(2))
                : stockPrice.toFixed(3)}
              {/*{stockPrice}*/}
            </h4>
          </div>
          <div className={styles["col-one"]}>
            <h6 className={styles["pro-heads"]}>
              {mainlandingpage.portfolioData.sold}
            </h6>
            <h4 className={styles["pro-content"]}>
              {stockReturns > 1 ||
              stockReturns == 0 ||
              stockReturns === null ||
              stockReturns === "null"
                ? AmountFormatting(Number(stockReturns).toFixed(2))
                : Number(stockReturns).toFixed(3)}
            </h4>
          </div>
          <div className={styles["col-one"]}>
            <h6 className={styles["pro-heads"]}>
              {mainlandingpage.portfolioData.pandl}
            </h6>
            <h4 className={styles["pro-content"]}>
              {/* {profitandloss === 0 ? "" : profitandloss.toFixed(2)} */}
              {stock.pnl.toFixed(2)}
            </h4>
          </div>
          <div className={styles["col-one"]}>
            <h6 className={styles["pro-heads"]}>
              {mainlandingpage.portfolioData.roi}
            </h6>
            <h4 className={styles["pro-content"]}>
              {/* {roi === 0 ? "" : roi.toFixed(2) + "%"} */}
              {isNaN(roi)
                ? 0
                : Number(Math.sign(stock.roi)) < 0 && Number(stock.roi) == 0
                ? Number(Math.abs(stock.roi))
                : Number(Math.sign(stock.roi)) > 0 && Number(stock.roi) > 0
                ? "+" + Number(stock.roi).toFixed(3)
                : Number(stock.roi).toFixed(3)}
              {/* {isNaN(roi)
                        ? (0).toFixed(3)
                        : Number(Math.sign(roi)).toFixed(3) < 0 &&
                           Number(roi).toFixed(3) == 0
                           ? Number(Math.abs(roi)).toFixed(3)
                           : Number(Math.sign(roi)).toFixed(3) > 0 &&
                              Number(roi).toFixed(3) > 0
                              ? "+" + Number(roi).toFixed(3)
                              : Number(roi).toFixed(3)} */}
              %
            </h4>
          </div>

          <div className={styles["col-one"] + " " + styles["last-one"]} style={{marginTop:stock.streakable==0 ? '25px':'0'}} >
            {stockSold != 1 && (<>
              {stock.streakable==1 &&
                <div className={styles["tooltip-container"]} >
                <div className={styles["sellImg"]+ " " + styles["tooltip-trigger"]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              >
              <img className={styles["thumpsupImg"]} src="assets/thumsup.png" alt="thumsup"/>
              {showTooltip && <div className={styles["tooltip"]}>This trade is streak positive. If you choose to sell this item from your portfolio, your streak will increase and points will be awarded.</div>}
              </div>
              </div>

            }
              <h6
                className={styles["pro-btn"]}
                onClick={() => {
                  // openModal("sell");
                  handleSellButton();
                  setStreakable(stock.streakable)
                }}
              >
                Sell
              </h6>
              </>)}
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles["col-one"]}>
            <h2 className={styles["sub-title"]}>{stock.market_symbol}</h2>
            <h2 className={styles["pro-title"]}>{stock.market_exchange}</h2>
          </div>

          <div className={styles["col-one"]}>
            <h6 className={styles["pro-heads"]}>
              {mainlandingpage.portfolioData.open}
            </h6>
            <h4 className={styles["pro-content"]}>
              {stock.open > 1 || stock.open == 0
                ? AmountFormatting(Number(stock.open).toFixed(2))
                : stock.open}
              {/*{stock.open}*/}
            </h4>
          </div>
          <div className={styles["col-one"]}>
            <h6 className={styles["pro-heads"]}>
              {mainlandingpage.portfolioData.low}
            </h6>
            <h4 className={styles["pro-content"]}>
              {stock.low > 1 || stock.low == 0
                ? AmountFormatting(Number(stock.low).toFixed(2))
                : stock.low}
              {/*{stock.low}*/}
            </h4>
          </div>
          <div className={styles["col-one"]}>
            <h6 className={styles["pro-heads"]}>
              {mainlandingpage.portfolioData.high}
            </h6>
            <h4 className={styles["pro-content"]}>
              {stock.high > 1 || stock.high == 0
                ? AmountFormatting(Number(stock.high).toFixed(2))
                : stock.high}
              {/*{stock.high}*/}
            </h4>
          </div>
          <div className={styles["col-one"]}>
            <h6 className={styles["pro-heads"]}>
              {mainlandingpage.portfolioData.last}
            </h6>
            <h4 className={styles["pro-content"]}>
              {stock.last > 1 || stock.last == 0
                ? AmountFormatting(Number(stock.last).toFixed(2))
                : stock.last}
              {/*{stock.last}*/}
            </h4>
          </div>
          {stock.market_mic == "XCRY" ? (
            <div className={styles["col-one"]}></div>
          ) : (
            <div className={styles["col-one"]}>
              <h6 className={styles["pro-heads"]}>
                {mainlandingpage.portfolioData.volume}
              </h6>
              <h4 className={styles["pro-content"]}>
                {numFormatter(stock.volume)}
              </h4>
            </div>
          )}
          <div className={styles["col-one"] + " " + styles["last-one"]}></div>
        </div>
      </div>
    </>
  );
};

export default MyProfileRow;
