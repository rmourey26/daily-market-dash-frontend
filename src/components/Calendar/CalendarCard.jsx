import React, { useState } from "react";

const CalendarCard = ({ showcalendar = true }) => {
   const getDaysInCurrentMonth = () => {
      const date = new Date();

      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
   };

   const result = getDaysInCurrentMonth();
   const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];

   const d = new Date();
   const month = monthNames[d.getMonth()];
   var dd = String(d.getDate()).padStart(2, "0");
   const [cdate, setCdate] = useState(parseInt(dd));
   const handledate = (index) => {
      setCdate(index)
   }

   const calendar = (result) => {
      const list = [];
      for (let index = 1; index <= result; index++) {
         var className = "";
         if (index === cdate) {
            className = "active";
         } else {
            className = ""
         }
         list.push(
            <li
               className={className}
               onClick={() => (parseInt(dd) + 1 <= index ? "" : handledate(index))}
            >
               {index}
            </li>
         );
      }
      return <>{list}</>;
   };

   return (
      <div className="calender-event">
         <div className="img-event">
            <div className="row">
               <h4>{month}</h4>
               <img src="assets/images/icons/puls-01.png" alt="" />
            </div>
            <ul id="calendarContainer">{calendar(result)}</ul>
         </div>
      </div>
   );
};

export default CalendarCard;
