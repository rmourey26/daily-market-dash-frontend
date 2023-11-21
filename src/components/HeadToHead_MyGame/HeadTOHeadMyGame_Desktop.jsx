import React from "react";
import { extras } from "src/data/constants";
import HoldingModal from "src/views/Screens/Dashboard/HeadToHead/HoldingModal";
const HeadTOHeadMyGame_Desktop = ({
   bracketsdatamygame,
   setDataHolding,
   setopenHolding,
   openHolding,
   checkHandle,
   dataHolding,
   getHoldingData,
   HandleName
}) => {
   return (
      <>
         <div className="premium-profit-loss desktop" id="512">
            <div
               className="premium-pl-box green-brd"
               style={{
                  border: `5px solid ${bracketsdatamygame?.myColor}`,
               }}
            >
               <div className="premium-card matches">
                  <div className="front-side">
                     <div className="top">
                        <div className="identity">
                           #{bracketsdatamygame?.myRank}
                           <button
                              onClick={() => {
                                 setopenHolding(true);
                                 getHoldingData(
                                    bracketsdatamygame?.myHandle == "Me"
                                       ? HandleName
                                       : bracketsdatamygame?.myHandle
                                 );
                              }}
                           >
                              holdings
                           </button>
                        </div>
                        {openHolding && (
                           <HoldingModal
                              checkHandle={checkHandle}
                              openHolding={openHolding}
                              closeModel={setopenHolding}
                              setDataHolding={setDataHolding}
                              dataHolding={dataHolding}
                           />
                        )}
                     </div>
                     <div className="user-profile">
                        <div className="pl-rate">
                           <div className="pl-user">
                              {bracketsdatamygame?.myHandle == "Me"
                                 ? HandleName?.substring(0, 20)
                                 : bracketsdatamygame?.myHandle?.substring(
                                    0,
                                    20
                                 )}
                           </div>
                           <div className="pl-heading">
                              <h2>roi</h2>
                              <h2>
                                 {bracketsdatamygame?.myROI === 0
                                    ? bracketsdatamygame?.myROI
                                    : Number(bracketsdatamygame?.myROI).toFixed(
                                       3
                                    )}
                                 %
                              </h2>
                           </div>
                        </div>
                     </div>
                     <div className="user-pic">
                        <div className="pl-user">
                           <img
                              src={
                                 extras.avatarUrl +
                                 `256_${bracketsdatamygame?.myAvatar}.png`
                              }
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="premium-vs">
               <span>vs</span>
            </div>
            <div
               className="premium-pl-box red-brd"
               style={{
                  border: `5px solid ${bracketsdatamygame?.themColor}`,
               }}
            >
               <div className="premium-card matches">
                  <div className="front-side">
                     <div className="top">
                        <div className="identity">
                           #{bracketsdatamygame.themRank}
                           <button
                              onClick={() => {
                                 setopenHolding(true);
                                 getHoldingData(bracketsdatamygame?.themHandle);
                              }}
                           >
                              holdings
                           </button>
                        </div>
                     </div>
                     <div className="user-profile">
                        {/*<div className="pl-amount">
            <h2>p&l</h2>
            <h2>1213</h2>
</div>*/}
                        <div className="pl-rate">
                           <div className="pl-user">
                              {bracketsdatamygame?.themHandle?.substring(0, 15)}
                           </div>
                           <div className="pl-heading">
                              <h2>roi</h2>
                              <h2>
                                 {bracketsdatamygame.themROI === 0
                                    ? bracketsdatamygame.themROI
                                    : Number(
                                       bracketsdatamygame.themROI
                                    ).toFixed(3)}
                                 %
                              </h2>
                           </div>
                        </div>
                     </div>
                     <div className="user-pic">
                        <div className="pl-user">
                           <img
                              src={
                                 extras.avatarUrl +
                                 `256_${bracketsdatamygame?.themAvatar}.png`
                              }
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default HeadTOHeadMyGame_Desktop;
