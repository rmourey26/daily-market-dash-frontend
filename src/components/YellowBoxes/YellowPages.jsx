import React from "react";
import { mainlandingpage } from "src/data/constants";
import { InfoCard } from "../Cards";
import styles from "../../views/Screens/Dashboard/MainLandingPage/MainLandingPage.module.scss";
import { AmountFormatting } from "src/components";
import { Link } from "react-router-dom";

// let marketdata = {
//    device: "4d5cc46d6f2f972fe03610e86df05bda8d731811ccc912f57612df8264d5a829",
//    marketdate: "Thursday, Mar 30, 2023",
//    marketday: 1,
//    h2hday: 0,
//    bank: 10000,
//    opening: 10000,
//    current: 0,
//    roi: 0,
//    ranking: "",
//    notifications: 1,
// };

function YellowPages(memberAccInfo) {
  let marketdata = memberAccInfo.memberAccInfo.memberAccInfo;
  console.log(
    "memberAccInfo yellow",
    memberAccInfo.memberAccInfo.memberAccInfo.bank
  );
  return (
    <div className={styles.h2hScreen}>
      <div className={styles["main-loader"]} style={{ minHeight: "auto" }}>
        <div className={styles["ranking-rio"]}>
          <div className={styles.container}>
            <div className={styles.row}>
              {/*<InfoCard
                     title={mainlandingpage.boxes.opening}
                     subtitle={
                        isNaN(marketdata?.opening)
                           ? null
                           : AmountFormatting(marketdata?.opening)
                     }
                    />*/}
              <div className={styles.title_img_h2h}>
                <Link to="/DailyGame" className="roiLinked">
                  {/*<InfoCard
                              title={mainlandingpage.boxes.dailyGame}
                              subtitle={marketdata.ranking}
                              showCurrency={false}
                  />*/}
                  <img src="assets/images/leader-board.png" alt="" />
                </Link>
              </div>

              <InfoCard
              title={mainlandingpage.boxes.bank}
              subtitle={
                 isNaN(marketdata?.bank)
                    ? null
                    : AmountFormatting(marketdata?.bank)
              }
           />
              {/*<InfoCard
                        title={mainlandingpage.boxes.current}
                        subtitle={
                           isNaN(
                              marketdata?.current != 0
                                 ? marketdata?.current
                                 : marketdata?.bank
                           )
                              ? null
                              : AmountFormatting(
                                   marketdata?.current != 0
                                      ? marketdata?.current
                                      : marketdata?.bank
                                )
                        }
                     />*/}
              <InfoCard
                title={mainlandingpage.boxes.roi}
                subtitle={Number(marketdata.roi).toFixed(3)}
                showPercentage={true}
                showCurrency={false}
              />
              <InfoCard
                title={mainlandingpage.boxes.rank}
                subtitle={marketdata.ranking}
                showCurrency={false}
              />
              <div className={styles.title_img_h2h}>
                <Link to="/MainLandingPage" className="roiLinked">
                  {/*<InfoCard
                           title={mainlandingpage.boxes.current}
                           subtitle={marketdata.ranking}
                           showCurrency={false}
                  />*/}
                  <img src="assets/images/myportfolio.png" alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YellowPages;
