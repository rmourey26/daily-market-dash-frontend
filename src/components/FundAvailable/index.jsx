import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./FundAvailable.module.scss";

function RaiseFund({marketdata}) {
  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const Bank = memberInfoData?.bank
  const ROI = memberInfoData?.roi
  const PointsStreak = memberInfoData?.pointsStreak
  const Ranking = memberInfoData?.ranking
  const Boost = memberInfoData?.isBoost
  return (
    <> 
            <div className={styles["fundsAvailable"]}>
                <div className={styles["boxes"]}>
                <div className={styles["outerimg"]}>
                <img src="toptabs/funds-available-01.png" alt="" />
                </div>
                <h4>${Bank % 1 !== 0 ? Number(Bank).toFixed(2): Bank}</h4>
                </div>
                <div className={styles["boxes"]}>
                <div className={styles["outerimg"]}>
                  <img src="toptabs/today-rio-01.png" alt="" />
                  </div>
                  {Boost ==1 ? <div className={styles['todayBoxBoost']} style={{display:'flex', flexDirection:'row'}}>
                  <h4 >{Number(ROI).toFixed(3)}%</h4>
                  <img className={styles['boostyellowBox']} src="assets/images/icons/headicons/boost.svg" alt="" />
                  </div>:<h4 >{Number(ROI).toFixed(3)}%</h4>}
                  
                </div>
                <div className={styles["boxes"]}>
                <div className={styles["outerimg"]}>
                  <img src="toptabs/streaks-01.png" alt="" />
                  </div>
                  <h4>{PointsStreak}</h4>
                </div>
                <div className={styles["boxes"]}>
                <div className={styles["outerimg"]}>
                  <img src="toptabs/rank-01.png" alt="" />
                  </div>
                  <h4>{Ranking}</h4>
                </div>
                </div>
                </>
           
  )
}

export default RaiseFund