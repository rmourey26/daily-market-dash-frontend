import React, { useState, useEffect } from "react";
import "../../../HeadToHead/custom.scss";
import Header from "../../../../HeaderPremiumOne.jsx";
import StaticBottomNavigation from "../../../StaticBottomNavigation";
import axiosInstance from "src/services/axios";
// import parse from "html-react-parser";
import { useNavigate } from "react-router";
import { HeadToHeaderLeaderboard } from "src/components/Cards/index.jsx";
import { CenterH2HTopHeader } from "../../CommonSections/CenterH2HTopHeader";
import { LeftDate } from "../../CommonSections/LeftDate";
import { useStateIfMounted } from "use-state-if-mounted";
import { getCookie } from "src/utils/Cookies.js";
import { setCookie } from "src/utils/Cookies.js";

const StandardGuest = ({
   bracketsdataleaders = [],
   bracketsdatamygame,
   showLast,
   goDown,
   goUp,
   startIndex = { startIndex },
   bracketsdataround,
   getSearchData = () => {},
   setSearch,
   search,
   searchs,
   back,
   day,
   memberAccInfo,
   previousGameNav,
}) => {
   // const { auth } = useAuth();
   const [width, setWidth] = useState(window.innerWidth);

   let element = document.getElementById("searchDaily");

   const handleFocus = (e) => {
      // e.target.parentNode.classList.add("myClass");
      console.log("log: running:");
      element.classList.add("keyboardActive");
   };

   const handleBlur = (e) => {
      element.classList.remove("keyboardActive");

      // e.target.parentNode.classList.remove("myClass");
   };
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
      // const boo = sessionStorage.getItem("welcomeh2h");
      // if (boo === "false") {
      //    setWelcomePopUps(false);
      // } else {
      //    setWelcomePopUps(true);
      // }

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
   };

   const handleChange = (event) => {
      setSearch(event.target.value);
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
         {bracketsdataround &&
         bracketsdatamygame.isPlayer == 0 &&
         bracketsdataround.isEarly == 0 &&
         bracketsdataround.isLate == 0 &&
         bracketsdataround.isSemi == 0 &&
         bracketsdataround.isQuarter == 0 &&
         bracketsdataround.isFinal == 0 ? (
            <div className="container-fluid StandardGuest">
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
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
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

               <HeadToHeaderLeaderboard
                  bracketsdataleaders={bracketsdataleaders}
                  showLast={showLast}
                  goDown={goDown}
                  goUp={goUp}
                  startIndex={startIndex}
               />

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
                              id="searchDaily"
                           >
                              <div className="searchform">
                                 <input
                                    className="search expandright"
                                    id="searchright"
                                    type="text"
                                    name="search_result"
                                    value={search}
                                    placeholder="Search by rank or username"
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
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
            <div className="container-fluid StandardGuest">
               <div className="items headerone">
                  <Header
                     datas={datas}
                     handlecontinue={handlecontinue}
                     welcomePopUps={welcomePopUps}
                     memberAccInfo={memberAccInfo}
                  />
               </div>
                                 
               <div className="premium-head" style={{marginTop:"10px"}}> 
               <CenterH2HTopHeader/>
            </div>
               <div className="items footer">
                  <StaticBottomNavigation />
               </div>
            </div>
         )}
      </>
   );
};
export default StandardGuest;
