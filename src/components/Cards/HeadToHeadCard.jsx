import React from "react";
const HeadToHeadCard = ({
   title,
   subtitle,
   links,
   userIcon,
   user,
   status,
   showStatus = false,
}) => {
   return (
      <div className="col-4">
         <div className="timer view-profile">
            <div className="users">
               <img src={userIcon} alt="" />
               <h4 className="timer-head">{user}</h4>
            </div>
            <div className="user-record">
               <h4 className="timer-head">{title}</h4>
               <h5 className="user-roi">{subtitle}</h5>
               <p className="user-profile">{links}</p>
            </div>
         </div>
         {showStatus && <span className="green">{status}</span>}
      </div>
   );
};

export default HeadToHeadCard;
