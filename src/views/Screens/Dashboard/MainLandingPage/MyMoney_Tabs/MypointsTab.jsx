import React,{useState, useEffect} from "react";
import styles from "./styleModulesMoneyTabs/MyPointTab.module.scss"
import RedeemPoints_popup from "src/components/Modals/redeemPointspopup/RedeemPoints_popup";
import Learnmore_pointPopup from "src/components/Modals/learn more point popup/Learnmore_pointPopup";
import axiosInstance from "src/services/axios";
const MyPoints = () => {
  const [redeemPopup, setRedeemPopup] = useState(false)
  const [learnMorePoint_popup, setLearnMorePoint_Popup] = useState(false)
  const [statusdata, setStatusData] = useState([])

  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
     setWidth(window.innerWidth);
  };
  useEffect(() => {
     window.addEventListener("resize", handleWindowSizeChange);
     return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
     };
  }, []);

 

useEffect(() => {

  axiosInstance
  .post("/points/", {
     action: "status",
  })
  .then(function (response) {
    setStatusData(response.data)
    
  })
  .catch(function (errors) {
     console.log(errors);
  });

}, [])



  const handle_popup =()=>{
    setRedeemPopup(true)
  }

  const handle_learnMore_popup =()=>{
    setLearnMorePoint_Popup(true)
  }
  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const Points = memberInfoData?.points

const randomNumber = statusdata?.streak
  const generatePositiveTradesList = () => {
    const positiveTrades = [];
    for (let i = 1; i <= 20; i++) {
      const className = i === randomNumber ? styles.highlighted : '';
      positiveTrades.push(<li key={i} className={className}>{i}</li>);
    }
    return positiveTrades;
  };

  // Function to generate the list items for Points Earned
  const pointsEarnedNumbers = [5, 15, 35, 65, 105, 155, 215, 285, 365, 455, 555, 665, 785, 915, 1055, 1205, 1365, 1535, 1715, 1905];

 

  // Function to generate the list items for Points Earned
  const generatePointsEarnedList = () => {
    return pointsEarnedNumbers.map((points, index) => {
      const className = index === randomNumber - 1 ? styles.highlighted : '';
      return <li key={index} className={className}>{points}</li>;
    });
  };



  return (
    <div className="main-landing-profile main-pro mymoney_point">
      <div className={styles.containr_point}>
       {width>614 ?       
        (<div className={styles.point_mainContainer}>
       <div className={styles.yellow_pointBox}>
       <div className={styles.point_contentContainer}>
       <div className={styles.statusBox}>
       <h4>Total Points Earned</h4>
       <h2>{statusdata.earned}</h2>
       </div>
 
       {/*<div className={styles.statusBox}>
       <h4>Total Points Redeemed</h4>
       <h2>{statusdata.redeemed}</h2>
   </div>*/}
     </div>
 
    
     </div>
     <div className={styles.yellow_pointBox} style={{ marginLeft: '20px' }}>
     <div className={styles.point_contentContainer}>
     <h4>Total Points Redeemed</h4>
     <h2>{statusdata?.redeemed}</h2>
   </div>
   </div>
 
 
 
     <div className={styles.yellow_pointBox} style={{ marginLeft: '20px' }}>
       <div className={styles.point_contentContainer}>
       <h4>POINTS AVAILABLE</h4>
       <h2>{Points}</h2>
     </div>
     </div>
     </div>):(<div className={styles.point_mainContainer}>
      <div className={styles.yellow_pointBox}>
      <div className={styles.point_contentContainer}>
      <div className={styles.statusBox}>
      <h4>Total Points Earned</h4>
      <h2>{statusdata.earned}</h2>
      </div>

      <div className={styles.statusBox}>
      <h4>Total Points Redeemed</h4>
      <h2>{statusdata.redeemed}</h2>
  </div>
    </div>

   
    </div>
    <div className={styles.yellow_pointBox}>
      <div className={styles.point_contentContainer}>
      <h4>POINTS AVAILABLE</h4>
      <h2>{Points}</h2>
    </div>
    </div>
    </div>)}


    <div className={styles.text_content}>
    <h4>KEEP YOUR STREAK ALIVE. BUY SHARES WORTH LEAST $1000, HOLD THOSE SHARES FOR AT LEAST 4 HOURS, AND SELL THEM AT A PROFIT. EVERY POSITIVE TRADE EARNS POINTS. REDEEM POINTS FOR IN-CONTEST EXTRAS.</h4>
    </div>
    <div className={styles.second_pointContainer}>
    <div className={styles.Day_pointBox}>
      <div className={styles.Day_point}>
      <div className={styles.days}>
      <h3>Positive Trades</h3>
      <ul>{generatePositiveTradesList()}</ul>
      </div>
      <div className={styles.points}>
      <h3>Points Earned</h3>
      <ul>{generatePointsEarnedList()}</ul>
      </div>
      </div>
      <p className={styles.popup_para} onClick={()=>{handle_learnMore_popup(true)}}>Learn more about points!</p>
      </div>
    <div className={styles.Box_parent_container}>
      <div className={styles.first_breakBox}>
        <div className={styles.box}>
          <div className={styles.sub_box}>
            <label className={styles.H_lebel}>10K</label>
            <label className={styles.T_lebel}>points</label>
          </div>
          <p className={styles.para}>Access to an additional market</p>
        </div>
        <div className={styles.box}>
          <div className={styles.sub_box}>
            <label className={styles.H_lebel}>12K</label>
            <label className={styles.T_lebel}>points</label>
          </div>
          <p className={styles.para}>Access to 3 additional markets</p>
        </div>
        <div className={styles.box}>
          <div className={styles.sub_box}>
            <label className={styles.H_lebel}>15K</label>
            <label className={styles.T_lebel}>points</label>
          </div>
          <p className={styles.para}>Access to all the markets</p>
        </div>
        <div className={styles.box}>
          <div className={styles.sub_box}>
            <label className={styles.H_lebel}>17K</label>
            <label className={styles.T_lebel}>points</label>
          </div>
          <p className={styles.para}>Access to all the markets + 1 boost</p>
        </div>
        <div className={styles.box}>
          <div className={styles.sub_box}>
            <label className={styles.H_lebel}>20K</label>
            <label className={styles.T_lebel}>points</label>
          </div>
          <p className={styles.para}>Access to all the markets + 3 boosts</p>
        </div>
      </div>
  </div>
  </div>
  <div className={styles.btn_mainContainer}>
      <button className={styles.button_Container} onClick={handle_popup}>REDEEM NOW</button>
      </div>
      {/*<div className={styles.bottom_text}>
      <h3>Note:</h3>
      <span>What constitutes a positive trade ?</span>
      <p>1. You must purchase and hold the stock, commodity, or currency including crypto for a minimum of 5 hrs throughout trading day.</p>
      <p>2. You can't buy the same stock, commodity or currency including crypto, during the "streak".</p>
  </div>*/}
      
    </div>
    {redeemPopup && <RedeemPoints_popup setRedeemPopup={setRedeemPopup}/>}
    {learnMorePoint_popup&&<Learnmore_pointPopup  setLearnMorePoint_Popup={setLearnMorePoint_Popup}/>}
    </div>
  );
};

export default MyPoints;
