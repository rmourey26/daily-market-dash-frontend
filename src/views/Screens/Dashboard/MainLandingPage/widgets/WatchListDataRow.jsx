import React, { useState } from "react";
import { MyProfileCollapsedRow } from ".";

const MyProfileRow = ({ stock }) => {
   const [open, setOpen] = useState(false);

   const handleToggle = () => setOpen(!open);

   return (
      <div className={`row ${open ? "toggle-active" : ""}`} key={stock.sym}>
         <div className="col-3">
            <h4>{stock.sym}</h4>
         </div>
         <div className="col-3">
            <h4>{stock.bought}</h4>
         </div>
         <div className="col-3">
            <h4>{stock.current}</h4>
         </div>
         <div className="col-3">
            <img src={stock.intraday} alt="" />
         </div>
         <div className="col-3">
            <h4>{stock.roi}</h4>
         </div>
         <div className="col-3 mobile-tog">
            <div className="mobile-land-tg" onClick={handleToggle}>
               <img src="assets/images/icons/arrow_down.svg" alt="" />
            </div>
         </div>

         {open && (
            <div className="col-12 mobile-collapsed">
               <MyProfileCollapsedRow
                  current={stock.current}
                  bought={stock.bought}
               />
            </div>
         )}
      </div>
   );
};

export default MyProfileRow;
