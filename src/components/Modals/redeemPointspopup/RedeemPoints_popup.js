import React,{useState} from 'react'
import styles from './redeemPoints_popup.module.scss'

function RedeemPoints_popup({setRedeemPopup}) {
  const [selectedOption, setSelectedOption] = useState('');
  const [selected_stockOptions, setSelected_stockOptions] = useState([]);
  const [selected_market, setSelected_market] = useState(false);
  const [stockContainer, setStockContainer] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChangestock = (event) => {
    const stockValue = event.target.value;
    
    // Check if the "3 additional" option is selected
    const isThreeAdditionalSelected = selectedOption === "3 additional";
  
    if (isThreeAdditionalSelected) {
      const isSelected = selected_stockOptions.includes(stockValue);
  
      if (isSelected) {
        setSelected_stockOptions(selected_stockOptions.filter(option => option !== stockValue));
      } else if (selected_stockOptions.length < 3) {
        setSelected_stockOptions([...selected_stockOptions, stockValue]);
      }
    } else {
      // If "3 additional" is not selected, only allow selecting one stock option
      setSelected_stockOptions([stockValue]);
    }
  };

  const handleMarket=()=>{
    if(selected_stockOptions.length > 0){
      // setRedeemPopup(false);
      setMsg(true)
      // setSelected_market(false);
      setStockContainer(true);

    }

  }
  const handleRedeem=()=>{
    if(selectedOption === 'all additional' || selectedOption==="1 booster" || selectedOption==="3 booster"){
      // setRedeemPopup(false);
      setMsg(true)
      // setSelected_market(false);
      setStockContainer(true);

    }

  }

  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const Points = memberInfoData?.points
  // const Points = 20000
  

  return (
    <div className={styles.redeemContainer}>
    <div className={styles.redeemMain_container}>
    <button className={styles.btn_closeme} onClick={() => setRedeemPopup(false)}>
    {/* <i className="fa-solid fa-xmark"></i> */}
    &times;
    </button>

   {!selected_market && <div className={styles.containtMain_container}>
      <div className={styles.heading}> 
        <h2>Redeem Points</h2>
        <p>Select the reward you want to redeem now!</p>
      </div>

      <div className={styles.sub_container}>
        <div className={styles.seleter_Container}>
          <div className={styles.radio_type}>
          <label>
            <input type="radio"
            name="additional market"
            value="additional"
            checked={selectedOption === 'additional'}
            onChange={handleChange}
            disabled={Points < 10000}
            /> 
            <div className={styles.readheads}>
              <p>Access to an additional market</p>
              <span>10000 points</span>
            </div>
          </label>
          </div>
          <div className={styles.radio_type}>
          <label>
            <input type="radio" 
            name="3_additional market"
            value="3 additional"
            checked={selectedOption === '3 additional'}
            onChange={handleChange}
            disabled={Points < 12000}
            /> 
            <div className={styles.readheads}>
              <p>Access to 3 additional markets</p>
              <span>12000 points</span>
            </div>
          </label>
          </div>
          <div className={styles.radio_type}>
          <label>
            <input type="radio" 
            name="all_additional market"
            value="all additional"
            checked={selectedOption === 'all additional'}
            onChange={handleChange}
            disabled={Points < 15000}
            /> 
            <div className={styles.readheads}>
              <p>Access to all additional markets</p>
              <span>15000 points</span>
            </div>
          </label>
          </div>
          <div className={styles.radio_type}>
          <label>
            <input type="radio" 
            name="1_booster"
            value="1 booster"
            checked={selectedOption === '1 booster'}
            onChange={handleChange}
            disabled={Points < 17000}
            /> 
            <div className={styles.readheads}>
              <p>Access to all additional markets + 1 booster package</p>
              <span>17000 points</span>
            </div>
          </label>
          </div>
          <div className={styles.radio_type}>
          <label>
            <input type="radio" 
            name="3_booster"
            value="3 booster"
            checked={selectedOption === '3 booster'}
            onChange={handleChange}
            disabled={Points < 20000}
            />
            <div className={styles.readheads}>
              <p>Access to all additional markets + 3 booster package</p>
              <span>20000 points</span>
            </div>
          </label>
          </div>
        </div>
        <div className={styles.total_pointBox}>
        <h3>Total Points:</h3>
        <span>{Points}</span>
      </div>
      </div>

      
      <div className={styles.popup_btn}>
      {Points >=10000 && selectedOption ?  <button onClick={()=>{selectedOption && setSelected_market(true); handleRedeem();}} style={{background:"#9DBAAD"}}>REDEEM</button>: <button>REDEEM</button>}
       
  </div>
    </div>}
    
    

    {selected_market && !stockContainer && <div className={styles.containtMain_container}>
      <div className={styles.heading}> 
        <h2>Redeem Points</h2>
        <p>{selectedOption === '3 additional' ? "Select any 3":"Select any 1"}</p>
      </div>


      <div className={styles.sub_container}>
        <div className={styles.seleter_Container}>
          <div className={styles.checkbox_type}>
          <label>
            <input type="checkbox"
            name="stock_1"
            value="stock_1"
            checked={selected_stockOptions.includes('stock_1')}
            onChange={handleChangestock}/> 
            <div className={styles.readheads}>
              <p>NEW YORK STOCK EXCHANGE</p>
              
            </div>
          </label>
          </div>
          <div className={styles.checkbox_type}>
          <label>
            <input type="checkbox" 
            name="stock_2"
            value="stock_2"
            checked={selected_stockOptions.includes('stock_2')}
            onChange={handleChangestock}/> 
            <div className={styles.readheads}>
              <p>NASDAQ</p>
              
            </div>
          </label>
          </div>
          <div className={styles.checkbox_type}>
          <label>
            <input type="checkbox" 
            name="stock_3"
            value="stock_3"
            checked={selected_stockOptions.includes('stock_3')}
            onChange={handleChangestock}/> 
            <div className={styles.readheads}>
              <p>TORONTO STOCK EXCHANGE</p>
              
            </div>
          </label>
          </div>
          <div className={styles.checkbox_type}>
          <label>
            <input type="checkbox" 
            name="stock_4"
            value="stock_4"
            checked={selected_stockOptions.includes('stock_4')}
            onChange={handleChangestock}/> 
            <div className={styles.readheads}>
              <p>LONDON STOCK EXCHANGE</p>
              
            </div>
          </label>
          </div>
          <div className={styles.checkbox_type}>
          <label>
            <input type="checkbox" 
            name="stock_5"
            value="stock_5"
            checked={selected_stockOptions.includes('stock_5')}
            onChange={handleChangestock}/>
            <div className={styles.readheads}>
              <p>EURONEXT AMSTERDAM</p>
            </div>
          </label>
          </div>
          <div className={styles.checkbox_type}>
          <label>
            <input type="checkbox" 
            name="stock_6"
            value="stock_6"
            checked={selected_stockOptions.includes('stock_6')}
            onChange={handleChangestock}/>
            <div className={styles.readheads}>
              <p>JAPAN NIKKEI</p>
            </div>
          </label>
          </div>
        </div>
        <div className={styles.total_pointBox}>
        <h3>Total Points</h3>
        <span>{Points}</span>
      </div>
      </div>

      <div className={styles.popup_btn}>
      <button onClick={handleMarket} style={{background:"#9DBAAD"}}>CONFIRM</button>
      </div>
      </div>}
      {msg &&
        <div className={styles.msgContainer}>
        <div className={styles.subMsgContainer}>
        <p className={styles.msgPara}>Thank you for redeeming</p>
        </div>
        </div>
      }
      




    </div>
    </div>
  )
}

export default RedeemPoints_popup