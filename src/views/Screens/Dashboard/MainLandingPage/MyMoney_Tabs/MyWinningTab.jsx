import React,{useState, useEffect} from "react";
import styles from "./styleModulesMoneyTabs/MyWinningTab.module.scss";
import "./style.scss";
import axiosInstance from "src/services/axios";

const MyWinningTab = () => {
   const [winningData, setWinningData] = useState([]);
   
   const getWinning = async () =>{
      await axiosInstance
         .post("/members/", {
            action:"winnings"
         })
         .then(function (response) {
            console.log("setWinningData",response.data);
            setWinningData(response.data.winnings);
           
         })
         .catch(function (errors) {
            console.log(errors);
         });
      }
   
      useEffect(() => {
         getWinning();
      }, [])
   return (
      <div className="main-landing-profile main-pro wins">
         <div className={styles.myWinnings}>
            <div className={styles.winningstable}>
               <div className={styles.winHeads}>
                  <div className={styles.winrow}>
                     <div className={styles.winCol}>
                        <h4>date</h4>
                     </div>
                     <div className={styles.winCol}>
                        <h4>game</h4>
                     </div>
                     <div className={styles.winCol}>
                        <h4>prize</h4>
                     </div>
                     <div className={styles.winCol}>
                        <h4>amount</h4>
                     </div>
                     <div className={styles.winCol}>
                        <h4>status</h4>
                     </div>
                  </div>
               </div>
              {winningData && <>
               {winningData?.map((data) => (
                  <div className={styles.winBody} key={data.id}>
                  <div className={styles.winrow}>
                  <div className={styles.winCol}>
                     <h4>
                        <span>{data?.date}</span>
                     </h4>
                  </div>
                  <div className={styles.winCol}>
                     <h4>{data?.game}</h4>
                  </div>
                  <div className={styles.winCol}>
                     <h4>
                        {data?.prize}
                     </h4>
                  </div>
                  <div className={styles.winCol}>
                     <h4>${data?.amount}</h4>
                  </div>
                  <div className={styles["winCol"] + " " + styles["red"]}>
                     <h4>{data?.isPaid == 0 ? "unpaid":"paid"}</h4>
                  </div>
               </div>
                  </div>
               ))}
               </>}
              
            </div>
         </div>
      </div>
   );
};

export default MyWinningTab;
