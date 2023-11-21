import { useState, useEffect } from "react";
import Header from "../../HeaderPremiumOne.jsx";
import StaticBottomNavigation from "../StaticBottomNavigation";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
// import { useAuth } from "src/hooks/useAuth";

// import { UnauthenticatedApp } from "src/components/UnauthenticatedApp";
// import { Landing } from "src/components/Landing";
import { ChatRoom } from "src/components/ChatRoom";
import axiosInstance from "src/services/axios";

import "./style.scss";
// import Chat from "../../Chat";
// import { Fragment } from "react";
// import WelcomePopUp from "../../WelcomePopUp/WelcomePopUp.jsx";
import parse from "html-react-parser";
import { useNavigate } from "react-router";
// import { HeadToHeaderLeaderboard } from "src/components/Cards/index.jsx";
import StandardGuest from "./Guest/StandardGuest/index.jsx";
import HoldingModal from "./HoldingModal/index.jsx";
import { useChat } from "src/hooks/useChat.js";
import CalendarCard from "src/components/Calendar/CalendarCard.jsx";
import { extras } from "src/data/constants";
import { CenterH2HTopHeader } from "./CommonSections/CenterH2HTopHeader.js";
import { LeftDate } from "./CommonSections/LeftDate.js";
import WelcomePopUp from "src/components/WelcomePopUp/WelcomePopUp.jsx";

const PreviousGames = ({
   // bracketsdataleaders = [],
   // bracketsdatamygame,
   // bracketsdataround,
   // goUp,
   // goDown,
   // showLast,
   // startIndex,
   // getSearchData = () => { },
   // setSearch,
   // search,
   // searchs,
   // back,
   // nameOfMonthUS,
   currentDay,
   // day,
   memberAccInfo,
   getHoldingData,
   setDataHolding,
   dataHolding,

   checkHandle,

   // setCheckHandle,
}) => {
   // const { auth } = useAuth();
   const { setHeadToHeadChatId } = useChat();
   const saved = localStorage.getItem("membersInfo");
   const memberInfoData = JSON.parse(saved);
   const day = memberInfoData?.marketdate;
   const [bracketsdataround, setBracketsDataround] = useState([]);
   const [bracketsdatamygame, setBracketsDatamygame] = useState([]);
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
   const [welcomePopUp, setWelcomePopUp] = useState(false);
   const [datas, setDatas] = useState([]);
   const [searchOpen, setSearchOpen] = useState(false);
   const save = localStorage.getItem("membersProfileInfo");
   const memberProileInfoData = JSON.parse(save);
   const HandleName = memberProileInfoData?.handle;

   const [openHolding, setopenHolding] = useState(false);

   const navigate = useNavigate();

   useEffect(() => {
      
      const getSettingsData = async () => {
         await axiosInstance
            .post("/settings/", {
               action: "all",
            })
            .then(function (response) {
               setDatas(response.data.settings);
               console.log("htmlfaq", response.data.html[0]);

               console.log("log: ", response.data);
               // setShowDetails('')
               console.log("setting1", response.data);
            })
            .catch(function (errors) {
               console.log(errors);
            });
      };

      getSettingsData();
   }, []);

   useEffect(() => {
      const getBracketsData = async () => {
         await axiosInstance
            .post("/brackets/", {
               action: "status",
               member: window.localStorage.getItem("register"),
            })
            .then(function (response) {
               // console.log("log: bracket", response.data);
               //Set chatId for headtohead
               if (response.data?.mygame && response.data?.mygame.chatID) {
                  setHeadToHeadChatId(response.data?.mygame.chatID);
               }
               console.log("data1", response.data);
               // const list = objectToArray(response.data.leaders);
               // setBracketsData(response.data);
               setBracketsDataround(response.data.round);
               setBracketsDatamygame(response.data.mygame);
               // setBracketsDataleaders(list.length > 0 ? list : []);
               // setPayload(response.data.leaders);
            })
            .catch(function (errors) {
               console.log(errors);
            });
      };
      getBracketsData();
   }, []);


   const nav = () => navigate("/MainLandingPage");

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

   return (
      <>
         <div className="container-fluid StandardUser">
            <div className="items headerone">
               {datas && welcomePopUp && bracketsdatamygame.isPlayer !== 0 && (
                  <WelcomePopUp
                     heading="Welcome to Round x of Head 2 Head Oct 7, 2022"
                     data1={parse(`${datas.h2hrules}`)}
                     data={parse(`${datas.h2hdetails}`)}
                     nav={nav}
                     handlecontinue={handlecontinue}
                     btnContinue={memberAccInfo.h2hday == 1 ? "Continue" : ""}
                  />
               )}
               <Header />
            </div>
            <div className="items premium-tabs">
               <div className="premium-head">
                  <CenterH2HTopHeader memberAccInfo={memberAccInfo} />
               </div>
               {/* <CalendarCard /> */}
               <div className="row">
                  <LeftDate day={day} type="desktop" />

                  <div className="premium-link">
                     <h3 className="for-desktop">
                        Round <span>{bracketsdataround?.thisRound}</span> of{" "}
                        <span>{bracketsdataround?.totalRounds}</span>
                     </h3>
                     <div className="premium-tab-links">
                        <h3>previous</h3>
                        <h3>rounds</h3>
                     </div>
                     <div className="premium-tab-links">
                        {/* <div className="search-container">
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
                                    placeholder="Search by rank or username"
                                    value={search}
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
                                    for="searchright"
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
                           </div> */}
                     </div>
                  </div>
               </div>
            </div>
            <div className="items premium-tabs-mobile">
               <CenterH2HTopHeader memberAccInfo={memberAccInfo} />

               <div className="row">
                  <div className="premium-tab-links active">
                     <LeftDate day={day} />

                     <h3 id="for-mobile">
                        Round <span>{bracketsdataround?.thisRound}</span> of{" "}
                        <span>{bracketsdataround?.totalRounds}</span>
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
                  <div className="premium-profit-loss mobile" id="512">
                     <div
                        className="premium-pl-box green-brd"
                        style={{
                           border: `5px solid ${bracketsdatamygame?.myColor}`,
                        }}
                     >
                        <div className="premium-card matches">
                           <div className="left">
                              <div className="identity">
                                 <div className="pl-user east">
                                    <p>#{bracketsdatamygame?.myRank}</p>
                                    <h4>
                                       {bracketsdatamygame?.myHandle == "Me"
                                          ? HandleName
                                          : bracketsdatamygame?.myHandle}
                                    </h4>
                                 </div>
                                 <div className="west">
                                    <img
                                       src={
                                          extras.avatarUrl +
                                          `256_${bracketsdatamygame.myAvatar}.png`
                                       }
                                       // src={`https://www.dailymarketdash.com/services/images/avatar/256_${bracketsdatamygame.myAvatar}.png`}
                                       alt=""
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="right">
                              {/* <div className="pl-amount">
                                    <h2>p&l</h2>
                                    {mePrice()}
                  </div>*/}

                              <div className="pl-rate">
                                 <h2>roi</h2>
                                 <h2>{bracketsdatamygame?.myROI}%</h2>

                                 <button
                                    onClick={() => {
                                       setopenHolding(true);
                                       getHoldingData(
                                          bracketsdatamygame?.myHandle == "Me"
                                             ? HandleName
                                             : bracketsdatamygame?.myHandle
                                       );
                                    }}
                                 >
                                    holdings
                                 </button>
                              </div>
                              {openHolding && (
                                 <HoldingModal
                                    checkHandle={checkHandle}
                                    openHolding={openHolding}
                                    closeModel={setopenHolding}
                                    setDataHolding={setDataHolding}
                                    dataHolding={dataHolding}
                                 />
                              )}
                           </div>
                        </div>
                     </div>
                     <div className="premium-vs">
                        <span>vs</span>
                     </div>
                     <div
                        className="premium-pl-box red-brd"
                        style={{
                           border: `5px solid ${bracketsdatamygame?.themColor}`,
                        }}
                     >
                        <div className="premium-card matches">
                           <div className="left">
                              <div className="identity">
                                 <div className="pl-user east">
                                    <p>#{bracketsdatamygame.themRank}</p>
                                    <h4>{bracketsdatamygame.themHandle}</h4>
                                 </div>
                                 <div className="west">
                                    <img
                                       src={
                                          extras.avatarUrl +
                                          `256_${bracketsdatamygame.themAvatar}.png`
                                       }
                                       // src={`https://www.dailymarketdash.com/services/images/avatar/256_${bracketsdatamygame.themAvatar}.png`}
                                       alt=""
                                    />
                                 </div>
                              </div>
                           </div>

                           <div className="right">
                              {/*<div className="pl-amount">
                                    <h2>p&l</h2>
                                    {OpponentPrice()}
               </div>*/}

                              <div className="pl-rate">
                                 <h2>roi</h2>
                                 <h2>{bracketsdatamygame.themROI}%</h2>
                                 <button
                                    onClick={() => {
                                       setopenHolding(true);
                                       getHoldingData(
                                          bracketsdatamygame?.themHandle
                                       );
                                    }}
                                 >
                                    holdings
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="premium-profit-loss desktop" id="512">
                     <div
                        className="premium-pl-box green-brd"
                        style={{
                           border: `5px solid ${bracketsdatamygame?.myColor}`,
                        }}
                     >
                        <div className="premium-card matches">
                           <div className="front-side">
                              <div className="top">
                                 <div className="identity">
                                    #{bracketsdatamygame?.myRank}
                                    <button
                                       onClick={() => {
                                          setopenHolding(true);
                                          getHoldingData(
                                             bracketsdatamygame?.myHandle ==
                                                "Me"
                                                ? HandleName
                                                : bracketsdatamygame?.myHandle
                                          );
                                       }}
                                    >
                                       holdings
                                    </button>
                                 </div>
                                 {openHolding && (
                                    <HoldingModal
                                       checkHandle={checkHandle}
                                       openHolding={openHolding}
                                       closeModel={setopenHolding}
                                       setDataHolding={setDataHolding}
                                       dataHolding={dataHolding}
                                    />
                                 )}
                              </div>
                              <div className="user-profile">
                                 {/*<div className="pl-amount">
                                 <h2>p&l</h2>
                                 <h2>123</h2>
         </div>*/}
                                 <div className="pl-rate">
                                    <div className="pl-user">
                                       {bracketsdatamygame?.myHandle == "Me"
                                          ? HandleName
                                          : bracketsdatamygame?.myHandle}
                                    </div>
                                    <div className="pl-heading">
                                       <h2>roi</h2>
                                       <h2>{bracketsdatamygame?.myROI}%</h2>
                                    </div>
                                 </div>
                              </div>
                              <div className="user-pic">
                                 <div className="pl-user">
                                    <img
                                       src={
                                          extras.avatarUrl +
                                          `256_${bracketsdatamygame.myAvatar}.png`
                                       }
                                       // src={`https://www.dailymarketdash.com/services/images/avatar/256_${bracketsdatamygame.myAvatar}.png`}
                                       alt=""
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="premium-vs">
                        <span>vs</span>
                     </div>
                     <div
                        className="premium-pl-box red-brd"
                        style={{
                           border: `5px solid ${bracketsdatamygame?.themColor}`,
                        }}
                     >
                        <div className="premium-card matches">
                           <div className="front-side">
                              <div className="top">
                                 <div className="identity">
                                    #{bracketsdatamygame.themRank}
                                    <button
                                       onClick={() => {
                                          setopenHolding(true);
                                          getHoldingData(
                                             bracketsdatamygame?.themHandle
                                          );
                                       }}
                                    >
                                       holdings
                                    </button>
                                 </div>
                              </div>
                              <div className="user-profile">
                                 {/*<div className="pl-amount">
                                 <h2>p&l</h2>
                                 <h2>1213</h2>
         </div>*/}
                                 <div className="pl-rate">
                                    <div className="pl-user">
                                       {bracketsdatamygame?.themHandle}
                                    </div>
                                    <div className="pl-heading">
                                       <h2>roi</h2>
                                       <h2>{bracketsdatamygame.themROI}%</h2>
                                    </div>
                                 </div>
                              </div>
                              <div className="user-pic">
                                 <div className="pl-user">
                                    <img
                                       src={
                                          extras.avatarUrl +
                                          `256_${bracketsdatamygame.themAvatar}.png`
                                       }
                                       // src={`https://www.dailymarketdash.com/services/images/avatar/256_${bracketsdatamygame.themAvatar}.png`}
                                       alt=""
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </ReactScrollWheelHandler>
            </div>
            <div className="items conversation">
               <ChatRoom />
            </div>

            {/* <HeadToHeaderLeaderboard
                  bracketsdataleaders={bracketsdataleaders}
                  goUp={goUp}
                  goDown={goDown}
                  showLast={showLast}
                  startIndex={startIndex}
               /> */}

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
                        <div className="searchdaily">
                           {/* <div className="searchform">
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
                                    for="searchright"
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
                              </div> */}
                        </div>
                     </div>
                     <div className="pr-tabs">
                        <h2>
                           <span>previous</span>
                           <span>rounds</span>
                        </h2>
                     </div>
                  </div>
               </div>
            </div>
            <div className="items footer">
               <StaticBottomNavigation />
            </div>
         </div>
      </>
   );
};
export default PreviousGames;
