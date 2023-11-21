import React, { useEffect, useState } from "react";
import InfoMessageModal from "src/components/Modals/InfoMessageModal";
import MemberNotifications from "./MemberNotifications";
import ChatModel from "src/components/ChatModel";
import { useChat } from "src/hooks/useChat";
import { extras } from "src/data/constants";
import { useAuth } from "src/hooks/useAuth";
import BoosterModalPopup from "src/components/Modals/boosterMessageModal";
import { useSetting } from "src/hooks/useSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import parse from "html-react-parser";
import { useLocation, useNavigate } from "react-router";
import WelcomePopUp from "src/components/Modals/WelcomePopUp/WelcomePopUp";
import UserAccountSetting from "src/components/Modals/AccountSetting";
import { Link } from "react-router-dom";
import MemberSplash from "src/components/membersplash/membersplash";
import { getCookie } from "src/utils/Cookies";

const Header = ({
  datas,
  handlecontinue,
  welcomePopUps,
  memberAccInfo,
  previousActive,
  portfolioWel, 
  setH2hrule,
  h2hrule
}) => {
  const { chat } = useChat();
  const { auth } = useAuth();
  const {
    togglePopup,
    setting,
    customMessage,
    toggleTostify,
    toggleInfoPopup,
    toggleChatPopup,
    toggleNotification,
    toggleProfile,
  } = useSetting();

  const handlechange = () => {
    toggleProfile();
  };
  const navigate = useNavigate();
  const location = useLocation();

  const [colseGameh2h, setCloseGameh2h] = useState(false)

  const handleInfo = () => toggleInfoPopup();

  const handleOpenChat = () => toggleChatPopup();

  const handlechangeNotification = () => {
    toggleNotification();
  };

  const handleTogglePopup = () => togglePopup();

  const getCustomMessage = setting.message;

  useEffect(() => {
    if (getCustomMessage) {
      toast.success(getCustomMessage, {
        onOpen: () => toggleTostify(),
        onClose: () => toggleTostify(),
      });
      customMessage("");
    }
  }, [getCustomMessage]);


  const welPopupCloseh2h = getCookie("welPopupCloseh2h")


  const nav = () => navigate("/MainLandingPage");
  // const handleOpenBooster = () => setBoosterPopup(true);
  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const Notification = memberInfoData?.notifications;

  //  console.log("current URL 👉️", window.location.href);
  let currentUrl = location.pathname.replace(/\//g, "");
  // console.log(currentUrl, "currentUrl");
  let avatartype = localStorage.getItem("avatartype");
  let avatarid = localStorage.getItem("avatarId");
  

  return (
    <>
      <div className="header static">
          {currentUrl !== "PreviousGames" && datas && welcomePopUps === 0 && memberAccInfo.h2hday === 1 ?(
            <WelcomePopUp
              heading="Welcome to Round x of Head 2 Head Oct 7, 2022"
              data1={parse(`${datas.h2hrules}`)}
              data={parse(`${datas.h2hdetails}`)}
              welPopUpPage="false"
              nav={nav}
              handlecontinue={handlecontinue}
              btnContinue={memberAccInfo.h2hday === 1 ? "ACCEPT RULES" : ""}
              setCloseGameh2h={""}
            />
          ):memberAccInfo.h2hday === 0 && !welPopupCloseh2h && !colseGameh2h? (<WelcomePopUp
            heading="Welcome to Round x of Head 2 Head Oct 7, 2022"
            data1={parse(`${datas.h2hrules}`)}
            data={parse(`${datas.h2hdetails}`)}
            welPopUpPage="false"
            nav={nav}
            handlecontinue={handlecontinue}
            btnContinue={memberAccInfo.h2hday === 1 ? "ACCEPT RULES" : ""}
            setCloseGameh2h={setCloseGameh2h}
          />):("")}
        <div className="row">
          <div className="col-6">
            <img src={extras.mainLogo} alt="" className="logo" />
          </div>
          <div className="col-6">
            <ul className="my-account">
              <li className="myMoney">
                <Link to="/MyMoneyPage">
                  <img
                    src="assets/images/icons/headicons/my_Money.svg"
                    alt=""
                  />
                </Link>
              </li>
              <li onClick={handlechangeNotification} className="Notifies">
                <img
                  src="assets/images/icons/headicons/Notifications.svg"
                  alt=""
                />
                <div className="notify-me">
                  {Notification && <span>{Notification}</span>}
                </div>
              </li>
              <li onClick={handleOpenChat} className="acive-mess">
                <img src="assets/images/icons/headicons/Messaging.svg" alt="" />
                <span>{chat.notifications}</span>
              </li>
              <li onClick={handleInfo} className="info-mess">
                <img src="assets/images/icons/headicons/faq.svg" alt="" />
              </li>
              <li className="booster" onClick={handleTogglePopup}>
                <img src="assets/images/icons/headicons/boost.svg" alt="" />
              </li>
              <li onClick={handlechange} className="avtarpickNew">
                <img className="profileImg"
                  src={extras.avatarUrl + `256_${avatarid}.${avatartype}`}
                  alt=""
                />
              </li>
              <li className="memberSplash desktop">
              <MemberSplash />
              </li>
              {/* <li className="member-splash">
                <div className="membership-level" onClick={MemberOpenNewTab}>
                  <Link>{Memeberships} Member</Link>
                </div>
                <div className="membership-points" onClick={openNewTab}>
                  <Link>
                    {Points}&nbsp;
                    Points
                  </Link>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
        {setting.isprofileActive && (
          <UserAccountSetting CloseModel={handlechange} />
        )}

        {setting.ischatPopupActive && <ChatModel CloseModel={handleOpenChat} />}

        {setting.isnotificationActive && (
          <MemberNotifications CloseModel={handlechangeNotification} />
        )}
        {setting.isinfoPopupActive && (
          <InfoMessageModal closeModal={handleInfo} />
        )}

        {setting.isPopupActive && (
          <BoosterModalPopup
            customMessage={customMessage}
            handleTogglePopup={handleTogglePopup}
          />
        )}
      </div>
      {<ToastContainer />}
    </>
  );
};

export default Header;
