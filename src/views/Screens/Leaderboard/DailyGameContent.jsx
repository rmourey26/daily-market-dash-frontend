import React, { Fragment, useCallback } from "react";
import { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
import { AmountFormatting } from "src/components";
import { mainlandingpage, extras } from "src/data/constants";
import debounce from "lodash.debounce";
import Header from "../Header";
import StaticBottomNavigation from "../Dashboard/StaticBottomNavigation";
import styles from "./leaderboard.module.scss";

import { useStateIfMounted } from "use-state-if-mounted";
import { YellowPages } from "src/components/YellowBoxes";

const LeaderboardGameContent = () => {
   const [data, setData] = useState();
   const [threeData, setThreeData] = useStateIfMounted([]);
   const [loading, setLoading] = useStateIfMounted();
   const [title, setTitle] = useState();
   const [showfaces, setShowfaces] = useState(1);
   const topThree = [];

   // const getMarketData = async () => {
   //    setLoading(true);
   //    await axiosInstance
   //       .post("/leaderboard/", {
   //          // appid: "62f26b3e0be95",
   //          action: "weekly",
   //       })
   //       .then(function (response) {
   //          // var response = {
   //          //    data: [
   //          //       {
   //          //          position: 1,
   //          //          handle: "tourbus2",
   //          //          roi: 0.511182,
   //          //          image: "https://services.dailymarketdash.com/images/avatar/256_8.png",
   //          //          prize: 22,
   //          //          isMe: 1,
   //          //       },
   //          //       {
   //          //          position: 11,
   //          //          handle: "tourbus1",
   //          //          roi: 0.511182,
   //          //          image: "https://services.dailymarketdash.com/images/avatar/256_8.png",
   //          //          prize: 22,
   //          //          isMe: 0,
   //          //       },
   //          //       {
   //          //          position: 30,
   //          //          handle: "tourbus3",
   //          //          roi: 0.511182,
   //          //          image: "https://services.dailymarketdash.com/images/avatar/256_8.png",
   //          //          prize: 22,
   //          //          isMe: 0,
   //          //       },
   //          //       {
   //          //          position: 10,
   //          //          handle: "tourbus",
   //          //          roi: 0.511182,
   //          //          image: "https://services.dailymarketdash.com/images/avatar/256_8.png",
   //          //          prize: 22,
   //          //          isMe: 1,
   //          //       },
   //          //       {
   //          //          position: 4,
   //          //          handle: "tourbus",
   //          //          roi: 0.511182,
   //          //          image: "https://services.dailymarketdash.com/images/avatar/256_8.png",
   //          //          prize: 22,
   //          //          isMe: 0,
   //          //       },
   //          //    ],
   //          // };

   //          let sortedArray = response.data.sort((a, b) =>
   //             a.position > b.position ? 1 : -1
   //          );
   //          let temp = [];
   //          setLoading(false);
   //          // const filtered = response.data.filter((item) => item.isMe != 1);
   //          for (let i = 0; i < sortedArray.length; i++) {
   //             if (
   //                sortedArray[i].position === 1 ||
   //                sortedArray[i].position === 2 ||
   //                response.data[i].position === 3
   //             )
   //                topThree.push(sortedArray[i]);
   //             else temp.push(sortedArray[i]);
   //          }
   //          // const Topthree = response.data.slice(0, 3);
   //          setThreeData(topThree);
   //          // setThreeData(Topthree);
   //          // console.log(topThree.length)

   //          // console.log("filtered", filtered);
   //          // console.log("Topthree", Topthree);
   //          // if (filtered.length > 0) {
   //          //    if (filtered[0].position > response.data.length) {
   //          //       for (let i = topThree.length; i < response.data.length; i++) {
   //          //          temp.push(response.data[i]);
   //          //       }
   //          //       temp.push(filtered[0]);
   //          //    } else {
   //          //       for (let i = topThree.length; i < response.data.length; i++) {
   //          //          temp.push(response.data[i]);
   //          //       }
   //          //    }
   //          // } else {
   //          //    temp = response.data.slice(topThree.length, response.data.length);
   //          // }
   //          console.log("temp", threeData);
   //          if (response.data) setData(temp);
   //          else
   //             setInterval(() => {
   //                // getMarketData();
   //             }, 1500);
   //       })
   //       .catch(function (errors) {
   //          console.log(errors);
   //       });
   // };

   const getMarketData = async () => {
      setLoading(true);
      await axiosInstance
         .post("/leaderboard/", {
            action: "weekly",
         })
         .then(function (response) {
            setTitle(response.data.title);
            setShowfaces(response.data.showfaces);
            let sortedArray = response.data.ranks.sort((a, b) =>
               a.position > b.position ? 1 : -1
            );

            // Get the top three positions
            const topThree = [];
            for (let i = 0; i < sortedArray.length; i++) {
               if (sortedArray[i].position <= 3) {
                  topThree[sortedArray[i].position - 1] = sortedArray[i];
               }
            }

            // Fill in missing data with placeholders
            for (let i = 0; i < 3; i++) {
               if (!topThree[i]) {
                  topThree[i] = {
                     position: i + 1,
                     // Add other default properties as needed
                  };
               }
            }

            setThreeData(topThree);

            // Now, update the rest of the data
            if (response.data) {
               setData(sortedArray.filter(item => item.position > 3));
            } else {
               setInterval(() => {
                  // getDailyData();
               }, 1500);
            }

            setLoading(false);
         })
         .catch(function (errors) {
            console.log(errors);
         });
   };


   const debouncedSaveLeaderBoard = useCallback(
      debounce(() => getMarketData(), extras.setIntervalTime),
      []
   );
   debouncedSaveLeaderBoard();

   useEffect(() => {
      getMarketData();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
   }, []);
   

   return (
      <div>
      <div className={styles.titleGame}>{title&&title}</div>
         <div className={styles.dailyGamecontainer}>
            <div
               className={
                  loading
                     ? styles["main-landing-profile"] +
                       " " +
                       styles["h2h"] +
                       " " +
                       styles["spinner-loads"]
                     : styles["main-landing-profile"] + " " + styles["h2h"]
               }
            >
               <div className={styles.leaderboard}>
                  <div className={styles["lead-head"]}>
                     {/* top-3 players   */}
                     {showfaces==1 && data && threeData.length > 0 && (
                        <div className={styles.topthreerankers}>
                           <div className={styles.rankersarea}>
                              <div
                                 className={
                                    threeData[1]?.position
                                       ? styles["player"] + " " + styles["r1"]
                                       : styles["player"] +
                                         " " +
                                         styles["r1"] +
                                         " " +
                                         styles["hide"]
                                 }
                              >
                                 <div className={styles["player-card"]}>
                                    <div className={styles["p-position"]}>
                                       <h4>{threeData[1].position ? threeData[1]?.position:2}</h4>
                                    </div>
                                    <div className={styles["p-pics"]}>
                                    {threeData[1].image?<img style={{border:threeData[1].image? "none":"1px solid"}} src={extras.NewavatarUrl+threeData[1]?.image}  alt="" /> :<div style={{border:"1px solid"}} className={styles["replace1"]}></div>}
                                    </div>
                                    <div className={styles["p-grade"]}>
                                       <h4>
                                          {threeData[1].handle? threeData[1]?.handle?.substring(
                                             0,
                                             12
                                          ):"No WINNER"}
                                       </h4>
                                       <h4>
                                          {threeData[1].roi ? Number(
                                             Math.sign(threeData[1]?.roi)
                                          ).toFixed(2) == -1 &&
                                          Math.abs(
                                             Number(threeData[1]?.roi).toFixed(
                                                2
                                             )
                                          ) == 0
                                             ? Number(
                                                  Math.abs(threeData[1]?.roi)
                                               ).toFixed(3)
                                             : Number(
                                                  Math.sign(threeData[1]?.roi)
                                               ).toFixed(2) === 1 &&
                                               Number(
                                                  threeData[1]?.roi
                                               ).toFixed(2) !== 0
                                             ? "+" +
                                               Number(
                                                  threeData[1]?.roi
                                               ).toFixed(2)
                                             : Number(
                                                  threeData[1]?.roi
                                               ).toFixed(3):"0.00"}
                                          %
                                       </h4>
                                       <h4>
                                          $
                                          {threeData[1].prize? AmountFormatting(
                                             threeData[1]?.prize
                                          ):0}{" "}
                                          <sup>&dagger;</sup>
                                       </h4>
                                    </div>
                                 </div>
                              </div>
                              <div
                                 className={
                                    threeData[0]?.position
                                       ? styles["player"] + " " + styles["r2"]
                                       : styles["player"] +
                                         " " +
                                         styles["r2"] +
                                         " " +
                                         styles["hide"]
                                 }
                              >
                                 <div className={styles["player-card"]}>
                                    <div className={styles["p-position"]}>
                                       <h4>{threeData[0].position? threeData[0]?.position:1}</h4>
                                    </div>
                                    <div className={styles["p-pics"]}>
                                    {threeData[0].image?<img style={{border:threeData[0].image? "none":"1px solid"}} src={extras.NewavatarUrl+threeData[0]?.image}  alt="" /> :<div style={{border:"1px solid"}} className={styles["replace1"]}></div>}
                                    </div>
                                    <div className={styles["p-grade"]}>
                                       <h4>
                                          {threeData[0].handle? threeData[0]?.handle?.substring(
                                             0,
                                             12
                                          ):"NO WINNER"}
                                       </h4>
                                       <h4>
                                          {threeData[0].roi? Number(
                                             Math.sign(threeData[0]?.roi)
                                          ).toFixed(2) == -1 &&
                                          Math.abs(
                                             Number(threeData[0]?.roi).toFixed(
                                                2
                                             )
                                          ) == 0
                                             ? Number(
                                                  Math.abs(threeData[0]?.roi)
                                               ).toFixed(3)
                                             : Number(
                                                  Math.sign(threeData[0]?.roi)
                                               ).toFixed(2) === 1 &&
                                               Number(
                                                  threeData[0]?.roi
                                               ).toFixed(2) !== 0
                                             ? "+" +
                                               Number(
                                                  threeData[0]?.roi
                                               ).toFixed(2)
                                             : Number(
                                                  threeData[0]?.roi
                                               ).toFixed(3):"0.00"}
                                          %
                                       </h4>
                                       <h4>
                                          $
                                          {threeData[0].prize ? AmountFormatting(
                                             threeData[0]?.prize
                                          ):0}{" "}
                                          <sup>&dagger;</sup>
                                       </h4>
                                    </div>
                                 </div>
                              </div>
                              <div
                                 className={
                                    threeData[2]?.position
                                       ? styles["player"] + " " + styles["r3"]
                                       : styles["player"] +
                                         " " +
                                         styles["r3"] +
                                         " " +
                                         styles["hide"]
                                 }
                              >
                                 <div className={styles["player-card"]}>
                                    <div className={styles["p-position"]}>
                                       <h4>{threeData[2].position? threeData[2]?.position:3}</h4>
                                    </div>
                                    <div className={styles["p-pics"]}>
                                    {threeData[2].image?<img style={{border:threeData[2].image? "none":"1px solid"}} src={extras.NewavatarUrl+threeData[2]?.image}  alt="" /> :<div style={{border:"1px solid"}} className={styles["replace1"]}></div>}
                                    </div>
                                    <div className={styles["p-grade"]}>
                                       <h4>
                                          {threeData[2].handle? threeData[2]?.handle?.substring(
                                             0,
                                             12
                                          ):"NO WINNER"}
                                       </h4>
                                       <h4>
                                          {threeData[2].roi ? Number(
                                             Math.sign(threeData[2]?.roi)
                                          ).toFixed(2) == -1 &&
                                          Math.abs(
                                             Number(threeData[2]?.roi).toFixed(
                                                2
                                             )
                                          ) == 0
                                             ? Number(
                                                  Math.abs(threeData[2]?.roi)
                                               ).toFixed(3)
                                             : Number(
                                                  Math.sign(threeData[2]?.roi)
                                               ).toFixed(2) === 1 &&
                                               Number(
                                                  threeData[2]?.roi
                                               ).toFixed(2) !== 0
                                             ? "+" +
                                               Number(
                                                  threeData[2]?.roi
                                               ).toFixed(2)
                                             : Number(
                                                  threeData[2]?.roi
                                               ).toFixed(3):"0.00"}
                                          %
                                       </h4>
                                       <h4>
                                          $
                                          {threeData[2].prize ? AmountFormatting(
                                             threeData[2]?.prize
                                          ):0}{" "}
                                          <sup>&dagger;</sup>
                                       </h4>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           
                        </div>
                     )}
                     {/* top-3 players End  */}
                     {data && threeData &&<div
                              className={
                                 styles["row"] + " " + styles["headings"]
                              }
                           >
                              <div className={styles["col-3"]}>
                                 <h2>{mainlandingpage.leaderBoard.rank}</h2>
                              </div>
                              <div className={styles["col-3"]}>
                                 <h2>{mainlandingpage.leaderBoard.player}</h2>
                              </div>
                              <div className={styles["col-3"]}>
                                 <h2>{mainlandingpage.leaderBoard.roi}</h2>
                              </div>
                             {/* <div className={styles["col-3"]}>
                                 <h2>
                                    {mainlandingpage.leaderBoard.cash + ""}
                                    <sup> &dagger;</sup>
                                 </h2>
                           </div>*/}
                           </div>}
                  </div>

                  {data &&
                     threeData &&
                     data.map((stock) => (
                        <Fragment key={stock.position}>
                           {stock.isMe == 1 ? (
                              <div
                                 className={
                                    styles["row"] + " " + styles["active-user"]
                                 }
                              >
                                 <div className={styles["col-3"]}>
                                    <h4
                                       style={{
                                          fontWeight: "bold",
                                       }}
                                    >
                                       {stock.position}
                                    </h4>
                                 </div>
                                 <div
                                    className={
                                       styles["col-3"] + " " + styles["player"]
                                    }
                                 >
                                    <div className={styles["player-img"]}>
                                       <img src={extras.NewavatarUrl+stock.image} alt="" />
                                    </div>
                                    <h4
                                       style={{
                                          fontWeight: "bold",
                                       }}
                                    >
                                       {stock.handle?.substring(0, 12)}
                                    </h4>
                                 </div>
                                 <div className={styles["col-3"]}>
                                    <h4
                                       style={{
                                          fontWeight: "bold",
                                       }}
                                    >
                                       {Number(Math.sign(stock.roi)).toFixed(
                                          2
                                       ) == -1 &&
                                       Number(stock.roi).toFixed(2) == 0
                                          ? Number(Math.abs(stock.roi)).toFixed(
                                               3
                                            )
                                          : Number(
                                               Math.sign(stock.roi)
                                            ).toFixed(2) === 1 &&
                                            Number(stock.roi).toFixed(2) !== 0
                                          ? "+" + Number(stock.roi).toFixed(2)
                                          : Number(stock.roi).toFixed(3)}
                                       %
                                    </h4>
                                 </div>
                                 {/* <div className={styles["col-3"]}>
                                    <h4
                                       style={{
                                          fontWeight: "bold",
                                       }}
                                    >
                                       <span>$</span>
                                       {AmountFormatting(stock.prize)}
                                    </h4>
                                    </div>*/}
                              </div>
                           ) : (
                              <div className={styles.row}>
                                 <div className={styles["col-3"]}>
                                    <h4>{stock.position}</h4>
                                 </div>
                                 <div
                                    className={
                                       styles["col-3"] + " " + styles["player"]
                                    }
                                 >
                                    <div className={styles["player-img"]}>
                                       <img src={extras.NewavatarUrl+stock.image} alt="" />
                                    </div>
                                    <h4>{stock.handle?.substring(0, 12)}</h4>
                                 </div>
                                 <div className={styles["col-3"]}>
                                    <h4>
                                       {Number(Math.sign(stock.roi)).toFixed(
                                          2
                                       ) == -1 &&
                                       Math.abs(Number(stock.roi).toFixed(2)) ==
                                          0
                                          ? Number(Math.abs(stock.roi)).toFixed(
                                               3
                                            )
                                          : Number(
                                               Math.sign(stock.roi)
                                            ).toFixed(2) === 1 &&
                                            Number(stock.roi).toFixed(2) !== 0
                                          ? "+" + Number(stock.roi).toFixed(2)
                                          : Number(stock.roi).toFixed(3)}
                                       %
                                    </h4>
                                 </div>
                                 {/* <div className={styles["col-3"]}>
                                    <h4>
                                       <span>$</span>
                                       {AmountFormatting(stock.prize)}
                                    </h4>
                                          </div>*/}
                              </div>
                           )}
                        </Fragment>
                     ))}
                  {/*{data && threeData && (
                     <div className={styles.rowOne}>
                        <p className={styles.suppose}>
                           <sup>&dagger; </sup>
                           {mainlandingpage.leaderBoard.rankingPara}
                        </p>
                     </div>
                  )}*/}
               </div>
            </div>
         </div>
      </div>
   );
};

export default LeaderboardGameContent;
