import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "src/services/axios";
import { MyProfileRow } from "../widgets";
import { SellModal } from "../Modals";
import { useStateIfMounted } from "use-state-if-mounted";
import { extras } from "src/data/constants";
import debounce from "lodash.debounce";
import styles from "../MainLandingPage.module.scss";

const MyProfileTab = ({
  setOpen,
  open,
  openModal,
  setRefreshData,
  refreshData,
  marketdata,

}) => {
  const [data, setData] = useStateIfMounted([]);
  // const [open, setOpen] = useState(false);
  // const [refreshData, setRefreshData] = useState(false);
  const [stock, setStock] = useState();
  const [DataSymbol, setDataSymbol] = useStateIfMounted([]);
  const [sellQuantity, setQuantity] = useState(0);
  const [selluid, setsellUuid] = useState();
  const [loading, setLoading] = useState(false);
  const [streakable, setStreakable] = useState();

  // const openModal = (type) => setOpen(type);
  // const closeModal = () => buyData.setOpen(false);
  const closeModal = () => setOpen(false);
  console.log("streakable",streakable)

  const setNewData = (value) => {
    setRefreshData(value);
  };

  useEffect(() => {
    axiosInstance
   .post("/members/", {
     action: "ranking",
   })
   .then(function (response) {
     window.localStorage.setItem(
       "membersInfo",
       JSON.stringify(response.data)
     );
   })
   .catch(function (errors) {
     console.log(errors);
   });
 }, []);

  const getMarketData = async () => {
    setLoading(true);
    await axiosInstance
      .post("/portfolio/", {
        action: "view",
      })
      .then(function (response) {
        setData(response.data.portfolio);
        setLoading(false);
      })
      .catch(function (errors) {
        console.log(errors);
      });
  };




  // console.log("refreshData", refreshData)
  useEffect(() => {
    if(marketdata){
    getMarketData();}
  }, [refreshData]);

  const debouncedMyPortfolio = useCallback(
    debounce(() => getMarketData(), extras.setIntervalTime),
    []
  );
  debouncedMyPortfolio();

  const handleSellButton = async (
    market_mic,
    market_symbol,
    action,
    quantity,
    uuid
  ) => {
    //API call
    const response = await axiosInstance.post("/portfolio/", {
      action: action,
      market_mic: market_mic,
      market_symbol: market_symbol,
    });
    if (!response || !response?.data) return;
    setQuantity(quantity);
    setsellUuid(uuid);
    openModal("sell");
    // buyData.openModal("sell");
    // console.log("log: res", response.data);
    setDataSymbol(response.data);
  };
  const saved = localStorage.getItem("membersProfileInfo");
  const memberProfileInfoData = JSON.parse(saved);
 
  return (
   
    <div>
      {open && open === "sell" && (
        <SellModal
          type="sell"
          setNewData={setNewData}
          sellData={DataSymbol}
          sellDatas={stock}
          closeModal={closeModal}
          selluid={selluid}
          sellQuantity={sellQuantity}
          streakable={streakable}
        />
      )}
<div
  className={
    loading
      ? styles["main-landing-profile"] +
        " " +
        styles["spinner-loads"] +
        " " +
        styles["prof-spinr"]
      : styles["main-landing-profile"]
  }
>
  {data &&
    data.map((stock, i) => (
      <MyProfileRow
        setNewData={setNewData}
        stock={stock}
        key={i}
        setStreakable={setStreakable}
        handleSellButton={() =>
          handleSellButton(
            stock.market_mic,
            stock.market_symbol,
            "symbol",
            stock.quantity,
            stock.uuid,
            stock.streakable

            
          )
        }
      />
    ))}
</div>
      
    </div>
  );
};

export default MyProfileTab;
