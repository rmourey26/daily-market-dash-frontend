import React, { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
import CustomModal from "src/components/Modals/CustomModal";

// import "./style.scss";
// import "../../../WatchList/style.scss";
import styles from "./AddStock.module.scss";
import { mainlandingpage } from "src/data/constants";
import { useStateIfMounted } from "use-state-if-mounted";
import { AddStock_Modal } from "src/components/Modals/Modal_Buy&sell";

const AddStock = ({ closeModal, getNewData: setNewData }) => {
  const [message, setMessage] = useState();
  const [data, setData] = useStateIfMounted([]);
  const [searchVal, setSearchVal] = useState();
  const [stocks, setStocks] = useState();
  const [details, setDetails] = useState();
  const [showDetails, setShowDetails] = useStateIfMounted();
  const [name, setName] = useState("");
  const [marketMic, setmarketMic] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(searchVal)
    const getMarketData = async () => {
      if (searchVal.length >= 3)
        await axiosInstance
          .post("/watchlist/", {
            action: "search",
            search: searchVal,
          })
          .then(function (response) {
            setData(response.data.tickers);
            setShowDetails("");
            // console.log("log:", response);
          })
          .catch(function (errors) {
            console.log(errors);
          });
    };
    let timer = setTimeout(() => {
      if (searchVal) getMarketData();
    });
    return () => clearTimeout(timer);
  }, [searchVal]);

  useEffect(() => {
    // console.log(searchVal)
    const getDetailedView = async () => {
      if (details)
        await axiosInstance
          .post("/watchlist/", details)
          .then(function (response) {
            setShowDetails(response.data);
            // console.log("logss:", response);
          })
          .catch(function (errors) {
            console.log(errors);
          });
    };
    getDetailedView();
  }, [details]);

  const search = (value) => {
    setSearchVal(value);
  };

  useEffect(() => {
    const addToWatchList = async () => {
      // console.log(stocks)

      if (stocks)
        await axiosInstance
          .post("/watchlist/", stocks)
          .then(function (response) {
            setMessage("Added successfully");
            setNewData(response.data.total);
            closeModal();
            // setData(response.data.tickers);
            // console.log("log:", response);
          })
          .catch(function (errors) {
            setMessage("Oops something wrong");
            console.log(errors);
          });
      setLoading(false);
    };

    addToWatchList();
  }, [stocks]);

  useEffect(() => {
    setTimeout(() => setMessage(""), 3000);
  }, [message]);

  const addStocks = (market_mic, market_symbol) => {
    let addWatchList = {
      action: "add",
      market_mic: market_mic,
      market_symbol: market_symbol,
    };
    // setStocks({ ...addWatchList });
    setStocks(addWatchList);
  };

  const detailView = (market_mic, market_symbol, market_name) => {
    setName(market_name);
    setmarketMic(market_mic);
    let detailWatchList = {
      action: "symbol",
      market_mic: market_mic,
      market_symbol: market_symbol,
    };
    setDetails(detailWatchList);
  };

  const [tabData, setTabData] = useState({
    buy: true,
    sell: false,
  });

  const handleTabChange = (e) => {
    let notChanged = e.target.name === "buy" ? "sell" : "buy";
    setTabData({
      [`${e.target.name}`]: e.target.checked,
      [`${notChanged}`]: !e.target.checked,
    });
  };

  const getTabContent = () => {
    if (tabData.buy) return BuyTabContent();
    if (tabData.sell) return SellTabContent();
  };

  console.log(details);

  const BuyTabContent = () => {
    return (
      <div className="tab-content">
        <div className="input-section">
          <div>
            <h3>QUANTITY</h3>
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="1"
            />
          </div>
          <div>
            <h3>MARKET PRICE</h3>
            <input
              type="text"
              name="quantity"
              id="quantity"
              placeholder="$123.87"
            />
          </div>
          <div>
            <h3>TOTAL Value</h3>
            <input type="text" name="ma" id="ma" placeholder="$123.7" />
          </div>
        </div>
      </div>
    );
  };

  const SellTabContent = () => {
    return (
      <div className="tab-content">
        <div className="input-section">
          <div>
            <h3>QUANTITY</h3>
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="1"
            />
          </div>
          <div>
            <h3>MARKET PRICE</h3>
            <input
              type="text"
              name="quantity"
              id="quantity"
              placeholder="$123.87"
            />
          </div>
          <div>
            <h3>TOTAL Value</h3>
            <input type="text" name="ma" id="ma" placeholder="$123.7" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <CustomModal handleClose={closeModal}>
      <div
        className={
          loading
            ? styles["watchlist-modal"] + " " + styles["spinner-loads"]
            : styles["watchlist-modal"]
        }
      >
        <div style={{ textAlign: "center", color: "#3AD6A1" }}>{message}</div>
        <div className={styles["sell-order"]}>
          <h2
            style={{
              color: "#fff",
              fontSize: "20px",
            }}
          >
            Watchlist Stock
          </h2>
          <div className={styles["appl-search"]}>
            <input
              type="search"
              id="watchlist"
              placeholder={mainlandingpage.watchlistData.search.placeholder}
              onChange={(e) => search(e.target.value)}
              autoFocus
            />
            <img src="assets/images/icons/search.svg" alt="" />
          </div>
        </div>

        <AddStock_Modal
          data={data}
          showDetails={showDetails}
          detailView={detailView}
          name={name}
          marketMic={marketMic}
          closeModal={closeModal}
          addStocks={addStocks}
          setLoading={setLoading}
        />
      </div>
    </CustomModal>
  );
};

export default AddStock;
