import React, { useState, useEffect } from "react";
import Header from "../../../../HeaderPremiumOne.jsx";
import StaticBottomNavigation from "../../../StaticBottomNavigation";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
// import { useAuth } from "src/hooks/useAuth";

// import { UnauthenticatedApp } from "src/components/UnauthenticatedApp";
// import { Landing } from "src/components/Landing";
// import { ChatRoom } from "src/components/ChatRoom";
import axiosInstance from "src/services/axios";
// import Chat from "../../../../Chat";
// import { Fragment } from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router";
import HeadToHeadRounds from "src/components/Cards/HeadToHeadRounds/index.jsx";
import HeadToHeadRoudsMobile from "src/components/Cards/HeadToHeadRoundsMobile/index.jsx";
import { CenterH2HTopHeader } from "../../CommonSections/CenterH2HTopHeader.js";
import { LeftDate } from "../../CommonSections/LeftDate.js";
import { useStateIfMounted } from "use-state-if-mounted";
import { getCookie } from "src/utils/Cookies.js";
import { setCookie } from "src/utils/Cookies.js";

const SemiFinalGuest = ({
   bracketsdatamygame,
   bracketsdataleaders,

   bracketsdataround,
   getSearchData = () => {},
   setSearch,
   search,
   searchs,
   back,
   openHoldingAllLeader,
   setopenHoldingAllLeader,
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
   const [welcomePopUps, setWelcomePopUps] = useState(1);
   const [datas, setDatas] = useStateIfMounted([]);
   const [searchOpen, setSearchOpen] = useState(false);

   const navigate = useNavigate();

   useEffect(() => {
      // let H2hwelcome = getCookie("H2hwelcomepopup");
      // if (H2hwelcome == null || H2hwelcome == "" || H2hwelcome == undefined) {
      //    setWelcomePopUps(true);
      // } else {
      //    setWelcomePopUps(false);
      // }

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

   const handlecontinue = () => {
      // setCookie("H2hwelcomepopup", "true", 30);
      setWelcomePopUps(1);
      setPortfolioWel(1)
   };

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
      <div className="container-fluid SemiFinalGuest">
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
            </div>
            <div className="row">
               <LeftDate day={day} type="desktop" />

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
                              searchOpen ? "searchdaily active" : "searchdaily"
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
            {/*<CenterH2HTopHeader />*/}

            <div className="row">
               <div className="premium-tab-links active">
                  <LeftDate day={day} />

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

               <HeadToHeadRoudsMobile
                  bracketsdataleaders={bracketsdataleaders[0]}
                  openHoldingAllLeader={openHoldingAllLeader}
                  setopenHoldingAllLeader={setopenHoldingAllLeader}
                  setDataHolding={setDataHolding}
                  dataHolding={dataHolding}
                  getHoldingData={getHoldingData}
               />
               <HeadToHeadRounds
                  bracketsdataleaders={bracketsdataleaders[0]}
                  openHoldingAllLeader={openHoldingAllLeader}
                  setopenHoldingAllLeader={setopenHoldingAllLeader}
                  setDataHolding={setDataHolding}
                  dataHolding={dataHolding}
                  getHoldingData={getHoldingData}
               />
            </ReactScrollWheelHandler>
         </div>
         <div className="items premium-head-section second">
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

               <HeadToHeadRoudsMobile
                  bracketsdataleaders={bracketsdataleaders[1]}
                  openHoldingAllLeader={openHoldingAllLeader}
                  setopenHoldingAllLeader={setopenHoldingAllLeader}
                  setDataHolding={setDataHolding}
                  dataHolding={dataHolding}
                  getHoldingData={getHoldingData}
               />
               <HeadToHeadRounds
                  bracketsdataleaders={bracketsdataleaders[1]}
                  openHoldingAllLeader={openHoldingAllLeader}
                  setopenHoldingAllLeader={setopenHoldingAllLeader}
                  setDataHolding={setDataHolding}
                  dataHolding={dataHolding}
                  getHoldingData={getHoldingData}
               />
            </ReactScrollWheelHandler>
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
                           searchOpen ? "searchdaily active" : "searchdaily"
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
   );
};
export default SemiFinalGuest;
