import React from "react";
import CountdownTimer from "src/utils/CountDownTimer";
const TimerCard = ({ Startdate, show = true }) => {
   const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
   const NOW_IN_MS = new Date().getTime();
   const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
   return (
      <div className="timer">
         <div className="row-one">
            <h4 className="timer-head">{Startdate}</h4>
         </div>
         <div className="row-two">
            {show ? (
               <CountdownTimer targetDate={dateTimeAfterThreeDays} />
            ) : (
               <CountdownTimer
                  targetDate={dateTimeAfterThreeDays}
                  showDays={false}
               />
            )}
         </div>
      </div>
   );
};

export default TimerCard;
