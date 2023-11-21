import React, { useState, useEffect } from "react";
import { extras } from "src/data/constants";
const LeaderBoardCard = ({
   color = "green-brd",
   rank,
   name,
   roi,
   avatar,
   boardColor,
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
   return (
      <div className="col-md-6">
         <div
            className={`box ${color}`}
            style={{
               border: `1px solid ${boardColor}`,
            }}
         >
            <div className="row">
               <div className="col-2 player">
                  <div className="player-img">
                     <img
                        src={extras.avatarUrl + `256_${avatar === 99 ? 0 : avatar}.png`}
                        // src={`https://www.dailymarketdash.com/services/images/avatar/256_${avatar}.png`}
                        alt="avatar"
                     />
                  </div>
               </div>
               <div className="mlayout-one">
                  <div className="col-2 identity">
                     <h4>#{rank}</h4>
                  </div>
               </div>
               <div className="mlayout-one">
                  <div className="col-2 cat">
                     <h4>
                        {width > 992
                           ? name?.substring(0, 14)
                           : name?.substring(0, 12)}
                     </h4>
                  </div>
                  <div className="col-2 cat-roi">
                     <h4>
                        <span>ROI: &nbsp;</span>
                        <span>
                           {Number(Math.sign(roi)).toFixed(3) == -1 &&
                              Number(roi).toFixed(3) == 0
                              ? Number(Math.abs(roi)).toFixed(3)
                              : Number(Math.sign(roi)).toFixed(3) === 1 &&
                                 Number(roi).toFixed(3) !== 0
                                 ? "+" + Number(roi).toFixed(3)
                                 : Number(roi).toFixed(3)}
                           %
                        </span>
                     </h4>
                     {/* <h4>
                        {Number(Math.sign(roi)).toFixed(2) == -1 &&
                        Number(roi).toFixed(2) == 0
                           ? Number(Math.abs(roi)).toFixed(2)
                           : Number(Math.sign(roi)).toFixed(2) === 1 &&
                             Number(roi).toFixed(2) !== 0
                           ? "+" + Number(roi).toFixed(2)
                           : Number(roi).toFixed(2)}
                        %
                     </h4> */}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LeaderBoardCard;
