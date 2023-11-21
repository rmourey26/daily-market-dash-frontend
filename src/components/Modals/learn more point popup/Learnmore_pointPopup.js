import React from 'react'
import styles from './learnmore_popupPoints.module.scss'
function Learnmore_pointPopup({setLearnMorePoint_Popup}) {
  return (
    <div className={styles.Learnmore_PointContainer}>
    <div className={styles.Learnmore_Pointmain_container}>
    <button className={styles.btn_closeme} onClick={() => setLearnMorePoint_Popup(false)}>
    &times;
    </button>
    <div className={styles.lernMore_mainContext_container}>
    <div className={styles.learnMore_heading_Para}>
    <p>Learn how to earn points so you can use them towards in-contest rewards.</p>
    </div>
    <div className={styles.learnMore_firstQ}>
    <h2>What are points?</h2>
    <p>Points are in-contest currency you earn for each positive trade you make up to 20 consecutive ones. </p>
    </div>

    <div className={styles.learnMore_secondQ}>
    <h2>What constitutes a positive trade?</h2>
    <p>To qualify as a positive trade,</p>
    <ul>
    <li>You must have purchased and held a stock, commodity, or currency including crypto for a minimum of 4 hours throughout the trading day.
    </li>
    <li>You must sell that stock with a positive ROI.
    </li>
    <li>You cannot buy the same stock, commodity, or currency including crypto again during the “streak”.
    </li>
    <li>The shares you purchased must be worth at least $1000</li>
    </ul>
    </div>

    <div className={styles.learnMore_thirdQ}>
    <h2>How many points are awarded?</h2>
    <p>Points are awarded according to the point chart given below.</p>
    <div className={styles.learnmor_table}>
    <table>
    <tr>
    <th>Positive Trade</th>
    <th>Points Earned</th>
    <th>Positive Trade</th>
    <th>Points Earned</th>
  </tr>
  <tr>
    <td>1</td>
    <td>5</td>
    <td>11</td>
    <td>555</td>
  </tr>
  <tr>
    <td>2</td>
    <td>15</td>
    <td>12</td>
    <td>665</td>
  </tr>
  <tr>
    <td>3</td>
    <td>35</td>
    <td>13</td>
    <td>785</td>
  </tr>
  <tr>
    <td>4</td>
    <td>65</td>
    <td>14</td>
    <td>915</td>
  </tr>
  <tr>
    <td>5</td>
    <td>105</td>
    <td>15</td>
    <td>1055</td>
  </tr>
  <tr>
    <td>6</td>
    <td>155</td>
    <td>16</td>
    <td>1205</td>
  </tr>
  <tr>
    <td>7</td>
    <td>215</td>
    <td>17</td>
    <td>1365</td>
  </tr>
  <tr>
    <td>8</td>
    <td>285</td>
    <td>18</td>
    <td>1535</td>
  </tr>
  <tr>
    <td>9</td>
    <td>365</td>
    <td>19</td>
    <td>1715</td>
  </tr>
  <tr>
    <td>10</td>
    <td>455</td>
    <td>20</td>
    <td>1905</td>
  </tr>
    </table>
    </div>
    <p>If you make a positive trade, you earn 5 points. If you make a second positive trade, you earn 15 points from that trade (You now have 5 + 15 = 20 points in total). Higher the positive trade streak, higher the points you earn!  Points grow progressively higher up to 20 trades (A total of 13400 points for 20 positive trades) and then restarts from 1.</p>
    </div>


    <div className={styles.learnMore_fourthQ}>
    <h2>What happens after I reach a 20 positive trade streak or if I make a negative trade?</h2>
    <p>If you reach a 20 positive trade streak, you go back to 1 on your 21st positive trade.  If you make a negative trade, your streak is lost and you will again start earning points from Positive Trade 1(5 points) as well, next time you make a positive trade. 
    </p>
    <p style={{marginTop:"10px"}}>Remember even 1 bad day means you start from the beginning!</p>
    </div>



    <div className={styles.learnMore_fivthQ}>
    <h2>When are points awarded? </h2>
    <p>Points are updated every evening according to the points chart given above.</p>
    </div>

    <div className={styles.learnMore_sixthQ}>
    <h2>What can I use points for?</h2>
    <p>Points can be used to redeem in-contest rewards such as access to different markets, and boosts to increase your ROI for a day. You need at least 10,000 points in order to redeem them.</p>
    </div>

    </div>
    </div>
    </div>
  )
}

export default Learnmore_pointPopup