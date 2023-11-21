import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "src/services/axios";
import Header from "../../Header";
import StaticBottomNavigation from "../StaticBottomNavigation";
import "./style.scss";
import "./stylenew.scss";
import "../HeadtoHeadDashboardGameOver/style.scss";
import "../HeadToHead/custom.scss";
import { MarketData, MyProfileTab, RankingTab, WatchListTab } from "./Tabs";
import { AddStock, BuySellModal, HeadToHeadModal } from "./Modals";
import { InfoCard } from "src/components/Cards";
import { AmountFormatting } from "src/components";
import parse from "html-react-parser";
import { useNavigate } from "react-router";
import LearnMoreModal from "./Modals/LearnMoreModal";
import { mymoneypage, extras } from "src/data/constants";
import debounce from "lodash.debounce";
import { useStateIfMounted } from "use-state-if-mounted";
import {
   MyAffidavit,
   MyMembership,
   MyWinningTab,
   MyGames,
   MyPoints
} from "./MyMoney_Tabs";


import { useSetting } from "src/hooks/useSetting";
import WelcomePopUp from "src/components/Modals/WelcomePopUp/WelcomePopUp";
import { Link, useLocation } from "react-router-dom";
import ContactSupport_Form from "src/components/Modals/contact support/contactSupportForm";
import RaiseFund from "src/components/FundAvailable";


// import mymoneypage from "src/data/constants/mymoneypage.constant";

// import { useSettings } from "src/hooks";

const TABs = [
   { value: "mypoints", labal: mymoneypage.tabs.mypoints },
   { value: "mywinnings", labal: mymoneypage.tabs.mywinnings },
   { value: "myaffidavits", labal: mymoneypage.tabs.myaffidavits },
   { value: "mymembership", labal: mymoneypage.tabs.mystatus },
   { value: "mygames", labal: mymoneypage.tabs.mygames },
];

const MyMoneyPage = ({ btnContinue }) => {
   const [currentTab, setCurrentTab] = useState(TABs[0].value);
   const [contactSupportPopup, setContactSupportPopup] = useState(false);
   const [portfolioWel, setPortfolioWel] = useState(false);
   const [zindexHead, setZindexHead] = useState(false);

   const { setting } = useSetting();

   const handleTabChange = (value) => {
      // if (value === "marketdata") {
      //    setBack(true);
      //    setTimeout(() => {
      //       window.scrollTo({
      //          top: 0,
      //          left: 0,
      //          behavior: "smooth",
      //       });
      //    }, 0);
      // }
      setCurrentTab(value);
   };

   const [open, setOpen] = useState("");

   const openModal = (type) => setOpen(type);

   const closeModal = () => setOpen(false);

   const [refreshData, setRefreshData] = useState(false);
   const [marketdata, setMarketData] = useStateIfMounted([]);
   const [datas, setDatas] = useStateIfMounted([]);
   // const [dataPopup, setDataPopup] = useState([]);

   // const [navFade, setNavFade] = useState(false);
   const navigate = useNavigate();

   const setNewData = (value) => {
      setRefreshData(value);
   };

   // useEffect(() => {
   //    // getMarketData();
   //    const boo = sessionStorage.getItem("welcomeMain");
   //    if (boo === "false") {
   //       // console.log("log: ss", sessionStorage.getItem("welcomeMain"));
   //       setPortfolioWel(false);
   //    } else {
   //       setPortfolioWel(true);
   //    }
   // }, []);

   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const hasMembership = queryParams.has('membership');
   const hasPoint = queryParams.has('point');
  
 
   useEffect(() => {
      if(hasMembership){
         setCurrentTab(TABs[3].value)
      }
   }, [hasMembership]);
   
   useEffect(() => {
      if(hasPoint){
         setCurrentTab(TABs[0].value)
      }  
   }, [hasPoint]);

  
   const getMembers = async () =>
      await axiosInstance
         .post("/members/", {
            action: "ranking",
         })
         .then(function (response) {
            setMarketData(response.data);
            window.localStorage.setItem(
               "membersInfo",
               JSON.stringify(response.data)
            );
         })
         .catch(function (errors) {
            console.log(errors);
         });

   const debouncedSaveMembers = useCallback(
      debounce(() => getMembers(), extras.setIntervalTime),
      []
   );
   debouncedSaveMembers();

   useEffect(() => {
      getMembers();
      // setInterval(() => {

      // }, extras.setIntervalTime);
   }, []);

   useEffect(() => {
      // setLoading(true)
      axiosInstance
         .post("/members/", {
            action: "myprofile",
         })
         .then(function (response) {
            // setData(response.data);
            window.localStorage.setItem(
               "membersProfileInfo",
               JSON.stringify(response.data)
            );
            // setLoading(false)
            // setShowDetails('')
            // console.log("log:", response);
         })
         .catch(function (errors) {
            console.log(errors);
         });
   }, []);

   useEffect(() => {
      const getSettingsData = async () => {
         await axiosInstance
            .post("/settings/", {
               action: "all",
            })
            .then(function (response) {
               setDatas(response.data.settings);

               // console.log("log: ", response.data);
               // setShowDetails('')
               // console.log("setting1", response.data);
            })
            .catch(function (errors) {
               console.log(errors);
            });
      };

      getSettingsData();
   }, []);

   useEffect(() => {
      // console.log("log: st", datas);
   }, [datas, marketdata]);

   // useEffect(() => {
   //    setInterval(() => {
   //       getMarketData();
   //    }, 15000);
   // }, []);

   useEffect(() => {
      // 👇️ scroll to top on page load
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
   }, []);

   const saved = localStorage.getItem("membersInfo");
   const memberInfoData = JSON.parse(saved);
   const day = memberInfoData?.marketdate;
   let marketday = memberInfoData?.marketday;

   const nav = () => navigate("/AdditionalPassword");

   const getButton = () => {
      switch (currentTab) {
         default:
            return <label className="dyn-content" onClick={()=>{setContactSupportPopup(true)}}> Contact Support</label>;
      }
   };

   const getTabContent = () => {
      switch (currentTab) {

         case "mypoints":
            return  <MyPoints />;
         case "mywinnings":
            return <MyWinningTab />;
            
         case "myaffidavits":
            return <MyAffidavit  setZindexHead={setZindexHead}/>;
           
         case "mymembership":
            return <MyMembership />;
            

         case "mygames":
            return <MyGames />;

         default:
            return <MyPoints />;
      }
   };

   // const dollarAmount = (value) => new Intl.NumberFormat("en-US").format(value);
   // const dollarAmount = (value) =>
   //    Number(parseFloat(value).toFixed(2)).toLocaleString("en", {
   //       minimumFractionDigits: 2,
   //    });

   const handlecontinue = () => {
      sessionStorage.setItem("welcomeMain", false);
      setPortfolioWel(false);
   };

   const handleFocus = (e) => {
      e.target.classList.add("myClass");
   };

   const handleBlur = (e) => {
      e.target.classList.remove("myClass");
   };

   return (
      <div className="main-loader landing-page welcome-parent">
         <Header setOpen={setOpen} open={open} zindexHead={zindexHead}/>

         <div className="ranking-rio myMoney_ranking-rio">
            <div className="container myMoney_container">
            <div className="raisingFund-row">
            <div className="raisingFund-col-2">
              <div className="battle-logo">
                <Link to="/MainLandingPage" className="roiLinked">
                  <img src="toptabs/my-portfolio-01.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="raisingFund-col-8">
            <RaiseFund marketdata={marketdata}/>
            </div>
            <div className="raisingFund-col-2">
            </div>
           </div>
            </div>
         </div>

         <div className="contest-calling marketdatatab myMoneypg">
            <div className="contantDate">{day}</div>
            <div className="tabs">
               {TABs.map((tab) => (
                  <div
                     className={`tab ${
                        tab.value === currentTab ? "tab-active" : ""
                     }`}
                     onClick={() => handleTabChange(tab.value)}
                     key={tab.value}
                  >
                     <h2>{tab.labal}</h2>
                  </div>
               ))}

               {getButton()}
            </div>

            <div
               id="stopScroll"
               className={
                  open == "Buy" ||
                  open == "Add" ||
                  open == "buy" ||
                  open == "watchlist" ||
                  open == "LearnMore" ||
                  open == "sell" ||
                  setting.ischatPopupActive == true ||
                  setting.isprofileActive == true ||
                  setting.isnotificationActive == true ||
                  setting.isinfoPopupActive == true
                     ? "tab-contents tab-overlay"
                     : "tab-contents"
               }
            >
               {getTabContent()}
            </div>
         </div>

         {contactSupportPopup && 
            <ContactSupport_Form setContactSupportPopup={setContactSupportPopup} />
         }

        
         <StaticBottomNavigation setOpen={setOpen} open={open} zindexHead={zindexHead} />
      </div>
   );
};

export default MyMoneyPage;
