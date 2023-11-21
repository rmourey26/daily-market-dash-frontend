import React from "react";
import { extras } from "src/data/constants";
const HeadlistCard = ({
   color = "green-brd",
   rank,
   name,
   roi,
   avatar,
   boardColor,
}) => {
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
                        src={extras.avatarUrl + `256_${avatar}.png`}
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
                     <h4>{name}</h4>
                  </div>
                  <div className="col-2 cat-roi">
                     <h4>ROI {Number(Math.sign(roi)).toFixed(2) == -1 &&
                        Number(roi).toFixed(2) == 0
                        ? Number(Math.abs(roi)).toFixed(2)
                        : Number(Math.sign(roi)).toFixed(2) === 1 &&
                           Number(roi).toFixed(2) !== 0
                           ? "+" + Number(roi).toFixed(2)
                           : Number(roi).toFixed(2)}
                        %</h4>
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

export default HeadlistCard;
