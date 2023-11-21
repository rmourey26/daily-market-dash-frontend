import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import debounce from "lodash.debounce";
import { useStateIfMounted } from "use-state-if-mounted";
import HeadToHeadStandard from "./HeadToHeadStandard.js";
import axiosInstance from "src/services/axios";
import SemiFinalUser from "./User/SemiFinalUser/index.jsx";
import FinalUser from "./User/FinalUser/index.jsx";
import QuarterUser from "./User/QuarterUser/index.jsx";
import objectToArray from "src/hooks/functions/objectToArray.js";
import parse from "html-react-parser";
import Header from "../../HeaderPremiumOne.jsx";
import StaticBottomNavigation from "../StaticBottomNavigation.js";
import { useChat } from "src/hooks/useChat.js";
import extras from "src/data/constants/extras.constant.js";
import { CenterH2HTopHeader } from "./CommonSections/CenterH2HTopHeader.js";


const HeadToHeadOneScreen = ({
   setShow,
   show,
   openChat,
   setOpenChat,
   showNotification,
   setShowNotification,
   infoPopup,
   setInfoPopup,
   boosterPopup,
   setBoosterPopup,
}) => {
   const [bracketsdata, setBracketsData] = useStateIfMounted([]);
   const [bracketsdataround, setBracketsDataround] = useStateIfMounted([]);
   const [bracketsdatamygame, setBracketsDatamygame] = useStateIfMounted([]);
   const [bracketsdataleaders, setBracketsDataleaders] = useStateIfMounted([]);
   const [standardRoud, setStandardRoud] = useState({
      all: [],
      display: [],
   });
   const [search, setSearch] = useStateIfMounted();
   const [payload, setPayload] = useStateIfMounted([]);
   const [page, setPage] = useState(0);
   const [count, setCount] = useState(4);
   const [lastIndex, setLastIndex] = useState(0);
   const [startIndex, setStartIndex] = useState(0);
   const [showLast, setShowLast] = useState(true);
   const [dataHolding, setDataHolding] = useStateIfMounted([]);
   const [welcomePopUps, setWelcomePopUps] = useState(1);
   const [datas, setDatas] = useStateIfMounted([]);
   const [memberAccInfo, setMemberAccInfo] = useStateIfMounted([]);
   const [loading, setLoading] = useState(false);
   const [width, setWidth] = useState(window.innerWidth);
   const navigate = useNavigate();
   const { setHeadToHeadChatId } = useChat();
   const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
   };
   useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
         window.removeEventListener("resize", handleWindowSizeChange);
      };
   }, []);

   const back = () => {
      setSearch("");
      const list = objectToArray(payload);
      setBracketsDataleaders(list.length > 0 ? list : []);
      if (
         bracketsdataround.isFinal == 0 &&
         bracketsdataround.isQuarter == 0 &&
         bracketsdataround.isSemi == 0 &&
         payload?.length != 0
      ) {
         let temp = [];
         if (width > 992) {
            if (bracketsdatamygame.isPlayer !== 0) {
               for (let i = 0; i < 4; i++) {
                  if (list[i]) temp.push(list[i]);
               }
            } else {
               temp = list;
            }
         } else {
            temp = list;
         }

         console.log("log: obj ot arra");

         setStandardRoud({
            all: list,
            display: temp,
         });
      }
   };

   useEffect(() => {
      axiosInstance
      .post("/members/", {
         action: "rules",
      })
      .then(function (response) {
         setWelcomePopUps(response.data.brackets);
         console.log(response.data)
         
      })
      .catch(function (errors) {
         console.log(errors);
      });
    }, [])

   const handlecontinue = () => {
      // setCookie("H2hwelcomepopup", "true", 30);
      setWelcomePopUps(1);
      
   };



   const previousGameNav = () => navigate("/PreviousGames");

   const saved = localStorage.getItem("membersInfo");
   const memberInfoData = JSON.parse(saved);
   const day = memberInfoData?.marketdate;

   const mainBracketCall = async () =>
      await axiosInstance
         .post("/members/", {
            action: "ranking",
         })
         .then(function (response) {
            setMemberAccInfo(response.data);
            // if (response.data.h2hday === 1) {
               //Brackets API Call
               getBracketsData();
            // } else {
               // let H2hwelcome = getCookie("H2hwelcomepopup");
               // if (H2hwelcome == null || H2hwelcome == "" || H2hwelcome == undefined) {
               //    setWelcomePopUps(true);
               // } else {
               //    setWelcomePopUps(false);
               // }

               getSettingsData();
            // }
         })
         .catch(function (errors) {
            console.log(errors);
         });

         const getBracketsData = async () => {
            setLoading(true);
            await axiosInstance
               .post("/loadtest/", {
                  action: "status",
                  member: window.localStorage.getItem("register"),
               })
               // .post("/loadtest/", {
               //    token: "good4loadtests",
               //    action: "status",
               //    player: 0,
               //    scenario: 9,
               // })
               .then(function (response) {
                  // console.log("log: bracket", response.data);
                  //Set chatId for headtohead
                  if (response.data?.mygame && response.data?.mygame.chatID) {
                     setHeadToHeadChatId(response.data?.mygame.chatID);
                  }
      
                  const list = objectToArray(response.data.leaders);
                  setBracketsData(response.data);
                  setBracketsDataround(response.data.round);
                  setBracketsDatamygame(response.data.mygame);
                  setBracketsDataleaders(list.length > 0 ? list : []);
                  setPayload(response.data.leaders);
                  setLoading(false);
      
                  if (
                     response.data.round.isFinal == 0 &&
                     response.data.round.isQuarter == 0 &&
                     response.data.round.isSemi == 0 &&
                     response.data.leaders?.length != 0
                  ) {
                     let temp = [];
                     if (width > 992) {
                        if (response.data.mygame.isPlayer !== 0) {
                           for (let i = 0; i < 4; i++) {
                              if (list[i]) temp.push(list[i]);
                           }
                        } else {
                           temp = list;
                        }
                     } else {
                        temp = list;
                     }
      
                     console.log("log: obj ot arra");
      
                     setStandardRoud({
                        all: list,
                        display: temp,
                     });
                  }
               })
               .catch(function (errors) {
                  console.log(errors);
               });
         };
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
            // console.log("setting1", response.data);
         })
         .catch(function (errors) {
            console.log(errors);
         });
   };

   const debouncedSaveBracketsHeadToHeadOne = useCallback(
      debounce(() => mainBracketCall(), extras.setIntervalTime),
      []
   );
   debouncedSaveBracketsHeadToHeadOne();
   useEffect(() => {
      mainBracketCall();
   }, []);

   const getSearchData = async () => {
      let res;
      if (isNaN(search)) {
         res = axiosInstance.post("/brackets/", {
            // token: "good4loadtests",
            action: "search",
            searchuser: search,
         });
      } else {
         res = axiosInstance.post("/brackets/", {
            // token: "good4loadtests",
            action: "search",
            searchrank: search,
         });
      }

      await res
         // await axiosInstance
         //    .post("/loadtest/", {
         //       token:"good4loadtests",
         //       action:"search",
         //       searchrank: search

         //    })
         .then(function (response) {
            // console.log("searchoo: ", response.data);
            const list = objectToArray(response.data.leaders);
            const searchGame = response.data.searchgame;
            var found = -1;
            for (var i = 0; i < list.length; i++) {
               if (list[i].leftRank === searchGame) {
                  found = i;
                  // list.unshift(list[i])
               }
            }

            if (list[found]) list.unshift(list[found]);
            // list = [...new Set(list)]

            // console.log([...new Set(list)])

            // setBracketsData(response.data);
            // setBracketsDataround(response.data.round);
            // setBracketsDatamygame(response.data.mygame);
            console.log("log: a", list.length > 0 ? [...new Set(list)] : []);
            setBracketsDataleaders(list.length > 0 ? [...new Set(list)] : []);

            // setStandardRoud({
            //    ...standardRoud,
            //    display: list,
            // });

            if (
               bracketsdataround.isFinal == 0 &&
               bracketsdataround.isQuarter == 0 &&
               bracketsdataround.isSemi == 0 &&
               response.data.leaders?.length != 0
            ) {
               let temp = [];
               if (width > 992) {
                  if (bracketsdatamygame.isPlayer !== 0) {
                     for (let i = 0; i < 4; i++) {
                        if ([...new Set(list)][i])
                           temp.push([...new Set(list)][i]);
                     }
                  } else {
                     temp = [...new Set(list)];
                  }
               } else {
                  temp = [...new Set(list)];
               }

               console.log("log: obj ot arra");

               setStandardRoud({
                  all: [...new Set(list)],
                  display: temp,
               });
            } else {
               setStandardRoud({
                  all: [],
                  display: [],
               });
            }
         })
         .catch(function (errors) {
            console.log(errors);
         });
   };

   function hasWhiteSpace(s) {
      return /\s/g.test(s);
   }

   function containsOnlyNumbers(str) {
      return /^\d+$/.test(str);
   }

   const searchs = (value) => {
      // console.log("value", hasWhiteSpace(value))
      var isBlank = hasWhiteSpace(value);
      // setSearchVal(value);
      if (isBlank === true || value !== "") {
         // alert("why here")
         console.log("log: searched value", value);
         if (containsOnlyNumbers(value)) {
            setSearch(Number(value));
         } else {
            setSearch(value);
         }
      } else {
         // alert("blank")
         // console.log("blank", ticketsdata, action_search, market_search);
         back();
      }

      // if (value === "") {
      //    setData(ticketsdata);
      // }
      // console.log("searchVal", searchVal);
   };

   const goDown = () => {
      let start = (1 + page) * count;
      let end = start + count;

      if (start > standardRoud.all.length) return;

      let tempStandardRouds = [];

      if (end >= standardRoud.all.length) {
         // end = standardRoud.all.length;
         setShowLast(false);
      }

      let last = 0;
      setStartIndex(start);
      for (let index = start; index < end; index++) {
         if (standardRoud.all[index]) {
            tempStandardRouds.push(standardRoud.all[index]);
            last = index;
         }
      }

      setLastIndex(last);
      setStandardRoud({ ...standardRoud, display: tempStandardRouds });
      setPage(page + 1);
   };

   const goUp = () => {
      let start = startIndex - 1;
      let end = startIndex - count;

      if (end < 0 || page < 0) return;
      setShowLast(true);

      let tempStandardRouds = [];

      let last = 0;
      for (let index = start; index >= end; index--) {
         if (standardRoud.all[index]) {
            tempStandardRouds.push(standardRoud.all[index]);
            last = index;
         }
      }

      setStandardRoud({
         ...standardRoud,
         display: tempStandardRouds.reverse(),
      });
      setPage(page - 1 < 0 ? 0 : page - 1);
      setLastIndex(lastIndex - count);
      setStartIndex(last);
   };

   const getHoldingData = async (checkHandle) => {
      setDataHolding();
      await axiosInstance
         .post("/brackets/", {
            action: "holdings",
            checkhandle: checkHandle,
         })
         .then(function (response) {
            setDataHolding(response.data.holdings);
         })
         .catch(function (errors) {
            console.log(errors);
         });
   };

   return (
      <>
         {memberAccInfo.h2hday === 0 &&
            datas.h2hrules &&
            bracketsdatamygame.isPlayer !== 0 ? (
            <div className={loading ? "spinner-loads hfront" : ""}>
               <div className="items headerone">
                  <Header
                     datas={datas}
                     handlecontinue={handlecontinue}
                     welcomePopUps={welcomePopUps}
                     memberAccInfo={memberAccInfo}

                  />
                  
                  <div className="premium-head" style={{marginTop:"10px"}}> 
                     <CenterH2HTopHeader/>
                  </div>

                  <div className="h2hClose_mainContainer">
                  <div className="h2hClose_pointBox">
                  <div className="h2hClose_contentContainer">
                  <span>The competition has already concluded for this month.</span>
                </div>
                </div>
                </div>

               </div>
               <div className="items footer">
                  <StaticBottomNavigation />
               </div>
            </div>
         ) :bracketsdata && (bracketsdataround.isLate==1 || bracketsdataround.isEarly==1) ?(
            <>
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

            <div className="h2hClose_mainContainerlateEarly">
            <div className="h2hClose_lateEarlyBox">
            <div className="h2hClose_contentContainerLateEarly">
            <span>The contest is closed message from payload</span>
          </div>
          </div>
          </div>

         
         <div className="items footer">
            <StaticBottomNavigation />
         </div>
      </>) :(
            <div className={loading ? "spinner-loads hfront" : ""}>
               {bracketsdata &&
                  bracketsdataround &&
                  bracketsdataround.isFinal == 0 &&
                  bracketsdataround.isQuarter == 0 &&
                  bracketsdataround.isSemi == 0 ? (
                  <HeadToHeadStandard
                     bracketsdatamygame={bracketsdatamygame}
                     bracketsdataleaders={standardRoud.display}
                     bracketsdataround={bracketsdataround}
                     startIndex={startIndex}
                     showLast={showLast}
                     goDown={goDown}
                     goUp={goUp}
                     getSearchData={getSearchData}
                     setSearch={setSearch}
                     search={search}
                     searchs={searchs}
                     back={back}
                     day={day}
                     memberAccInfo={memberAccInfo}
                     getHoldingData={getHoldingData}
                     setDataHolding={setDataHolding}
                     dataHolding={dataHolding}
                     previousGameNav={previousGameNav}
                     setLoading={setLoading}
                     loading={loading}
                  />
               ) : bracketsdataround.isFinal == 1 &&
                  bracketsdataround.isQuarter == 0 &&
                  bracketsdataround.isSemi == 0 ? (
                  <FinalUser
                     bracketsdatamygame={bracketsdatamygame}
                     bracketsdataleaders={bracketsdataleaders}
                     bracketsdataround={bracketsdataround}
                     getSearchData={getSearchData}
                     setSearch={setSearch}
                     search={search}
                     searchs={searchs}
                     back={back}
                     day={day}
                     memberAccInfo={memberAccInfo}
                     getHoldingData={getHoldingData}
                     setDataHolding={setDataHolding}
                     dataHolding={dataHolding}
                     previousGameNav={previousGameNav}
                     setLoading={setLoading}
                     loading={loading}
                  />
               ) : bracketsdataround.isQuarter == 1 &&
                  bracketsdataround.isFinal == 0 &&
                  bracketsdataround.isSemi == 0 ? (
                  <QuarterUser
                     bracketsdatamygame={bracketsdatamygame}
                     bracketsdataleaders={bracketsdataleaders}
                     bracketsdataround={bracketsdataround}
                     getSearchData={getSearchData}
                     setSearch={setSearch}
                     search={search}
                     searchs={searchs}
                     back={back}
                     day={day}
                     memberAccInfo={memberAccInfo}
                     getHoldingData={getHoldingData}
                     setDataHolding={setDataHolding}
                     dataHolding={dataHolding}
                     previousGameNav={previousGameNav}
                     setLoading={setLoading}
                     loading={loading}
                  />
               ) : bracketsdataround.isSemi == 1 &&
                  bracketsdataround.isFinal == 0 &&
                  bracketsdataround.isQuarter == 0 ? (
                  <SemiFinalUser
                     bracketsdatamygame={bracketsdatamygame}
                     bracketsdataleaders={bracketsdataleaders}
                     bracketsdataround={bracketsdataround}
                     getSearchData={getSearchData}
                     setSearch={setSearch}
                     search={search}
                     searchs={searchs}
                     back={back}
                     day={day}
                     memberAccInfo={memberAccInfo}
                     getHoldingData={getHoldingData}
                     setDataHolding={setDataHolding}
                     dataHolding={dataHolding}
                     previousGameNav={previousGameNav}
                     setLoading={setLoading}
                     loading={loading}
                  />
               ) : (
                  ""
               )}
            </div>
         )}
      </>
   );
};
export default HeadToHeadOneScreen;
