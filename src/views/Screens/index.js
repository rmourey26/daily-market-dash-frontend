// import { useState } from 'react';
// import BRKBScreen from './BRKBScreen';
// import DailyScreen from './DailyScreen';
// import PortfolioOneScreen from './PortfolioOneScreen';
import "./index.scss";
// import WatchListScreen from './WatchListScreen/WatchListScreen';
// import WatchListScreen from './WatchListScreen';
// import LoadingScreen from './LoadingScreen';
// import FirstSignupScreen from './FirstSignupScreen';
// import SecondSignupScreen from './SecondSignupScreen';
// import ThirdSignupScreen from './ThirdSignupScreen';
// import TradingCenterScreen from './TradingCenterScreen';
// import PortfolioScreen from './PortfolioScreen';
// import HeadToHeadThreeScreen from './HeadToHeadThreeScreen'
import HeadToHeadFourScreen from "./HeadToHeadFourScreen";

const Screens = () => {
   // const [screenCount, setScreenCount] = useState(0);

   const getScreen = () => {
      return <HeadToHeadFourScreen />;
   };

   //   const nextScreen = () => {
   //     if (screenCount < 4) setScreenCount(screenCount + 1);
   //     // setScreenCount((prevState) => prevState + 1);
   //   };

   //   const prevScreen = () => {
   //     if (screenCount > 0) setScreenCount(screenCount - 1);
   //     // setScreenCount((prevState) => prevState - 1);
   //   };

   // useEffect(() => {
   //    console.log("log: screenCount", screenCount);
   // }, [screenCount]);

   return (
      <div>
         {/* <div className='fixed-next-btn' onClick={nextScreen}>
        <img src='assets/images/icons/arrow_right.svg' alt='Next' />
      </div>
      <div className='fixed-prev-btn' onClick={prevScreen}>
        <img src='assets/images/icons/gray_arrow_left.svg' alt='Prev-button' />
      </div> */}
         {getScreen()}
      </div>
   );
};

export default Screens;
