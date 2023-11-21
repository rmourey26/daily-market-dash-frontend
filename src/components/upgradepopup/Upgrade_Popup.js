import React,{useState,useEffect}from 'react'
import styles from './upgrade_popup.module.scss'
import { Link } from "react-router-dom";
import { useSetting } from "src/hooks/useSetting";
import BoosterModalPopup from '../Modals/boosterMessageModal';
import axiosInstance from 'src/services/axios';

function PayPalButton({setLastClick,setErrorPopup}) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AaNNoPZYmBbO3Wqh5R8yHQW5uDpML_f7-5xU2_gYg8qGoUjJPEO_Cx-EuCD8gfiPiAoQkEJxakIvMPCf&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    document.body.appendChild(script);

    script.onload = () => {
      window.paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'white',
          layout: 'vertical',
          label: 'subscribe',
        },
        createSubscription: function(data, actions) {
          return actions.subscription.create({
            plan_id: 'P-4BL29932072320942MSEESZY', 
          }).catch((error) => {
            setErrorPopup(true)
            console.error('Subscription creation error:', error);
            // Handle the error here (e.g., display an error message to the user)
          });
        },
        onApprove: function(data, actions) {
          alert(data.subscriptionID);
          setLastClick(true)

          axiosInstance
          .post("/members/", {
             action: "upgrade",
          })
          .then(function (response) {
          })
          .catch(function (errors) {
             console.log(errors);
          });
        },
        onCancel: function (data) {
          // Handle cancellation here
          console.log('Payment cancelled by user:', data);
          setErrorPopup(true)
        },
      }).render('#paypal-button-container-P-4BL29932072320942MSEESZY');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="paypal-button-container-P-4BL29932072320942MSEESZY" />;
}





function PayPalButtonMonthly({setLastClick,setErrorPopup}) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AaNNoPZYmBbO3Wqh5R8yHQW5uDpML_f7-5xU2_gYg8qGoUjJPEO_Cx-EuCD8gfiPiAoQkEJxakIvMPCf&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    document.body.appendChild(script);

    script.onload = () => {
      window.paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'white',
          layout: 'vertical',
          label: 'subscribe',
        },
        createSubscription: function(data, actions) {
          return actions.subscription.create({
            plan_id: 'P-7T723245SV045503XMSEERQY', // Replace with your plan ID
          }).catch((error) => {
            console.error('Subscription creation error:', error);
            setErrorPopup(true)
            // Handle the error here (e.g., display an error message to the user)
          });
        },
        onApprove: function(data, actions) {
          alert(data.subscriptionID);
          setLastClick(true)
          axiosInstance
          .post("/members/", {
             action: "upgrade",
          })
          .then(function (response) {
          })
          .catch(function (errors) {
             console.log(errors);
          });
        },
        onCancel: function (data) {
          // Handle cancellation here
          console.log('Payment cancelled by user:', data);
          setErrorPopup(true)
        },
      }).render('#paypal-button-container-P-7T723245SV045503XMSEERQY');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="paypal-button-container-P-7T723245SV045503XMSEERQY" />;
}







function Upgrade_Popup({setUpgradePopup, setDowngradeBtn}) {
  // const [firstClick, setfirstClick] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  const [lastClick, setLastClick] = useState(false)
  const [paymentClick, setPaymentClick] = useState(false)
  const [errorPopup, setErrorPopup] = useState(false)


  const {togglePopup, setting} = useSetting();
  const handleTogglePopup = () => togglePopup();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleBtn_popup=()=>{
    setUpgradePopup(false);
    setDowngradeBtn(true)
    setLastClick(false)
  }

  return (
    <div className={styles.upgradeContainer}>
    <div className={styles.upgradeMain_container}>
    {paymentClick && <button className={styles.btn_closeme} onClick={() => setUpgradePopup(false)}>
    &times;
    </button>}
    
    
    {/*!firstClick && !lastClick && !paymentClick &&
      <>
      <div className={styles.containtMain_container}>
      <div className={styles.heading}> 
        <h2 className={styles.upgradeHeads}>Upgrade to Gold</h2>
      </div>
      
      <div  className={styles.upgradeContents}>
      <p>CONNECT YOUR PAYPAL ACCOUNT TO</p>
      <p>COMPLETE PAYMENT</p>
      </div>
  
      </div>
      <div className={styles.popup_btn}>
      <div className={styles.img_container} onClick={()=>{setfirstClick(true)}}>
      <img src='assets/PayPal.png'/>
      </div>
      </div>
    
      
      </>
  */}
   

   { !lastClick && !paymentClick && !errorPopup&& <><div className={styles.containtMain_container}>
    <div className={styles.heading}> 
      <h2 className={styles.upgradeHeads}>Upgrade to Gold</h2>
    </div>
    </div>
    
    
    <div className={styles.seleter_Container}>
    <p className={styles.upgradepara}>Select Subscription</p>
    <div className={styles.radio_type}>
    <label>
      <input 
      type="radio"
      name="pay monthly"
      value="Monthly"
      checked={selectedOption === 'Monthly'}
      onChange={handleChange}/> 
      <div className={styles.readheads}>
        <p className={styles.upgradepara}>Pay monthly</p> 
        <p>($9.99/month)</p>
      </div>
    </label>
    </div>
   
    
    <div className={styles.radio_type}>
    <label>
      <input 
      type="radio" 
      name="pay yearly"
      value="Yearly"
      checked={selectedOption === 'Yearly'}
      onChange={handleChange}
      /> 
      <div className={styles.readheads}>
        <p>Pay yearly</p>
        <p>($99.00/year)</p>
      </div>
    </label>
    </div>
  </div>

  <div className={styles.second_btn_mainContainer}>

  <div className={styles.second_popup_btn} onClick={()=>{setUpgradePopup(false)}} >
  <button className={styles.price_btn} style={{background:"#737876"}}>Cancel</button>
</div>
    {selectedOption == "Monthly" || selectedOption == "Yearly" ? 
    <div className={styles.second_popup_btn} onClick={()=>{setPaymentClick(true)}}>
    <button className={styles.price_btn}>Next</button>
  </div>: <div className={styles.second_popup_btn}>
  <button className={styles.price_btn} style={{background:"#BABABA"}}>Next</button>
</div>}
  
  
</div>
 
  
</>}

{paymentClick && !errorPopup && !lastClick &&(selectedOption == "Monthly" || selectedOption == "Yearly") &&<>
  <div className={styles.containtMain_container}>
  <div className={styles.heading}> 
    <h2 className={styles.upgradeHeads}>Upgrade to Gold</h2>
  </div>
  
  <div  className={styles.upgradeContents_payment}>
  <p>SELECT PAYMENT METHOD</p>
  </div>
 { selectedOption == "Monthly" &&  <div className={styles.second_popup_btn_center} style={{marginTop:"55px", marginBottom:"30px"}}>
  <PayPalButtonMonthly setLastClick={setLastClick} setErrorPopup={setErrorPopup}/>
  </div>}

  { selectedOption == "Yearly" && <div className={styles.second_popup_btn_center} style={{marginTop:"55px", marginBottom:"30px"}}>
  <PayPalButton setLastClick={setLastClick} setErrorPopup={setErrorPopup}/>
  </div>}

  </div>
  </>}


{lastClick && <>
  <div className={styles.containtMain_containerlastpopup}>
<div className={styles.secondMain_containerlastpopup}>
<div className={styles.heading}> 
  <h2>Thank you for upgrading to GOLD! Enjoy your new benefits:</h2>
</div>
<div className={styles.textContainer_lastpopup}>

<ul>
<li className={styles.list_textSub_lastpopup}><img src="assets/images/check-mark-01.png" /> Access to all available markets <Link to="/mobiledemo/MainLandingPage/?marketdata">here</Link></li>
<li className={styles.list_textSub_lastpopup}><img src="assets/images/check-mark-01.png" /> A complete package of 8 boosts for your ROI! <p className={styles.boosterpopup} onClick={handleTogglePopup}>Use now!</p></li>
</ul>
</div>
</div>

</div>
<div className={styles.second_popup_btn}>
    <button className={styles.price_btn} onClick={handleBtn_popup}>DONE</button>
    </div>
    </>}

  {errorPopup && 
    <>
    <div className={styles.error_main_container}>
    <div className={styles.error_heading}>
    <h2>Something went wrong. Please try again.</h2>
    </div>
    </div>
    <div className={styles.second_popup_btn}>
    <button className={styles.price_btn} onClick={handleBtn_popup}>DONE</button>
    </div>
    </>
  }

    {setting.isPopupActive && (
      <BoosterModalPopup
        handleTogglePopup={handleTogglePopup}
      />
    )}
    </div>
    </div>
  )
}

export default Upgrade_Popup