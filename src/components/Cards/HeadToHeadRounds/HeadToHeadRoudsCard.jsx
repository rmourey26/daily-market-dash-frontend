import React from "react";
import { extras } from "src/data/constants";
import HoldingModal from "src/views/Screens/Dashboard/HeadToHead/HoldingModal";
const HeadToHeadRoudsCard = ({
   rank,
   name,
   roi,
   avatar,
   borderColor,
   color = "green-brd",
   setopenHoldingAllLeader,
   openHoldingAllLeader,
   getHoldingData,
   setDataHolding,
   dataHolding,
}) => {
   const save = localStorage.getItem("membersProfileInfo");
   const memberProileInfoData = JSON.parse(save);
   const HandleName = memberProileInfoData?.handle;
   // console.log("HandleName", HandleName);
   return (
      <div
         className={`premium-pl-box ${color}`}
         style={{
            border: `5px solid ${borderColor}`,
         }}
      >
         <div className="premium-card matches">
            <div className="front-side">
               <div className="top">
                  <div className="identity">
                     #{rank}
                     <button
                        onClick={() => {
                           setopenHoldingAllLeader(true);
                           getHoldingData(
                              name == "Me"
                                 ? HandleName?.substring(0, 10)
                                 : name?.substring(0, 10)
                           );
                        }}
                     >
                        holdings
                     </button>
                  </div>
                  {openHoldingAllLeader && (
                     <HoldingModal
                        openHoldingAllLeader={openHoldingAllLeader}
                        closeModel={setopenHoldingAllLeader}
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
                        {name == "Me"
                           ? HandleName?.substring(0, 15)
                           : name?.substring(0, 15)}
                     </div>
                     <div className="pl-heading">
                        <h2>roi</h2>
                        <h2>{roi === 0 ? roi : Number(roi).toFixed(3)}%</h2>
                     </div>
                  </div>
               </div>
               <div className="user-pic">
                  <div className="pl-user">
                     <img
                        src={extras.avatarUrl + `256_${avatar}.png`}
                        // src={`https://www.dailymarketdash.com/services/images/avatar/256_${avatar}.png`}
                        alt=""
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HeadToHeadRoudsCard;
