import React from "react";
import { useCountdown } from "src/hooks/useCountDown";
import DateTimeDisplay from "./DateTimeDisplay";

const ShowCounter = ({ days, hours, minutes, seconds, showDays }) => {
   return (
      <>
         {showDays && (
            <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
         )}

         <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />

         <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />

         <DateTimeDisplay value={seconds} type={"Secs"} isDanger={false} />
      </>
   );
};

const CountdownTimer = ({ targetDate, showDays = true }) => {
   const [days, hours, minutes, seconds] = useCountdown(targetDate);

   if (days + hours + minutes + seconds <= 0) {
      return <ShowCounter
         showDays={''}
         days={0}
         hours={0}
         minutes={0}
         seconds={0}
      />
   } else {
      return (
         <ShowCounter
            showDays={showDays}
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
         />
      );
   }
};

export default CountdownTimer;
