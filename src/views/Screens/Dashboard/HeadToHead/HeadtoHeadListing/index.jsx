import React, { useState, useEffect, useRef, useCallback } from "react";
// import Header from "../../../../HeaderPremiumOne.jsx";
import Header from "src/views/Screens/HeaderPremiumOne.jsx";
import StaticBottomNavigation from "../../StaticBottomNavigation.js";
// import StaticBottomNavigation from "../../../StaticBottomNavigation";
// import ReactScrollWheelHandler from "react-scroll-wheel-handler";
// import { useAuth } from "src/hooks/useAuth";
// import { AuthenticatedApp } from "src/components/AuthenticatedApp";
// import { UnauthenticatedApp } from "src/components/UnauthenticatedApp";
// import { Landing } from "src/components/Landing";
import axiosInstance from "src/services/axios";
import WelcomePopUp from "src/components/Modals/WelcomePopUp/WelcomePopUp";
import parse from "html-react-parser";
import { useNavigate } from "react-router";
import HeadLeaderList from "src/components/Cards/HeadList/index.jsx";
import useBookSearch from "./useBookSearch.js";
import { CenterH2HTopHeader } from "../CommonSections/CenterH2HTopHeader.js";
import { LeftDate } from "../CommonSections/LeftDate.js";

const Leaderlisting = ({
   setShow,
   show,
   openChat,
   setOpenChat,
   showNotification,
   setShowNotification,
   bracketsdataleaders = [],
   bracketsdatamygame,
   showLast,
   goDown,
   goUp,
   // startIndex = { startIndex },
   bracketsdataround,
   getSearchData = () => { },
   setSearch,
   search,
   searchs,
   back,
   infoPopup
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

   const saved = localStorage.getItem("membersInfo");
   const memberInfoData = JSON.parse(saved);
   const day = memberInfoData?.marketdate;

   const [Up, setUp] = useState(false);
   const [Down, setDown] = useState(false);
   const [middle, setmiddle] = useState(true);
   const [welcomePopUp, setWelcomePopUp] = useState(false);
   const [datas, setDatas] = useState([]);
   const [searchOpen, setSearchOpen] = useState(false);

   const [listLeader, setListLeader] = useState([]);

   const [pageNumber, setPageNumber] = useState(1);
   // const [dataCount, setDataCount] = useState(50);

   const { books, hasMore, loading, error } = useBookSearch(pageNumber);

   const observer = useRef();
   const lastBookElementRef = useCallback(
      (node) => {
         if (loading) return;
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
               setPageNumber((prevPageNumber) => prevPageNumber + 50);
               // setDataCount(dataCount+50)
            }
         });
         if (node) observer.current.observe(node);
      },
      [loading, hasMore]
   );

   const navigate = useNavigate();

   useEffect(() => {
      const boo = sessionStorage.getItem("welcomeh2h");
      if (boo === "false") {
         setWelcomePopUp(false);
      } else {
         setWelcomePopUp(true);
      }

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
      sessionStorage.setItem("welcomeh2h", false);
      setWelcomePopUp(false);
   };

   const handleChange = (event) => {
      setSearch(event.target.value);
   };

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
      <div className="container-fluid StandardGuest">
         <div className="items headerone">
            {datas && welcomePopUp && bracketsdatamygame.isPlayer !== 0 && (
               <WelcomePopUp
                  heading="Welcome to Round x of Head 2 Head Oct 7, 2022"
                  data1={parse(`${datas.h2hrules}`)}
                  data={parse(`${datas.h2hdetails}`)}
                  nav={nav}
                  handlecontinue={handlecontinue}
               />
            )}
            <Header
               show={show}
               setShow={setShow}
               openChat={openChat}
               setOpenChat={setOpenChat}
               showNotification={showNotification}
               setShowNotification={setShowNotification}
            />
         </div>

         <div className="items premium-tabs">
            <div className="premium-head">
               <CenterH2HTopHeader />
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
                     Round <span>0</span> of <span>0</span>
                  </h3>
                  <div className="premium-tab-links">
                     <h3>previous</h3>
                     <h3>rounds</h3>
                  </div>
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
                           // onChange={(e) => searchs(e.target.value)}
                           />
                           <label
                              className="button searchbutton"
                              htmlFor="searchright"
                           // onClick={getSearchData}
                           >
                              <span className="mglass">&#9906;</span>
                           </label>
                           <label
                              className="button closebutton"
                           // onClick={() => {setSearchOpen(false); back()}}
                           >
                              <span className="cglass">x</span>
                           </label>
                        </div>
                        <div
                           className="searchbutton"
                        // onClick={() => setSearchOpen(true)}
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
            <CenterH2HTopHeader />
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
                     Round <span>7</span> of <span>15</span>
                  </h3>
               </div>
            </div>
         </div>

         <HeadLeaderList
            setListLeader={setListLeader}
            listLeader={listLeader}
            lastBookElementRef={lastBookElementRef}
            books={books}
         />

         <div className="items footer">
            <StaticBottomNavigation
               show={show}
               setShow={setShow}
               openChat={openChat}
               setOpenChat={setOpenChat}
               showNotification={showNotification}
               setShowNotification={setShowNotification}
               infoPopup={infoPopup}
            />
         </div>
      </div>
   );
};
export default Leaderlisting;
