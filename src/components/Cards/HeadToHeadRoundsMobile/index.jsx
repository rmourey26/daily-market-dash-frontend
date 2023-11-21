// import HeadToHeadRoudsCard from "./HeadToHeadRoudsCard";
import React from "react";
import HeadToHeadRoudsMobileCard from "./HeadToHeadRoudsMobileCard";

const HeadToHeadRoudsMobile = ({
   bracketsdataleaders,
   setopenHoldingAllLeader,
   openHoldingAllLeader,
   getHoldingData,
   setDataHolding,
   dataHolding,
}) => {
   return (
      <div className="premium-profit-loss mobile" id="512">
         {bracketsdataleaders && (
            <HeadToHeadRoudsMobileCard
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

         <div className="premium-vs">
            <span>vs</span>
         </div>

         {bracketsdataleaders && (
            <HeadToHeadRoudsMobileCard
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

export default HeadToHeadRoudsMobile;
