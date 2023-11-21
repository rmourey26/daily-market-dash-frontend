import React, { useState } from "react";
import styles from './styleModulesMoneyTabs/MyMemberTab.module.scss'
import Upgrade_Popup from "src/components/upgradepopup/Upgrade_Popup";
import Downgrade_Popup from "src/components/Modals/downgradepopup/Downgrade_Popup";

const MyMembership = () => {
  const [upgradePopup, setUpgradePopup] = useState(false)
  const [downgradeBtn, setDowngradeBtn] = useState(false)
  const [downgradePopup, setDowngradePopup] = useState(false)
  const handle_popup = () => {
    setUpgradePopup(true)
  }
  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const Points = memberInfoData?.points
  const Memeberships = memberInfoData?.membership.toUpperCase()
  return (
    <div className="main-landing-profile main-pro mymoney_membership">

      <div className={styles.containr_member}>

        <div className={styles.member_mainContainer}>
          <div className={Memeberships == "GOLD"? styles.yellow_memberBox + " " + styles.gold : styles.yellow_memberBox}>
            <div className={styles.member_contentContainer}>
              <h4>MEMBERSHIP STATUS</h4>
              <h2>{Memeberships}</h2>
            </div>
          </div>
        </div>
        <div className={styles.second_memberContainer}>
          <div className={styles.member_containt}>
           {Memeberships == "GOLD"? <div className={styles.head_textContainer}>
           <h1 className={styles.heading_gold}>GOLD MEMBERSHIP BENEFITS</h1>
         </div>: <div className={styles.head_textContainer}>
              <h1>UPGRADE TO GOLD</h1>
              <div className={styles.monthyear}><h3>$9.99/MONTH</h3> <h3>Or $99.00/YEAR</h3></div>
            </div>
            
  }
            <div className={styles.text_list}>
              <ul>
                <li className={styles.list_textSub_container}><img src="assets/images/check-mark-01.png" /> Access to all available markets including NASDAQ, NYSE, LSE and more.</li>
                <li className={styles.list_textSub_container}><img src="assets/images/check-mark-01.png" /> A complete package of 8 boosts for your ROI!</li>
              </ul>
            </div>
            <div className={styles.btn_mainContainer}>
              {Memeberships =="GOLD" ? <button className={styles.button_Container} onClick={() => { setDowngradePopup(true) }}>DOWNGRADE TO SILVER</button> : <button className={styles.button_Container} onClick={handle_popup}>UPGRADE NOW</button>}

            </div>
          </div>

        </div>


      </div>
      {upgradePopup && <Upgrade_Popup setUpgradePopup={setUpgradePopup} setDowngradeBtn={setDowngradeBtn} />}
      {downgradePopup && <Downgrade_Popup setDowngradePopup={setDowngradePopup} setDowngradeBtn={setDowngradeBtn} />}
    </div>
  );
};

export default MyMembership;
