import React from "react";
import { CalendarCard } from "src/components/Calendar";
import { HeadToHeadTwo } from "src/components/Cards";
import Header from "../../Header";
import StaticBottomNavigation from "../StaticBottomNavigation";
{
   /*const calendar = (days) => {
   const list = [];
   for (let index = 1; index <= days; index++) {
      var className = "";
      if (index === 2) {
         className = "active";
      }
      list.push(<li className={className}> {index} </li>);
   }
   return <>{list}</>;
};*/
}

const HeadToHeadThreeScreen = ({
   setShow,
   show,
   openChat,
   setOpenChat,
   showNotification,
   setShowNotification,
}) => {
   return (
      <div className="main-loader cal">
         <Header
            show={show}
            setShow={setShow}
            openChat={openChat}
            setOpenChat={setOpenChat}
            showNotification={showNotification}
            setShowNotification={setShowNotification}
         />
         <div className="hero-title">
            <h1>Hello Max!</h1>
         </div>
         <div className="brk-top-section portfolio-section work">
            <h5>HEAD TO HEAD</h5>
            <h4>bull style</h4>
            <img src="assets/images/icons/gray_arrow_left.svg" alt="" />
         </div>
         <div className="main-pairing">
            <CalendarCard />
            {/*  <div className="calender-event">
               <div className="img-event">
                  <div className="row">
                     <h4>Select Day of the Month</h4>
                     <img src="assets/images/icons/puls-01.png" alt="" />
                  </div>
                  <ul id="calendarContainer">{calendar(28)}</ul>
               </div>
            </div>*/}
            <div className="winner-head">
               <div className="row">
                  <HeadToHeadTwo
                     headtitle="you"
                     title="roi"
                     subtitle="23.45%"
                     links="view portfolio"
                     status="winner!!"
                  />

                  <HeadToHeadTwo
                     headtitle="opponent"
                     title="roi"
                     subtitle="15.21%"
                     links="view portfolio"
                     status="winner!!"
                     showstatus={false}
                     showtitle={false}
                  />
                  {/*<div className="col-6">
                     <span className="top">you</span>
                     <div className="you">
                        <p>roi</p>
                        <h4>23.45%</h4>
                        <a href="#">view portfolio</a>
                     </div>
                     <span className="green">winner!!</span>
   </div>
                  <div className="col-6">
                     <span className="top">opponent</span>
                     <div className="opponent">
                        <p>roi</p>
                        <h4>15.21%</h4>
                        <a href="#">view portfolio</a>
                     </div>
                  </div>*/}
               </div>
            </div>
         </div>
         <StaticBottomNavigation
            show={show}
            setShow={setShow}
            openChat={openChat}
            setOpenChat={setOpenChat}
            showNotification={showNotification}
            setShowNotification={setShowNotification}
         />
      </div>
   );
};

export default HeadToHeadThreeScreen;
