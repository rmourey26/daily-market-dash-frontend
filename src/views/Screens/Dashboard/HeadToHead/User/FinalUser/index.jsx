import React, { useState, useEffect } from "react";
import Header from "../../../../HeaderPremiumOne.jsx";
import StaticBottomNavigation from "../../../StaticBottomNavigation";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
// import { useAuth } from "src/hooks/useAuth";

// import { UnauthenticatedApp } from "src/components/UnauthenticatedApp";
// import { Landing } from "src/components/Landing";
import { ChatRoom } from "src/components/ChatRoom";
import axiosInstance from "src/services/axios";
import "../../custom.scss";
// import Chat from "../../../../Chat";
// import { Fragment } from "react";
// import parse from "html-react-parser";
import { useNavigate } from "react-router";
import FinalGuest from "../../Guest/FinalGuest/index.jsx";
// import HoldingModal from "../../HoldingModal/index.jsx";
// import { extras } from "src/data/constants";
import { CenterH2HTopHeader } from "../../CommonSections/CenterH2HTopHeader.js";
import { LeftDate } from "../../CommonSections/LeftDate.js";
import { useStateIfMounted } from "use-state-if-mounted";
import {
   HeadTOHeadMyGame_Desktop,
   HeadToHeadMyGame_mobile,
} from "src/components/HeadToHead_MyGame/index.jsx";
import { getCookie } from "src/utils/Cookies.js";
import { setCookie } from "src/utils/Cookies.js";

const FinalUser = ({
   bracketsdataleaders,
   bracketsdatamygame,
   bracketsdataround,
   getSearchData = () => {},
   setSearch,
   search,
   searchs,
   back,
   day,
   memberAccInfo,
   getHoldingData,
   setDataHolding,
   dataHolding,
   previousGameNav,
}) => {
   // const { auth } = useAuth();
   const [width, setWidth] = useState(window.innerWidth);
   const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
   };
   useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
         window.removeEventListener("resize", handleWindowSizeChange);
      };
   }, []);

   const [Up, setUp] = useState(false);
   const [Down, setDown] = useState(false);
   const [middle, setmiddle] = useState(true);
   const [searchOpen, setSearchOpen] = useState(false);
   // const [leaderboardUp, setLeaderboardUp] = useState(false);
   // const [leaderboardDown, setLeaderboardDown] = useState(true);

   // const [data, setData] = useState([]);
   // const [allLeaderBoard, setAllLeaderBoard] = useState([]);

   // const [allNotifications, setAllNotifications] = useState([]);
   // const [notifications, setNotifications] = useState([]);
   // const [page, setPage] = useState(0);
   // const [count, setCount] = useState(10);
   // const [lastIndex, setLastIndex] = useState(0);
   // const [startIndex, setStartIndex] = useState(0);
   // const [showLast, setShowLast] = useState(true);

   const [welcomePopUps, setWelcomePopUps] = useState(1);
   const [datas, setDatas] = useStateIfMounted([]);
   const [openholdingfinalUser, setOpenholdingfinalUser] = useState(false);

   const navigate = useNavigate();

   // useEffect(() => {
   //    // getMarketData();

   //    let H2hwelcome = getCookie("H2hwelcomepopup");
   //    if (H2hwelcome == null || H2hwelcome == "" || H2hwelcome == undefined) {
   //       setWelcomePopUps(true);
   //    } else {
   //       setWelcomePopUps(false);
   //    }
   // }, []);

   useEffect(() => {
      console.log("log: welcomePopUps ud", welcomePopUps);
   }, [welcomePopUps]);

   const handlecontinue = () => {
      // setCookie("H2hwelcomepopup", "true", 30);
      setWelcomePopUps(1);
   
   };

   // const getMarketData = async () => {
   //    await axiosInstance
   //       .post("/leaderboard/", {
   //          action: "Portfolio",
   //       })
   //       .then(function (response) {
   //          if (!response || response?.data?.length <= 0) return;

   //          setAllNotifications(response.data);
   //          console.log("all", response.data.length);

   //          let temp = [];
   //          if (response.data.length >= 10) {
   //             for (let i = 0; i < 10; i++) {
   //                temp.push(response.data[i]);
   //             }
   //          } else {
   //             for (let i = 0; i < response.data.length; i++) {
   //                temp.push(response.data[i]);
   //             }
   //          }
   //          // for (let i = 0; i < 5; i++) {
   //          //    temp.push(response.data[i]);
   //          // }

   //          setNotifications(temp);
   //       })
   //       .catch(function (errors) {
   //          console.log(errors);
   //       });
   // };

   // const goDown = () => {
   //    let start = (1 + page) * count;
   //    let end = start + count;

   //    if (start > allNotifications.length) return;

   //    let tempNotifications = [];

   //    if (end > allNotifications.length) {
   //       end = allNotifications.length;
   //       setShowLast(false);
   //    }

   //    let last = 0;
   //    setStartIndex(start);
   //    for (let index = start; index < end; index++) {
   //       if (allNotifications[index]) {
   //          tempNotifications.push(allNotifications[index]);
   //          last = index;
   //       }
   //    }

   //    setLastIndex(last);
   //    setNotifications(tempNotifications);
   //    setPage(page + 1);
   // };

   // const goUp = () => {
   //    let start = startIndex - 1;
   //    let end = startIndex - count;

   //    if (end < 0 || page < 0) return;
   //    setShowLast(true);

   //    let tempNotifications = [];

   //    let last = 0;
   //    for (let index = start; index >= end; index--) {
   //       if (allNotifications[index]) {
   //          tempNotifications.push(allNotifications[index]);
   //          last = index;
   //       }
   //    }

   //    setNotifications(tempNotifications.reverse());
   //    setPage(page - 1 < 0 ? 0 : page - 1);
   //    setLastIndex(lastIndex - count);
   //    setStartIndex(last);
   // };

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

   // useEffect(() => {
   //    console.log("log: st", datas);
   // }, [datas]);

   const UpArrow = () => {
      setUp(true);
      setDown(false);
      setmiddle(false);
   };

   const middleArrow = () => {
      setUp(false);
      setDown(false);
      setmiddle(true);
   };

   const UpScroll = () => {
      if (width <= 768) {
         setUp(true);
         setDown(false);
         setmiddle(false);
      }
   };

   const middleScroll = () => {
      if (width <= 768) {
         setUp(false);
         setDown(false);
         setmiddle(true);
      }
   };

   const DownScroll = () => {
      if (width <= 768) {
         setUp(false);
         setDown(true);
         setmiddle(false);
      }
   };

   const DownArrow = () => {
      setUp(false);
      setDown(true);
      setmiddle(false);
   };

   const handleChange = (event) => {
      setSearch(event.target.value);
   };

   const save = localStorage.getItem("membersProfileInfo");
   const memberProileInfoData = JSON.parse(save);
   const HandleName = memberProileInfoData?.handle;
   // console.log("HandleName", HandleName);
   useEffect(() => {
      axiosInstance
      .post("/members/", {
         action: "rules",
      })
      .then(function (response) {
         setWelcomePopUps(response.data.brackets);

      })
      .catch(function (errors) {
         console.log(errors);
      });
    }, [])

   return (
      <>
         {bracketsdatamygame && bracketsdatamygame.isPlayer == 1 ? (
            <div className="container-fluid FinalUser">
               <div className="items headerone">
                  <Header
                     datas={datas}
                     handlecontinue={handlecontinue}
                     welcomePopUps={welcomePopUps}
                     memberAccInfo={memberAccInfo}
                  />
               </div>

               <div className="items premium-tabs">
                  <div className="premium-head">
                     <CenterH2HTopHeader marketdata={memberAccInfo} />
                     {/* <div className="guest-heads">
                        <div className="box-1">
                           <h1>
                              <span className="red-head">Head</span>
                              <span>2</span>
                              <span className="green-head">Head</span>
                           </h1>
                        </div>
                        <div className="box-2">
                           <div className="wins">
                              <h6>wins</h6>
                              <h6>$ 1500</h6>
                           </div>
                        </div>
                     </div> */}

                     {/*<h1 id="for-mobile">head 2 head</h1>*/}
                  </div>
                  <div className="row">
                     <LeftDate day={day} type="desktop" />
                     {/* <div className="zone">
                        <span className="day">{day}</span>
                        <span className="dt"></span>
                     </div> */}
                     <div className="premium-link">
                        <h3 className="for-desktop">
                        Round <span>{bracketsdataround?.thisRound}</span> 
                        {/*of{" "} <span>{bracketsdataround?.totalRounds}</span>*/}
                        </h3>
                        {/*// before uncomment previous first uncomment paddding from custom.scss 849*/}
                       {/* <div
                           className="premium-tab-links"
                           onClick={previousGameNav}
                           style={{ cursor: "pointer" }}
                        >
                           <h3>previous</h3>
                           <h3>rounds</h3>
                        </div>*/}
                        <div className="premium-tab-links">
                           <div className="search-container">
                              <div
                                 className={
                                    searchOpen
                                       ? "searchdaily active"
                                       : "searchdaily"
                                 }
                              >
                                 <input
                                    className="search expandright"
                                    id="searchright"
                                    type="text"
                                    name="search_result"
                                    value={search}
                                    placeholder="Search by rank or username"
                                    // onChange={handleChange}
                                    onChange={(e) => searchs(e.target.value)}
                                    onKeyPress={(event) => {
                                       if (event.key === "Enter") {
                                          getSearchData();
                                       }
                                    }}
                                 />
                                 <label
                                    className="button searchbutton"
                                    htmlFor="searchright"
                                    onClick={getSearchData}
                                 >
                                    <span className="mglass">&#9906;</span>
                                 </label>
                                 <label
                                    className="button closebutton"
                                    onClick={() => {
                                       setSearchOpen(false);
                                       back();
                                    }}
                                 >
                                    <span className="cglass">x</span>
                                 </label>
                              </div>
                              <div
                                 className="searchbutton"
                                 onClick={() => setSearchOpen(true)}
                              >
                                 <h3>search</h3>
                                 <h3>matchups</h3>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="items premium-tabs-mobile">
                  {/* <CenterH2HTopHeader />*/}
                  {/* <div className="guest-heads">
                     <div className="box-1">
                        <h1>
                           <span className="red-head">Head</span>
                           <span>2</span>
                           <span className="green-head">Head</span>
                        </h1>
                     </div>
                     <div className="box-2">
                        <div className="wins">
                           <h6>wins</h6>
                           <h6>$ 1500</h6>
                        </div>
                     </div>
                  </div> */}
                  <div className="row">
                     <div className="premium-tab-links active">
                        <LeftDate day={day} />
                        {/* <div className="zone timw-mobile">
                           <span className="day">{day}</span>
                           <span className="dt"></span>
                        </div> */}
                        <h3 id="for-mobile">
                        Round <span>{bracketsdataround?.thisRound}</span> 
                        {/*of{" "} <span>{bracketsdataround?.totalRounds}</span>*/}
                        </h3>
                     </div>
                  </div>
               </div>
               <div className="items premium-head-section">
                  <ReactScrollWheelHandler
                     rightHandler={(e) => {
                        Up == false ? DownScroll() : middleScroll();
                     }}
                     leftHandler={(e) => {
                        Down == false ? UpScroll() : middleScroll();
                     }}
                     upHandler={(e) => {
                        Down == false ? UpScroll() : middleScroll();
                     }}
                     downHandler={(e) => {
                        Up == false ? DownScroll() : middleScroll();
                     }}
                     style={{ scrollBehavior: "smooth" }}
                  >
                     <div
                        className="uparw"
                        href="#511"
                        onClick={Down == false ? UpArrow : middleArrow}
                     >
                        <img src="assets/images/top-arrow.png" alt="" />
                     </div>
                     <div
                        className="downarw"
                        href="#513"
                        onClick={Up == false ? DownArrow : middleArrow}
                     >
                        <img src="assets/images/bottom-arrow.png" alt="" />
                     </div>

                     <HeadToHeadMyGame_mobile
                        bracketsdatamygame={bracketsdatamygame}
                        setopenHolding={setOpenholdingfinalUser}
                        openHolding={openholdingfinalUser}
                        getHoldingData={getHoldingData}
                        setDataHolding={setDataHolding}
                        // checkHandle={checkHandle}
                        dataHolding={dataHolding}
                        HandleName={HandleName}
                     />

                     <HeadTOHeadMyGame_Desktop
                        bracketsdatamygame={bracketsdatamygame}
                        setopenHolding={setOpenholdingfinalUser}
                        openHolding={openholdingfinalUser}
                        getHoldingData={getHoldingData}
                        setDataHolding={setDataHolding}
                        // checkHandle={checkHandle}
                        dataHolding={dataHolding}
                        HandleName={HandleName}
                     />
                  </ReactScrollWheelHandler>
               </div>
               <div className="items conversation">
                  <ChatRoom />
               </div>
               <div className="items mobile-section">
                  <div className="previuos-tabs-for-mobile">
                     <div className="row">
                        <div className="pr-tabs">
                           <h2>
                              <span>leader</span>
                              <span>board</span>
                           </h2>
                        </div>
                        <div className="pr-tabs search-contain">
                           <div
                              className="search"
                              onClick={() => setSearchOpen(true)}
                           >
                              <h2>search matchups</h2>
                           </div>
                           <div
                              className={
                                 searchOpen
                                    ? "searchdaily active"
                                    : "searchdaily"
                              }
                           >
                              <div className="searchform">
                                 <input
                                    className="search expandright"
                                    id="searchright"
                                    type="text"
                                    name="search_result"
                                    value={search}
                                    placeholder="Search by rank or username"
                                    // onChange={handleChange}
                                    onChange={(e) => searchs(e.target.value)}
                                    onKeyPress={(event) => {
                                       if (event.key === "Enter") {
                                          getSearchData();
                                       }
                                    }}
                                 />
                                 <label
                                    className="button searchbutton"
                                    htmlFor="searchright"
                                    onClick={getSearchData}
                                 >
                                    <span className="mglass">&#9906;</span>
                                 </label>
                                 <label
                                    className="button closebutton"
                                    onClick={() => {
                                       setSearchOpen(false);
                                       back();
                                    }}
                                 >
                                    <span className="cglass">x</span>
                                 </label>
                              </div>
                           </div>
                        </div>
                                                {/*<div className="pr-tabs" onClick={previousGameNav}>
                           <h2>
                              <span>previous</span>
                              <span>rounds</span>
                           </h2>
                                 </div>*/}
                               
                     </div>
                  </div>
               </div>
               <div className="items footer">
                  <StaticBottomNavigation />
               </div>
            </div>
         ) : (
            <FinalGuest
               bracketsdatamygame={bracketsdatamygame}
               bracketsdataleaders={bracketsdataleaders}
               bracketsdataround={bracketsdataround}
               getSearchData={getSearchData}
               setSearch={setSearch}
               search={search}
               searchs={searchs}
               back={back}
               openholdingfinalUser={openholdingfinalUser}
               setOpenholdingfinalUser={setOpenholdingfinalUser}
               setDataHolding={setDataHolding}
               dataHolding={dataHolding}
               getHoldingData={getHoldingData}
               day={day}
               memberAccInfo={memberAccInfo}
               previousGameNav={previousGameNav}
            />
         )}
      </>
   );
};
export default FinalUser;
