import React, { useEffect, useState } from "react";
import axiosInstance from "src/services/axios";
// import { MyProfileCollapsedRow } from ".";
import { WatchListTabModal } from "../Modals";
import { numFormatter } from ".";
import { AmountFormatting } from "src/components";
import { mainlandingpage } from "src/data/constants";
import styles from "./WidgetsTabModuleStyle/WatchlistRow.module.scss";

const WatchListProfileRow = ({
  handleTabChangeMain,
  stock,
  delete: confirmDeleted,
}) => {
  const [refreshData, setRefreshData] = useState(false);

  const setNewData = (value) => {
    setRefreshData(value);
  };

  const [deleteList, setDeleteList] = useState(false);
  const [open, setOpen] = useState(false);
  const openModal = (type) => setOpen(type);
  const closeModal = () => setOpen(false);
  if (open === false) {
    let child1 = document.getElementById("stopScroll");
    let child2 = document.getElementById("scrollStopHeader");
    child1.classList.remove("tab-overlay");
    child2.classList.remove("active-tp-head");
  }

  // const handleToggle = () => setOpen(!open);
  const deleteFromWatchList = async () => {
    if (deleteList)
      await axiosInstance
        .post("/watchlist/", deleteList)
        .then(function (response) {
          confirmDeleted(deleteList);
        })
        .catch(function (errors) {
          console.log(errors);
        });
  };
  useEffect(() => {
    deleteFromWatchList();
  }, [deleteList]);

  const deleteWatchList = (mic, symbol) => {
    var action = {
      action: "delete",
      market_mic: mic,
      market_symbol: symbol,
    };
    setDeleteList(action);
  };

  // console.log(isDeleted)
  return (
    <div
      className={
        open
          ? styles["container"] +
            " " +
            styles["symbol-mrkt"] +
            " " +
            styles["listwtc"] +
            " " +
            styles["toggle-active"]
          : styles["container"] +
            " " +
            styles["symbol-mrkt"] +
            " " +
            styles["listwtc"]
      }
      key={stock.market_symbol}
      style={{ maxWidth: "100%" }}
    >
      <div className={styles.row}>
        <h2 className={styles.title}>{stock.market_name}</h2>
        <div className={styles["mobile-symbol-market"]}>
          <h2 className={styles["sub-title"]}>{stock.market_symbol}</h2>
          <h2 className={styles["pro-title"]}>{stock.market_mic}</h2>
        </div>
        <div className={styles["sym-buy-btn"]}>
          <div className={styles["delete-now"]}>
            <button
              onClick={() => {
                openModal("Buy");
                setNewData(stock);
              }}
            >
              Buy
            </button>
            <img
              onClick={() => {
                deleteWatchList(stock.market_mic, stock.market_symbol);
              }}
              src="assets/images/icons/del-icon.svg"
              alt="Delete"
            />
          </div>
        </div>
      </div>
      <div className={styles["profile"] + " " + styles["wtc"]}>
        <div className={styles["col-one"]}>
          <h2 className={styles["sub-title"]}>{stock.market_symbol}</h2>
          <h2 className={styles["pro-title"]}>{stock.market_mic}</h2>
        </div>

        <div className={styles["col-one"]}>
          <h6 className={styles["pro-heads"]}>
            {mainlandingpage.watchlistData.open}
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
            {mainlandingpage.watchlistData.low}
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
            {mainlandingpage.watchlistData.high}
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
            {mainlandingpage.watchlistData.last}
          </h6>
          <h4 className={styles["pro-content"]}>
            {stock.last > 1 || stock.last == 0
              ? AmountFormatting(Number(stock.last).toFixed(2))
              : stock.last}
            {/*{stock.last}*/}
          </h4>
        </div>
        {stock.market_mic == "XCRY" ? (
          <div
            className={styles["col-one"] + " " + styles["disableonMobile"]}
          ></div>
        ) : (
          <div className={styles["col-one"]}>
            <h6 className={styles["pro-heads"]}>
              {mainlandingpage.watchlistData.volume}
            </h6>
            <h4 className={styles["pro-content"]}>
              {numFormatter(stock.volume)}
            </h4>
          </div>
        )}

        <div className={styles["col-one"] + " " + styles["delete"]}>
          <button
            onClick={() => {
              openModal("Buy");
              setNewData(stock);
            }}
          >
            {mainlandingpage.watchlistData.buttons.buy}
          </button>
          <img
            onClick={() => {
              deleteWatchList(stock.market_mic, stock.market_symbol);
            }}
            src="assets/images/icons/del-icon.svg"
            alt="Delete"
          />
        </div>
      </div>

      {open === "Buy" && (
        <WatchListTabModal
          type={"buy"}
          sellData={refreshData}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default WatchListProfileRow;
