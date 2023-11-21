import React from "react";
import { extras } from "src/data/constants";
import HoldingModal from "src/views/Screens/Dashboard/HeadToHead/HoldingModal";

const HeadToHeadMyGame_mobile = ({
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
         <div className="premium-profit-loss mobile" id="512">
            <div
               className="premium-pl-box green-brd"
               style={{
                  border: `5px solid ${bracketsdatamygame?.myColor}`,
               }}
            >
               <div className="premium-card matches">
                  <div className="left">
                     <div className="identity">
                        <div className="pl-user east">
                           <p>#{bracketsdatamygame?.myRank}</p>
                           <h4>
                              {bracketsdatamygame?.myHandle == "Me"
                                 ? HandleName?.substring(0, 10)
                                 : bracketsdatamygame?.myHandle?.substring(
                                    0,
                                    10
                                 )}
                           </h4>
                        </div>
                        <div className="west">
                           <img
                              src={
                                 extras.avatarUrl +
                                 `256_${bracketsdatamygame.myAvatar}.png`
                              }
                           />
                        </div>
                     </div>
                  </div>
                  <div className="right">
                     {/* <div className="pl-amount">
                                    <h2>p&l</h2>
                                    {mePrice()}
                  </div>*/}

                     <div className="pl-rate">
                        <h2>roi</h2>
                        <h2>
                           {bracketsdatamygame?.myROI === 0
                              ? bracketsdatamygame?.myROI
                              : Number(bracketsdatamygame?.myROI).toFixed(3)}
                           %
                        </h2>

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
                           // checkHandle={checkHandle}
                           openHolding={openHolding}
                           closeModel={setopenHolding}
                           setDataHolding={setDataHolding}
                           dataHolding={dataHolding}
                        />
                     )}
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
                  <div className="left">
                     <div className="identity">
                        <div className="pl-user east">
                           <p>#{bracketsdatamygame.themRank}</p>
                           <h4>
                              {bracketsdatamygame.themHandle?.substring(0, 10)}
                           </h4>
                        </div>
                        <div className="west">
                           <img
                              src={
                                 extras.avatarUrl +
                                 `256_${bracketsdatamygame.themAvatar}.png`
                              }
                           />
                        </div>
                     </div>
                  </div>

                  <div className="right">
                     {/*<div className="pl-amount">
                                    <h2>p&l</h2>
                                    {OpponentPrice()}
               </div>*/}

                     <div className="pl-rate">
                        <h2>roi</h2>
                        <h2>
                           {bracketsdatamygame.themROI === 0
                              ? bracketsdatamygame.themROI
                              : Number(bracketsdatamygame.themROI).toFixed(3)}
                           %
                        </h2>
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
               </div>
            </div>
         </div>
      </>
   );
};

export default HeadToHeadMyGame_mobile;
