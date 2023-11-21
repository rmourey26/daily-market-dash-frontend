import React from "react";
const HeadToHeadTwo = ({
   headtitle,
   title,
   showtitle = true,
   subtitle,
   links,
   showstatus = true,
   status,
}) => {
   return (
      <div className="col-6">
         <span className="top">{headtitle}</span>
         {showtitle ? (
            <div className="you">
               <p>{title}</p>
               <h4>{subtitle}</h4>
               <a href="#">{links}</a>
            </div>
         ) : (
            <div className="opponent">
               <p>roi</p>
               <h4>15.21%</h4>
               <a href="#">view portfolio</a>
            </div>
         )}
         {showstatus && <span className="green">{status}</span>}
      </div>
   );
};

export default HeadToHeadTwo;
