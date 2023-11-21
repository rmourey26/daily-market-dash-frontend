import React, { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
// import { MyProfileCollapsedRow } from ".";
import { SellModal } from "../Modals";
import { useStateIfMounted } from "use-state-if-mounted";
import {
  MarketDataExchange,
  MarketDataSymbols,
  MarketDataWatched,
  MarketDataHeld,
} from "src/components/MarketData";
import styles from "./WidgetsTabModuleStyle/MarketData.module.scss";

const MarketDataRow = ({ stock, refreshData, action, market, setBuys, buys, setBuyZIndex }) => {
  const [open, setOpen] = useState(false);
  const [isModalClosed, setisModalClosed] = useState(false);
  const [modalData, setModalData] = useState(false);
  const openModal = (type, data, symbol, market, marketname) => {
    if (symbol) {
      data["market_symbol"] = symbol;
    }
    if (market) {
      data["market_mic"] = market;
    }
    if (marketname) {
      data["market_name"] = marketname;
    }
    setOpen(type);
    setModalData(data);
  };

  const [setrefreshdata, setRefreshData] = useState(false);

  const setNewData = (value) => {
    setRefreshData(value);
  };

  const closeModal = () => {
    setisModalClosed(true);
    setOpen(false);
  };
  const [showdata, setShowData] = useStateIfMounted(false);
  const [hidden, setHidden] = useStateIfMounted(false);
  const handleToggle = () => setOpen(!open);

  if (isModalClosed === true) {
    let child1 = document.getElementById("stopScroll");
    let child2 = document.getElementById("scrollStopHeader");
    child1.classList.remove("tab-overlay");
    child2.classList.remove("active-tp-head");
  }

  async function refreshDataStock(action, name, market) {
    var postData = {
      action: action,
      market_mic: market,
      market_symbol: name,
    };

    await axiosInstance
      .post("/markets/", postData)
      .then(function (response) {
        setShowData(response.data);
        setHidden(true);
        // setBack(false)
        // setHideBtn("")
      })
      .catch(function (errors) {
        console.log(errors);
      });
  }

  const openModalData = (data) => {
    setModalData(data);
  };

  useEffect(() => {
    setShowData(false);
    setHidden(false);

    // alert('market data row')
  }, [action]);

  useEffect(() => {
    // refreshData("tickers")
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div
        className={
          open
            ? styles["row"] +
              " " +
              styles["exclusive-market"] +
              " " +
              styles["just-res"] +
              " " +
              styles["toggle-active"]
            : styles["row"] +
              " " +
              styles["exclusive-market"] +
              " " +
              styles["just-res"]
        }
        key={stock.market_name}
      >
        <MarketDataExchange
          stock={stock}
          action={action}
          market={market}
          refreshData={refreshData}
        />

        <MarketDataSymbols
          stock={stock}
          action={action}
          market={market}
          refreshData={refreshData}
          refreshDataStock={refreshDataStock}
          hidden={hidden}
          showdata={showdata}
          openModal={openModal}
          setBuyZIndex={setBuyZIndex}
        />
      </div>

      <MarketDataWatched action={action} stock={stock} openModal={openModal} />

      <MarketDataHeld action={action} stock={stock} openModal={openModal} />

      {open && (
        <SellModal
          type={open}
          setNewData={setNewData}
          sellData={modalData}
          closeModal={closeModal}
          setBuys={setBuys}
          buys={buys}
          
        />
      )}
      {/* <AddStock getNewData={setNewData} closeModal={closeModal} /> */}
    </>
  );
};

export default MarketDataRow;
