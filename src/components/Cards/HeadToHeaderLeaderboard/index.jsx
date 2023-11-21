// import { Fragment } from "react";
import React from "react";
import LeaderBoardCard from "./LeaderBoardCard";

const HeadToHeaderLeaderboard = ({
   startIndex,
   showLast,
   goDown = () => { },
   goUp = () => { },
   bracketsdataleaders = [],
}) => {
   bracketsdataleaders = [...new Set(bracketsdataleaders)];
   return (
      <div className="items lead-section">
         <div className="leaderscoreboard">
            {startIndex !== 0 && (
               <div className="uparw" onClick={goUp}>
                  <img src="assets/images/top-arrow.png" alt="" />
               </div>
            )}

            <div className="row">
               {bracketsdataleaders?.map((item, index) => (
                  <div className="UserVs" key={`${index}-leader`}>
                     <LeaderBoardCard
                        name={item.leftHandle}
                        rank={item.leftRank}
                        roi={item.leftROI}
                        avatar={item.leftAvatar}
                        boardColor={item.leftColor}
                     />

                     <div className="premium-vs">
                        <span>vs</span>
                     </div>

                     <LeaderBoardCard
                        color="red-brd"
                        name={item.rightHandle}
                        rank={item.rightRank}
                        roi={item.rightROI}
                        avatar={item.rightAvatar}
                        boardColor={item.rightColor}
                     />
                  </div>
               ))}
            </div>
            {showLast && (
               <div className="downarw" onClick={goDown}>
                  <img src="assets/images/bottom-arrow.png" alt="" />
               </div>
            )}
         </div>
      </div>
   );
};

export default HeadToHeaderLeaderboard;
