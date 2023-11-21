import React from "react";
import styles from "./InfoCard.module.scss";
import { mainlandingpage } from "src/data/constants";
const InfoCard = ({
   title,
   subtitle,
   showCurrency = true,
   showPercentage = false,
   cls,
}) => {
   return (
      <div className={styles["btns"] + " " + styles[cls]}>
         <div>
            <h4>{title}</h4>
            <p
               style={
                  title === "TODAY'S ROI" && Number(subtitle) > 0
                     ? { color: "green" }
                     : title === "TODAY'S ROI" && Number(subtitle) < 0
                     ? { color: "red" }
                     : { color: "black" }
               }
            >
               {showCurrency && <span className={styles.currency}>$</span>}
               {/* {title === 'rank' ? subtitle : Number(subtitle).toFixed(2) === 'Nan' ? '' : Number(subtitle).toFixed(2)} */}
               {subtitle}
               {showPercentage && <span className={styles.currency}>%</span>}
            </p>
         </div>
      </div>
   );
};

export default InfoCard;
