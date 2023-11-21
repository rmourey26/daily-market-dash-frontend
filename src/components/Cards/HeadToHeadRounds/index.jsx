import React from "react";
import HeadToHeadRoudsCard from "./HeadToHeadRoudsCard";

const HeadToHeadRounds = ({
   bracketsdataleaders,
   openHoldingAllLeader,
   setopenHoldingAllLeader,
   getHoldingData,
   setDataHolding,
   dataHolding,
}) => {
   return (
      <div className="premium-profit-loss desktop" id="512">
         {bracketsdataleaders && (
            <HeadToHeadRoudsCard
               rank={bracketsdataleaders.leftRank}
               name={bracketsdataleaders.leftHandle}
               roi={bracketsdataleaders.leftROI}
               avatar={bracketsdataleaders.leftAvatar}
               borderColor={bracketsdataleaders.leftColor}
               openHoldingAllLeader={openHoldingAllLeader}
               setopenHoldingAllLeader={setopenHoldingAllLeader}
               setDataHolding={setDataHolding}
               dataHolding={dataHolding}
               getHoldingData={getHoldingData}
            />
         )}
         {bracketsdataleaders ? (
            <div className="premium-vs">
               <span>vs</span>
            </div>
         ) : (
            <></>
         )}

         {bracketsdataleaders && (
            <HeadToHeadRoudsCard
               rank={bracketsdataleaders.rightRank}
               name={bracketsdataleaders.rightHandle}
               roi={bracketsdataleaders.rightROI}
               avatar={bracketsdataleaders.rightAvatar}
               borderColor={bracketsdataleaders.rightColor}
               color="red-brd"
               openHoldingAllLeader={openHoldingAllLeader}
               setopenHoldingAllLeader={setopenHoldingAllLeader}
               setDataHolding={setDataHolding}
               dataHolding={dataHolding}
               getHoldingData={getHoldingData}
            />
         )}
      </div>
   );
};

export default HeadToHeadRounds;
