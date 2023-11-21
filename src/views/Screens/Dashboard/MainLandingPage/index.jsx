import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import axiosInstance from "src/services/axios";
import Header from "../../Header";
import StaticBottomNavigation from "../StaticBottomNavigation";
// import "./style.scss";
// import "./stylenew.scss";
// import "../HeadtoHeadDashboardGameOver/style.scss";
// import "../HeadToHead/custom.scss";
import styles from "./MainLandingPage.module.scss";
import { MarketData, MyProfileTab, RankingTab, WatchListTab } from "./Tabs";
import { AddStock, BuySellModal, HeadToHeadModal } from "./Modals";
import { InfoCard } from "src/components/Cards";
import { AmountFormatting } from "src/components";
import parse from "html-react-parser";
import { useNavigate } from "react-router";
import LearnMoreModal from "./Modals/LearnMoreModal";
import { mainlandingpage, extras } from "src/data/constants";
import debounce from "lodash.debounce";
import { useStateIfMounted } from "use-state-if-mounted";
import { useSetting } from "src/hooks/useSetting";
import WelcomePopUp from "src/components/Modals/WelcomePopUp/WelcomePopUp";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { updateUser } from "src/services/firebase";
import { getCookie } from "src/utils/Cookies";
import { setCookie } from "src/utils/Cookies";
import InfoMessageModal from "src/components/Modals/InfoMessageModal";
import RaiseFund from "src/components/FundAvailable";
// import mainLandingpage from "src/data/constants/mainLandingPage.constant";

// import { useSettings } from "src/hooks";

const TABs = [
  { value: "myportfolio", labal: mainlandingpage.tabs.portfolio },
  { value: "marketdata", labal: mainlandingpage.tabs.marketData },
  { value: "watchlist", labal: mainlandingpage.tabs.watchList },
  { value: "Leaderboard", labal: mainlandingpage.tabs.leaderBoard },
];

const MainLandingPage = ({ btnContinue }) => {
  const [currentTab, setCurrentTab] = useState(TABs[0].value);
  const [back, setBack] = useState(false);
  const [portfolioWel, setPortfolioWel] = useState(false);
  const [buys, setBuys] = useState(false);
  const [dateZIndex, setDateZIndex] = useState(false);
  const [buyZIndex, setBuyZIndex] = useState(false);

  // const [loading, setLoading] = useState(false);

  const { setting } = useSetting();
  const { auth } = useAuth();
  // console.log("buyBtn",buys)

  // let portfolioWelcome = getCookie("portfolioWelcomepopup");
  // console.log("portfolioWelcome", portfolioWelcome);

  // useEffect(() => {
  //   if (
  //     portfolioWelcome == null ||
  //     portfolioWelcome == "" ||
  //     portfolioWelcome == undefined
  //   ) {
  //     setPortfolioWel(true);
  //   }
  // }, []);

  const getProfile = async () =>
  axiosInstance
  .post("/members/", {
    action: "myprofile",
    // device: device,
  })
  .then(function (response) {
    updateUser(auth.userId, {
      avatar: response.data.avatar,
      avatartype: response.data.avatartype,
    });
    localStorage.removeItem("avatarId");
    localStorage.setItem("avatarId", response.data.avatar);
    localStorage.removeItem("avatartype");
    localStorage.setItem("avatartype", response.data.avatartype);
    window.localStorage.setItem(
      "membersProfileInfo",
      JSON.stringify(response.data)
    );
  })
  .catch(function (errors) {
    console.log(errors);
  });

const debouncedSaveProfile = useCallback(
  debounce(() => getProfile(), extras.setIntervalTime),
  []
);
debouncedSaveProfile();

  

  useEffect(() => {
    getProfile();
  }, []);

  const handleTabChange = (value) => {
    if (value === "marketdata") {
      setBack(true);
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 0);
    }
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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasMarketData = queryParams.has('marketdata');
  
 
   useEffect(() => {
      if(hasMarketData){
         setCurrentTab(TABs[1].value)
      } 
   }, []);
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
  }, []);

  // useEffect(() => {
  //   // setLoading(true)
  //   axiosInstance
  //     .post("/members/", {
  //       action: "myprofile",
  //       // device: device,
  //     })
  //     .then(function (response) {
  //       updateUser(auth.userId, {
  //         avatar: response.data.avatar,
  //         avatartype: response.data.avatartype,
  //       });
  //       localStorage.removeItem("avatarId");
  //       localStorage.setItem("avatarId", response.data.avatar);
  //       localStorage.removeItem("avatartype");
  //       localStorage.setItem("avatartype", response.data.avatartype);
  //       window.localStorage.setItem(
  //         "membersProfileInfo",
  //         JSON.stringify(response.data)
  //       );
  //     })
  //     .catch(function (errors) {
  //       console.log(errors);
  //     });
  // }, []);

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

  useEffect(() => {
    if(buys){
       setCurrentTab(TABs[0].value)
    }
 }, [buys]);

  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const day = memberInfoData?.marketdate;
  let marketday = memberInfoData?.marketday;
  const Bank = memberInfoData?.bank

  const nav = () => navigate("/AdditionalPassword");

  const getButton = () => {
    switch (currentTab) {
      case "myportfolio":
        return (
          <label
            className={styles["dyn-content"]}
            onClick={() => openModal("Buy")}
          >
            {" "}
            Buy
          </label>
        );

      case "marketdata":
        return (
          <label
            className={styles["dyn-content"]}
            onClick={() => openModal("LearnMore")}
          >
            {/*onClick={() => openModal("Buy")} */} Learn More
          </label>
        );

      case "watchlist":
        return (
          <label
            className={styles["dyn-content"]}
            onClick={() => openModal("Add")}
          >
            Add Stock
          </label>
        );

      case "Leaderboard":
        return (
          <label
            className="dyn-content leader-content"
            onClick={() => openModal("Head")}
          ></label>
        );

      default:
        return <label className={styles["dyn-content"]}>Buy / Sell</label>;
    }
  };

  const getTabContent = () => {
    switch (currentTab) {
      case "myportfolio":
        // if(Bank){
          return (
            <MyProfileTab
              setOpen={setOpen}
              open={open}
              openModal={openModal}
              setRefreshData={setRefreshData}
              refreshData={refreshData}
              marketdata={marketdata}

            />
          );
        // }
        // else{
        //   return(<MyProfileTab />)
        // }
        
        
      case "marketdata":
        return (
          <MarketData
            back={back}
            setBack={setBack}
            setOpen={setOpen}
            open={open}
            openModal={openModal}
            setBuys={setBuys}
            buys={buys}
            setBuyZIndex={setBuyZIndex}
          />
        );
      case "watchlist":
        return (
          <WatchListTab
            refreshData={refreshData}
            handleTabChangeMain={handleTabChange}
            setOpen={setOpen}
            open={open}
            openModal={openModal}
          />
        );

      case "Leaderboard":
        return <RankingTab />;

      default:
        return <MyProfileTab />;
    }
  };

  // const dollarAmount = (value) => new Intl.NumberFormat("en-US").format(value);
  // const dollarAmount = (value) =>
  //    Number(parseFloat(value).toFixed(2)).toLocaleString("en", {
  //       minimumFractionDigits: 2,
  //    });

  // const handlecontinue = () => {
  //   // sessionStorage.setItem("welcomeMain", false);
  //   setCookie("portfolioWelcomepopup", "true", 1);
  //   setPortfolioWel(false);
  // };

  const handleFocus = (e) => {
    e.target.classList.add("myClass");
  };

  const handleBlur = (e) => {
    e.target.classList.remove("myClass");
  };


  return (
    <div
      className={
        styles["main-loader"] +
        " " +
        styles["landing-page"] +
        " " +
        styles["welcome-parent"]
      }
    >
      {/* {datas && portfolioWel && (
        <WelcomePopUp
          heading="Welcome to Daily Market Dash for Oct 7, 2022"
          data={parse(`${datas?.dailydetails}`)}
          data1={parse(`${datas?.dailyrules}`)}
          rulesofbothPages={parse(`${datas?.h2hrules}`)}
          welPopUpPage="true"
          nav={nav}
          handlecontinue={handlecontinue}
          btnContinue={marketdata?.marketday == 1 ? "Continue" : ""}
        />
      )} */}
      <Header setOpen={setOpen} open={open} />

      <div className={styles["ranking-rio"]} style={{zIndex:open=='sell' ||open=='LearnMore'|| buyZIndex==true||setting.ischatPopupActive == true ||
      setting.isprofileActive == true ||
      setting.isnotificationActive == true ||
      setting.isinfoPopupActive == true || setting.isprofileActive == true || setting.isPopupActive==true?'0':'3'}}>
        <div className={styles.container}>

        <div className={styles["raisingFund-row"]}>
        <div className={styles["raisingFund-col-2"]}>
          <div className={styles["battle-logo"]}>
            <Link to="/HeadToHeadScreen" className="roiLinked">
              <img src="toptabs/monthly-battle-royle-01.png" alt="" />
            </Link>
          </div>
        </div>
        <div className={styles["raisingFund-col-8"]}>
        <RaiseFund marketdata={marketdata}/>
        </div>
        <div className={styles["raisingFund-col-2"]}>
          <div className={styles["battle-logo"]}>
            <Link to="/DailyGame" className="roiLinked">
              <img src="toptabs/contest-leader-boards-01.png" alt="" />
            </Link>
          </div>
        </div>
       </div>
       
        </div>
      </div>

      <div
        className={styles["contest-calling"] + " " + styles["marketdatatab"]}
      >
        <div className={styles.contantDate} style={{zIndex:open=='sell' || open=='LearnMore'|| buyZIndex==true||setting.ischatPopupActive == true ||
        setting.isprofileActive == true ||
        setting.isnotificationActive == true ||
        setting.isinfoPopupActive == true || setting.isprofileActive == true||setting.isPopupActive==true || dateZIndex == true?'0':'5'}}>{day}</div>
        <div className={styles.tabs} style={{zIndex:open=='sell'|| open=='LearnMore'|| buyZIndex==true||setting.ischatPopupActive == true ||
        setting.isprofileActive == true ||
        setting.isnotificationActive == true ||
        setting.isinfoPopupActive == true || setting.isprofileActive==true||setting.isPopupActive==true?'0':'4'}}>
          {TABs.map((tab) => (
            <div
              className={
                tab.value === currentTab
                  ? styles.tab + " " + styles["tab-active"]
                  : styles.tab
              }
              onClick={() => {handleTabChange(tab.value); setBuys(false)}}
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
            setting.isinfoPopupActive == true || setting.isprofileActive
              ? styles["tab-contents"] + " " + styles["tab-overlay"]
              : styles["tab-contents"]
          }
        >
          {getTabContent()}
        </div>
      </div>

      {open && open === "Buy" && (
        <BuySellModal getNewData={setNewData} closeModal={closeModal}/>
      )}

      {open && open === "Add" && (
        <AddStock getNewData={setNewData} closeModal={closeModal} />
      )}

      {open && open === "Head" && <HeadToHeadModal closeModal={closeModal} />}

      {open && open === "LearnMore" && (
        <InfoMessageModal closeModal={closeModal} />
      )}

      <StaticBottomNavigation setOpen={setOpen} open={open} setDateZIndex={setDateZIndex} dateZIndex={dateZIndex}/>
    </div>
  );
};

export default MainLandingPage;
