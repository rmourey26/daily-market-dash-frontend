import React from "react";
import "../custom.scss";
import { YellowPages } from "src/components/YellowBoxes";
import RaiseFund from "src/components/FundAvailable";
import { Link } from "react-router-dom";

export const CenterH2HTopHeader = ({marketdata}) => {
   return (
    <div className="h2h_container">
   <div className="raisingFund-row">
   <div className="raisingFund-col-2">
     <div className="battle-logo">
       <Link to="/DailyGame" className="roiLinked">
         <img src="toptabs/contest-leader-boards-01.png" alt="" />
       </Link>
     </div>
   </div>
   <div className="raisingFund-col-8">
   <RaiseFund marketdata={marketdata}/>
   </div>
   <div className="raisingFund-col-2">
     <div className="battle-logo">
       <Link to="/MainLandingPage" className="roiLinked">
         <img src="toptabs/my-portfolio-01.png" alt="" />
       </Link>
     </div>
   </div>
 
 </div>
 </div>);
};
