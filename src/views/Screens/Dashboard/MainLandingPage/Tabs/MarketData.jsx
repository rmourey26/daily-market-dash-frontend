import React, { useEffect, useState } from "react";
import axiosInstance from "src/services/axios";
import MarketDataRow from "../widgets/MarketDataRow";
import { mainlandingpage } from "src/data/constants";
import { useSetting } from "src/hooks/useSetting";
import { useStateIfMounted } from "use-state-if-mounted";
import styles from "./TabsModulesStyling/MarketDataTab.module.scss";
import { useLocation } from "react-router";

const MarketData = ({ back, setBack, setOpen, open, openModal, setBuys, buys,setBuyZIndex }) => {
  const [data, setData] = useStateIfMounted([]);
  const [ticketsdata, setTicketsData] = useStateIfMounted([]);
  const [action, setAction] = useStateIfMounted("exchanges");
  const [column, setColumn] = useStateIfMounted(
    mainlandingpage.marketData.fixedHeading
  );
  const [market, setMarket] = useStateIfMounted("");
  const [searchVal, setSearchVal] = useStateIfMounted("");
  const [loading, setLoading] = useState(false);

  const { toggleKeyboard } = useSetting();

  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }
  const search = (value, action_search, market_search) => {
    var isBlank = hasWhiteSpace(value);
    // setSearchVal(value);
    if (isBlank === true || value !== "") {
      console.log("log: searched value", value);
      setSearchVal(value);
    } else {
      setMarketData(action_search, market_search);
    }
    console.log("searchVal", searchVal);
  };

  useEffect(() => {
    console.log("log: back", back);
    if (back) {
      refreshData("exchanges");
      setBack(false);
    }
  }, [back]);

  const goBack = () => {
    setBack(!back);
  };

  const setMarketData = async (action_search, market_search) => {
    await axiosInstance
      .post("/markets/", {
        action: action_search,
        market_mic: market_search,
      })
      .then(function (response) {
        // console.log("response is", response.data[action_search], action_search)
        setData(response.data[action_search]);
      })
      .catch(function (errors) {
        console.log(errors);
      });
  };

  useEffect(() => {
    // console.log("searchvalue", searchVal)
    const getSearchData = async () => {
      let filterdData;
      if (searchVal) {
        console.log("log:", searchVal);
        filterdData = ticketsdata.filter(
          (item) =>
            item.name
              .toString()
              .toLowerCase()
              .includes(searchVal.toLowerCase()) ||
            item.symbol
              .toString()
              .toLowerCase()
              .includes(searchVal.toLowerCase())
        );
        if (filterdData) {
          setData(filterdData);
        }
      }
    };
    // if (searchVal !== "") getSearchData();
    getSearchData();
  }, [searchVal]);

  async function refreshData(action, name, market) {
    // console.log(action, name, market);
    let postData;
    if (action === "symbol") {
      setLoading(true);
      postData = {
        action: action,
        market_mic: market,
        market_symbol: name,
      };
    } else if (action === "watched") {
      setLoading(true);
      postData = {
        action: action,
        market_mic: name,
      };
    } else if (action === "held") {
      setLoading(true);
      postData = {
        action: action,
        market_mic: name,
      };
    } else {
      setLoading(true);
      postData = {
        action: action,
        market_mic: name,
      };
    }

    await axiosInstance
      .post("/markets/", postData)
      .then(function (response) {
        if (
          action !== "symbol" &&
          action !== "held" &&
          action !== "watched" &&
          action !== "exchanges"
        ) {
          setData(response.data.tickers);
          setTicketsData(response.data.tickers);
          setLoading(false);
        } else if (action === "exchanges") {
          setData(response.data.exchanges);
          setLoading(false);
        } else {
          setData(response.data);
          setLoading(false);
        }
        // setData(response.data.tickers)
        if (action === "symbol") {
          setColumn(market);
        } else if (action === "exchanges") {
          setColumn(mainlandingpage.marketData.fixedHeading);
        } else if (action === "held") {
          setColumn("Most Held by Members");
        } else if (action === "watched") {
          setColumn("Most Watched by Members");
        } else {
          setColumn("Symbol");
        }

        setMarket(name);
        setAction(action);
      })
      .catch(function (errors) {
        console.log(errors);
      });
  }

  useEffect(() => {
    // refreshData("tickers")
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasMarketData = queryParams.has('marketdata');
  
 
   useEffect(() => {
      if(hasMarketData){
        refreshData("exchanges")
      }
    
   }, []);
  

  const handleFocus = (e) => {
    toggleKeyboard();
  };

  const handleBlur = (e) => {
    toggleKeyboard();
  };

  return (
    <div>
      <div
        // className={styles["main-landing-profile"] + " " + styles["main-pro"]}
        className={
          loading
            ? styles["main-landing-profile"] + " " + styles["main-pro"]+
              " " +
              styles["spinner-loads"] +
              " " +
              styles["prof-spinr"]
            : styles["main-landing-profile"]+ " " + styles["main-pro"]
        }
      >
        <div className={styles["ranking"] + " " + styles["market-data"]}>
          {action && (
            <div
              className={
                styles["row"] +
                " " +
                styles["head"] +
                " " +
                styles["most-held-icon"]
              }
            >
              <div
                className={styles["col-3"] + " " + styles["stock-data-prnt"]}
                // key={column}
                style={{
                  paddingRight: 0,
                  paddingLeft: 0,
                  width: "100%",
                }}
              >
                <h4
                  style={{
                    textTransform: "capitalize",
                    fontWeight: "500",
                  }}
                >
                  <div className={styles.HeroHeading}>{column}</div>

                  {action && action !== "exchanges" && (
                    <>
                      <img
                        src="assets/images/back-02.png"
                        alt=""
                        className={styles["back-arw"]}
                        style={{
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          refreshData("exchanges");
                          setTimeout(() => {
                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                          }, 0);
                        }}
                      />

                      {action &&
                        action !== "exchanges" &&
                        action !== "watched" &&
                        action !== "held" && (
                          <div className={styles["stock-data-search"]}>
                            <input
                              type="search"
                              id="watchlist"
                              placeholder="Search"
                              onChange={(e) =>
                                search(e.target.value, action, market)
                              }
                              autoFocus
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                            />
                            <img src="assets/images/icons/search.svg" alt="" />
                          </div>
                        )}
                    </>
                  )}
                </h4>
              </div>
            </div>
          )}
          {data &&
            action !== "symbol" &&
            action !== "held" &&
            action !== "watched" &&
            data &&
            data?.map((stock, i) => (
              <MarketDataRow
                market={market}
                action={action}
                refreshData={refreshData}
                stock={stock}
                key={i}
                searchVal={searchVal}
                setOpen={setOpen}
                open={open}
                openModal={openModal}
                setBuys={setBuys}
                buys={buys}
                setBuyZIndex={setBuyZIndex}
              />
            ))}

          {data && action === "symbol" && (
            <MarketDataRow
              market={market}
              action={action}
              refreshData={refreshData}
              stock={data}
              key={data}
              searchVal={searchVal}
              setBuys={setBuys}
              buys={buys}
              setBuyZIndex={setBuyZIndex}
              
            />
          )}

          {data && action === "watched" && (
            <MarketDataRow
              market={market}
              action={action}
              refreshData={refreshData}
              stock={data}
              key={data}
              setOpen={setOpen}
              open={open}
              openModal={openModal}
              setBuys={setBuys}
              buys={buys}
            />
          )}

          {data && action === "held" && (
            <MarketDataRow
              market={market}
              action={action}
              refreshData={refreshData}
              stock={data}
              key={data}
              setOpen={setOpen}
              open={open}
              openModal={openModal}
              setBuys={setBuys}
              buys={buys}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketData;
