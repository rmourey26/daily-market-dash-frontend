import React, { useState, useEffect, Fragment } from "react";
import { portfolioAction } from "src/actions/portfolio.actions";
// import { mainlandingpage } from "src/data/constants";
import axiosInstance from "src/services/axios";
import CustomModal from "src/components/Modals/CustomModal";
import { useStateIfMounted } from "use-state-if-mounted";
import { useSetting } from "src/hooks/useSetting";
import { BuySellModal_form, BuySell_Model } from "src/components/Modals/Modal_Buy&sell";
import "./style.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const InitialSelectedStock = {
   name: "",
   symbol: "",
   mic: "",
   quantity: 1,
};

const BuySellModal = ({ closeModal, getNewData: setNewData }) => {
   const [message, setMessage] = useState();
   const [data, setData] = useStateIfMounted([]);
   const [searchVal, setSearchVal] = useState();
   const [stocks, setStocks] = useState();
   const [showDetails, setShowDetails] = useState(false);
   const [selectedStock, setSelectedStock] = useState(InitialSelectedStock);
   const [tabData, setTabData] = useState({
      buy: true,
      sell: false,
   });
   const [status, setStatus] = useState("block");
   const [disable, setDisable] = useState(false);
   const [min, setmin] = useState(1);
   const [loading, setLoading] = useState(false);
   const [limitPurchaseCrypto, setLimitPurchaseCrypto] = useState(0);
   const { toggleTostify } = useSetting();
   const [error, setError] = useState(false)

   const handleBuy = () => {
      setStatus("none");
   };

   useEffect(() => {
      // console.log(searchVal)
      const getMarketData = async () => {
         if (searchVal.length >= 3)
            await axiosInstance
               .post("/portfolio/", {
                  action: "search",
                  search: searchVal,
               })
               .then(function (response) {
                  setData(response.data.tickers);
                  setShowDetails(false);
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

   const search = (value) => {
      setSearchVal(value);
   };

   useEffect(() => {
      setTimeout(() => setMessage(""), 3000);
   }, [message]);

   useEffect(() => {
      // console.log("log: selec", selectedStock);
   }, [selectedStock]);

   const getStockInfo = async (market_mic, market_symbol) => {
      setData([]);
      const stock = data.filter((item) => item.symbol === market_symbol);
      const res = await portfolioAction({
         action: "symbol",
         market_mic,
         market_symbol,
      });
      if (!res || res?.portfolio?.length <= 0) return;
      setSelectedStock({
         name: stock[0].name,
         mic: market_mic,
         // price: res.last ? res.last : res.close,
         price: Number(
            res.last && res.last != 0
               ? res.last
               : res.close && res.close != 0
                  ? res.close
                  : res.open
         ),
         quantity:
            market_mic === "XCRY" &&
               Number(
                  res.last && res.last != 0
                     ? res.last
                     : res.close && res.close != 0
                        ? res.close
                        : res.open
               ) > 5000
               ? 0.01
               : 1,
         ...res,
      });
      setShowDetails(true);

      // console.log("log: res", res);
   };

   const handleSubmitBuySell = async () => {
      if (!selectedStock) return alert("Please select stock first!");

      let options = {
         action: tabData.buy ? "buy" : "sell",
         market_symbol: selectedStock.symbol,
         market_mic: selectedStock.mic,
         quantity: selectedStock.quantity,
         // price: Number(selectedStock.price) * Number(selectedStock.quantity),
         // price: Number(selectedStock.last ? selectedStock.last : selectedStock.close),
         price: Number(
            selectedStock.last && selectedStock.last != 0
               ? selectedStock.last
               : selectedStock.close && selectedStock.close != 0
                  ? selectedStock.close
                  : selectedStock.open
         ),
      };
      setLoading(true);
      // console.log("log: submit", options);
      const res = await portfolioAction(options);
      if (res) {
         setNewData(res.total);
         closeModal();
         // toast.success("Your order is placed successfully", {
         //    onOpen: () => toggleTostify(),
         //    onClose: () => toggleTostify()
         // })
         setMessage(tabData.buy ? "Successfully Buy" : "Successfully Sell");
      } else {
         alert("You don't have enough fund available to buy these shares")
         setError(true)
         // toast.error("Sorry your order is not placed", {
         //    onOpen: () => toggleTostify(),
         //    onClose: () => toggleTostify()
         // });
         // closeModal();
      }
      setLoading(false);
   };

   const handleTabChange = async (e) => {
      let notChanged = e.target.name === "buy" ? "sell" : "buy";
      setTabData({
         [`${e.target.name}`]: e.target.checked,
         [`${notChanged}`]: !e.target.checked,
      });
   };

   const memberDetails = JSON.parse(window.localStorage.getItem("membersInfo"));
   // const bank = memberDetails.bank
   const bank =
      memberDetails.bank != 0 ? memberDetails.bank : memberDetails.current;

   const limitPurchase = Math.floor(
      Number(
         bank /
         (selectedStock.last && selectedStock.last != 0
            ? selectedStock.last
            : selectedStock.close && selectedStock.close != 0
               ? selectedStock.close
               : selectedStock.open)
      )
   );

   useEffect(() => {
      let tempLimitPurchaseCrypto = Number(
         bank /
         (selectedStock.last && selectedStock.last != 0
            ? selectedStock.last
            : selectedStock.close && selectedStock.close != 0
               ? selectedStock.close
               : selectedStock.open)
      );
      console.log(tempLimitPurchaseCrypto);
      if (isNaN(tempLimitPurchaseCrypto)) {
         tempLimitPurchaseCrypto = null;
      }

      if (
         Number(
            selectedStock.last && selectedStock.last != 0
               ? selectedStock.last
               : selectedStock.close && selectedStock.close != 0
                  ? selectedStock.close
                  : selectedStock.open
         ) > 5000
      ) {
         setLimitPurchaseCrypto(Number(tempLimitPurchaseCrypto).toFixed(2));
      } else {
         setLimitPurchaseCrypto(Math.floor(tempLimitPurchaseCrypto));
      }
   }, [selectedStock]);

   const BuySell = () => {
      return (
         <>
            <BuySellModal_form
               selectedStock={selectedStock}
               setSelectedStock={setSelectedStock}
               bank={bank}
               limitPurchase={limitPurchase}
               limitPurchaseCrypto={limitPurchaseCrypto}
               handleSubmitBuySell={handleSubmitBuySell}
               disable={disable}
               setDisable={setDisable}
               closeModal={closeModal}
               error={error}
            />
         </>
      );
   };
   console.log("data", data);
   return (
      <CustomModal handleClose={closeModal}>
         <BuySell_Model
            selectedStock={selectedStock}
            search={search}
            showDetails={showDetails}
            data={data}
            getStockInfo={getStockInfo}
            loading={loading}
            BuySell={BuySell}
            message={message}
            error={error}
         />
         <ToastContainer />
      </CustomModal>
   );
};

export default BuySellModal;
