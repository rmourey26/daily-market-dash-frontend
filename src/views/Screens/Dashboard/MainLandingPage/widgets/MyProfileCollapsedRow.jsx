import React from "react";
const MyProfileCollapsedRow = ({ bought, current }) => {
   return (
      <div className="row">
         <div className="3">
            <h4>bought : </h4>
         </div>
         <div className="3">
            <h4>{bought}</h4>
         </div>
         <div className="3">
            <h4>current</h4>
         </div>
         <div className="3">
            <h4>{current}</h4>
         </div>
      </div>
   );
};

export default MyProfileCollapsedRow;
