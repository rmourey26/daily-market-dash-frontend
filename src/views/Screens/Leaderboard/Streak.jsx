import React, { Fragment, useCallback } from "react";
import { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
import { AmountFormatting } from "src/components";
import { mainlandingpage, extras } from "src/data/constants";
import debounce from "lodash.debounce";
import styles from "./leaderboard.module.scss";
import { useStateIfMounted } from "use-state-if-mounted";


const Streak = () => {
   const [data, setData] = useState();
   const [threeData, setThreeData] = useStateIfMounted([]);
   const [loading, setLoading] = useStateIfMounted();
   const [title, setTitle] = useState();
   const [showfaces, setShowfaces] = useState(1);

   const getDailyData = async () => {
      setLoading(true);
      await axiosInstance
         .post("/leaderboard/", {
            action: "streak",
         })
         .then(function (response) {
            setTitle(response.data.title);
            // setShowfaces(response.data.showfaces);
            let sortedArray = response.data.ranks.sort((a, b) =>
               a.position > b.position ? 1 : -1
            );
            let temp = [];
            const topThree = [];
            setLoading(false);
            
            for (let i = 0; i < sortedArray.length; i++) {
               if (
                  sortedArray[i].position === 1 ||
                  sortedArray[i].position === 2 ||
                  response.data.ranks[i].position === 3
               )
                  topThree.push(sortedArray[i]);
               else temp.push(sortedArray[i]);
            }
            
            setThreeData(topThree);
            

            if (response.data) setData(temp);
            else
               setInterval(() => {
                  // getDailyData();
               }, 1500);
         })
         .catch(function (errors) {
            console.log(errors);
         });
   };

   const debouncedSaveLeaderBoard = useCallback(
      debounce(() => getDailyData(), extras.setIntervalTime),
      []
   );
   debouncedSaveLeaderBoard();

   useEffect(() => {
      getDailyData();
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
                     { showfaces ==1 && data && threeData.length > 0 && (
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
                                       <h4>{threeData[1]?.position}</h4>
                                    </div>
                                    <div className={styles["p-pics"]}>
                                       <img src={extras.NewavatarUrl+threeData[1]?.image} alt="" />
                                    </div>
                                    <div className={styles["p-grade"]}>
                                       <h4>
                                          {threeData[1]?.handle?.substring(
                                             0,
                                             12
                                          )}
                                       </h4>
                                       <h4>
                                          {Number(
                                             Math.sign(threeData[1]?.pointStreak)
                                          ).toFixed(0) == -1 &&
                                          Math.abs(
                                             Number(threeData[1]?.pointStreak).toFixed(
                                                0
                                             )
                                          ) == 0
                                             ? Number(
                                                  Math.abs(threeData[1]?.pointStreak)
                                               ).toFixed(0)
                                             : Number(
                                                  Math.sign(threeData[1]?.pointStreak)
                                               ).toFixed(0) === 1 &&
                                               Number(
                                                  threeData[1]?.pointStreak
                                               ).toFixed(0) !== 0
                                             ? "+" +
                                               Number(
                                                  threeData[1]?.pointStreak
                                               ).toFixed(0)
                                             : Number(
                                                  threeData[1]?.pointStreak
                                               ).toFixed(0)}
                                          
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
                                       <h4>{threeData[0]?.position}</h4>
                                    </div>
                                    <div className={styles["p-pics"]}>
                                       <img src={extras.NewavatarUrl+threeData[0]?.image} alt="" />
                                    </div>
                                    <div className={styles["p-grade"]}>
                                       <h4>
                                          {threeData[0]?.handle?.substring(
                                             0,
                                             12
                                          )}
                                       </h4>
                                       <h4>
                                          {Number(
                                             Math.sign(threeData[0]?.pointStreak)
                                          ).toFixed(0) == -1 &&
                                          Math.abs(
                                             Number(threeData[0]?.pointStreak).toFixed(
                                                0
                                             )
                                          ) == 0
                                             ? Number(
                                                  Math.abs(threeData[0]?.pointStreak)
                                               ).toFixed(0)
                                             : Number(
                                                  Math.sign(threeData[0]?.pointStreak)
                                               ).toFixed(0) === 1 &&
                                               Number(
                                                  threeData[0]?.pointStreak
                                               ).toFixed(0) !== 0
                                             ? "+" +
                                               Number(
                                                  threeData[0]?.pointStreak
                                               ).toFixed(0)
                                             : Number(
                                                  threeData[0]?.pointStreak
                                               ).toFixed(0)}
                                          
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
                                       <h4>{threeData[2]?.position}</h4>
                                    </div>
                                    <div className={styles["p-pics"]}>
                                       <img src={extras.NewavatarUrl+threeData[2]?.image} alt="" />
                                    </div>
                                    <div className={styles["p-grade"]}>
                                       <h4>
                                          {threeData[2]?.handle?.substring(
                                             0,
                                             12
                                          )}
                                       </h4>
                                       <h4>
                                          {Number(
                                             Math.sign(threeData[2]?.pointStreak)
                                          ).toFixed(0) == -1 &&
                                          Math.abs(
                                             Number(threeData[2]?.pointStreak).toFixed(
                                                0
                                             )
                                          ) == 0
                                             ? Number(
                                                  Math.abs(threeData[2]?.pointStreak)
                                               ).toFixed(0)
                                             : Number(
                                                  Math.sign(threeData[2]?.pointStreak)
                                               ).toFixed(0) === 1 &&
                                               Number(
                                                  threeData[2]?.pointStreak
                                               ).toFixed(0) !== 0
                                             ? "+" +
                                               Number(
                                                  threeData[2]?.pointStreak
                                               ).toFixed(0)
                                             : Number(
                                                  threeData[2]?.pointStreak
                                               ).toFixed(0)}
                                          
                                       </h4>
                                       
                                    </div>
                                 </div>
                              </div>
                           </div>

                        </div>
                     )}
                     {/* top-3 players End  */}
                    {data && <div
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
                        <h2>Streak</h2>
                     </div>
                     {/*<div className={styles["col-3"]}>
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
                                       {Number(Math.sign(stock.pointStreak)).toFixed(
                                          0
                                       ) == -1 &&
                                       Number(stock.pointStreak).toFixed(2) == 0
                                          ? Number(Math.abs(stock.pointStreak)).toFixed(
                                               0
                                            )
                                          : Number(
                                               Math.sign(stock.pointStreak)
                                            ).toFixed(0) === 1 &&
                                            Number(stock.pointStreak).toFixed(0) !== 0
                                          ? "+" + Number(stock.pointStreak).toFixed(0)
                                          : Number(stock.pointStreak).toFixed(0)}
                                       
                                    </h4>
                                 </div>
                                 {/*<div className={styles["col-3"]}>
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
                                       {Number(Math.sign(stock.pointStreak)).toFixed(
                                          0
                                       ) == -1 &&
                                       Math.abs(Number(stock.pointStreak).toFixed(0)) ==
                                          0
                                          ? Number(Math.abs(stock.pointStreak)).toFixed(
                                               0
                                            )
                                          : Number(
                                               Math.sign(stock.pointStreak)
                                            ).toFixed(0) === 1 &&
                                            Number(stock.pointStreak).toFixed(0) !== 0
                                          ? "+" + Number(stock.pointStreak).toFixed(0)
                                          : Number(stock.pointStreak).toFixed(0)}
                                       
                                    </h4>
                                 </div>
                                 {/*<div className={styles["col-3"]}>
                                    <h4>
                                       <span>$</span>
                                       {AmountFormatting(stock.prize)}
                                    </h4>
                                          </div>*/}
                              </div>
                           )}
                        </Fragment>
                     ))}
                     {/*  {data && threeData && (
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

export default Streak;
