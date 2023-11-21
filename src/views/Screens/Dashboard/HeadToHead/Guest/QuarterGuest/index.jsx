import React, { useState, useEffect } from "react";
import Header from "../../../../HeaderPremiumOne.jsx";
import StaticBottomNavigation from "../../../StaticBottomNavigation";
import axiosInstance from "src/services/axios";
// import parse from "html-react-parser";
import { useNavigate } from "react-router";
import { HeadToHeaderLeaderboard } from "src/components/Cards/index.jsx";
import { CenterH2HTopHeader } from "../../CommonSections/CenterH2HTopHeader.js";
import { LeftDate } from "../../CommonSections/LeftDate.js";
import { useStateIfMounted } from "use-state-if-mounted";
import { getCookie } from "src/utils/Cookies.js";
import { setCookie } from "src/utils/Cookies.js";
const QuarterGuest = ({
   bracketsdataleaders = [],

   bracketsdatamygame,
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
      <div className="container-fluid QuarterGuest">
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
         <HeadToHeaderLeaderboard bracketsdataleaders={bracketsdataleaders} />
         <div className="items mobile-section">
            <div className="previuos-tabs-for-mobile">
               {/*<CenterH2HTopHeader />*/}

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
export default QuarterGuest;
