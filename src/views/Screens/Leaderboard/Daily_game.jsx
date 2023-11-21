import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "src/services/axios";
import Header from "src/views/Screens/Header";
import StaticBottomNavigation from "src/views/Screens/Dashboard/StaticBottomNavigation";
import "src/views/Screens/Dashboard/MainLandingPage/style.scss";
import "src/views/Screens/Dashboard/MainLandingPage/stylenew.scss";
import "src/views/Screens/Dashboard/HeadtoHeadDashboardGameOver/style.scss";
import "src/views/Screens/Dashboard/HeadToHead/custom.scss";
import { InfoCard } from "src/components/Cards";
import { AmountFormatting } from "src/components";
import { mymoneypage, extras } from "src/data/constants";
import debounce from "lodash.debounce";
import { useStateIfMounted } from "use-state-if-mounted";

import LeaderboardGameContent from "./DailyGameContent";
import { Link } from "react-router-dom";
import Daily from "./Daily";
import { getCookie } from "src/utils/Cookies";
import WelcomePopUp from "src/components/Modals/WelcomePopUp/WelcomePopUp";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import Streak from "./Streak";
import RaiseFund from "src/components/FundAvailable";

const TABs = [
  { value: "Streak", labal: "Streak" },
  { value: "Daily", labal: "Daily" },
  { value: "Weekly", labal: "Weekly" },
];

const MyMoneyPage = ({ btnContinue }) => {
  const [open, setOpen] = useState("");
  const [marketdata, setMarketData] = useStateIfMounted([]);
  const [currentTab, setCurrentTab] = useState(TABs[0].value);
  const [datas, setDatas] = useStateIfMounted([]);
  const [portfolioWel, setPortfolioWel] = useState(1);

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  let leaderBoardwelcome = getCookie("leaderboardWelcomepopup");
 

//   useEffect(() => {   
//      if (leaderBoardwelcome == null || leaderBoardwelcome == "" || leaderBoardwelcome == undefined){
//         setPortfolioWel(true)
//      }
  
// }, []);

const handlecontinue = () => {
   // sessionStorage.setItem("welcomeMain", false);
  //  setCookie("leaderboardWelcomepopup", "true", 30);
   setPortfolioWel(1);
};



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

  useEffect(() => {
    getMembers();
  }, []);



  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

  const getTabContent = () => {
    switch (currentTab) {
      case "Streak":
        return <Streak />;
      case "Daily":
        return <Daily />;
      case "Weekly":
        return <LeaderboardGameContent />;

      default:
        return <Streak />;
    }
  };
  const navigate = useNavigate();

  const nav = () => navigate("/AdditionalPassword");

  useEffect(() => {
    axiosInstance
    .post("/members/", {
       action: "rules",
    })
    .then(function (response) {
      setPortfolioWel(response.data.daily);
    })
    .catch(function (errors) {
       console.log(errors);
    });
  }, [])


  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const day = memberInfoData?.marketdate;
  

  return (
    <div className="main-loader landing-page welcome-parent">
    { datas && portfolioWel === 0&&(
      <WelcomePopUp
        heading="Welcome to Daily Market Dash for Oct 7, 2022"
        data={parse(`${datas?.dailydetails}`)}
        data1={parse(`${datas?.dailyrules}`)}
        welPopUpPage="true"
        nav={nav}
        handlecontinue={handlecontinue}
        btnContinue={marketdata?.marketday === 1 ? "ACCEPT RULES" : ""}
      />
    )}
      <Header portfolioWel={portfolioWel}/>
      <div className="ranking-rio Daily_ranking-roi">
        <div className="Dialy_container">
        <div className="raisingFund-row">
        <div className="raisingFund-col-2">
          <div className="battle-logo">
            <Link to="/HeadToHeadScreen" className="roiLinked">
              <img src="toptabs/monthly-battle-royle-01.png" alt="" />
            </Link>
          </div>
        </div>
        <div className="raisingFund-col-8">
        <RaiseFund marketdata={marketdata}/>
        </div>
        <div className="raisingFund-col-2">
          <div className="battle-logo">
            <Link to="/MainLandingPage" className="roiLinked">
              <img src="toptabs/my-portfolio-01.png" alt="" />
            </Link>
          </div>
        </div>
       </div>
        </div>
      </div>
      <div className="contest-calling marketdatatab dailyGamepage">
      <div className="contantDate">{day}</div>
        <div className="row">
          {TABs.map((tab) => (
            <div
              className={tab.value === currentTab ? "tab tab-active" : "tab"}
              onClick={() => handleTabChange(tab.value)}
              key={tab.value}
            >
              <h2>{tab.labal}</h2>
            </div>
          ))}
        </div>

        {/* {getButton()} */}
      </div>

      <div className="dailygamecontent-container">{getTabContent()}</div>

      {/* <div className="contest-calling marketdatatab myMoneypg">
            <DailyGameContent />
         </div> */}

      <StaticBottomNavigation setOpen={setOpen} open={open} />
    </div>
  );
};

export default MyMoneyPage;
