import React,{useState,} from 'react'
import axiosInstance from 'src/services/axios'
import styles from './downgrade_popup.module.scss'

function Downgrade_Popup({setDowngradePopup, setDowngradeBtn}) {
    const [downgradeSecondPopup, setdowngradeSecondPopup] = useState(false)
    const handleChange =()=>{

      axiosInstance
      .post("/members/", {
         action: "downgrade",
      })
      .then(function (response) {
      })
      .catch(function (errors) {
         console.log(errors);
      });


      setDowngradePopup(false)
      setdowngradeSecondPopup(false)
      setDowngradeBtn(false)
    }

    
  return (
    <div className={styles.downgradeContainer}>
    <div className={styles.downgradeMain_container}>
    <div className={styles.downgradesub_Mian_container}>
    {!downgradeSecondPopup && <>  <div className={styles.downgradeContant_container}>
    <h2>Are you sure you want to cancel your GOLD membership subscription ?</h2>
    
    
    </div>
    <div className={styles.downgrade_popup_btn}>
    <div className={styles.btn1}>
    <button onClick={()=>{setDowngradePopup(false)}}>No</button>
    </div>
    <div className={styles.btn2}>
    <button onClick={()=>{setdowngradeSecondPopup(true)}}>Yes</button>
    </div>
    
  </div></>}


  {downgradeSecondPopup && <><div className={styles.second_downgradeContant}>
  <h2>Your GOLD membership has been canceled. Your account has been downgrade to SILVER.</h2>
  <h2 className={styles.secondHeading}>You have to upgrade again to enjoy more markets and boosts</h2>
  <p>REFUND REQUEST FORM</p>
  </div>
  <div className={styles.second_popup_btn_downgrade}>
  <button onClick={handleChange}>DONE</button>
  </div>
  </>}
    </div>
    </div>
    </div>
  )
}

export default Downgrade_Popup