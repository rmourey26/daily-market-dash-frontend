import React, { useEffect } from "react";
import MemberNotifications from "./MemberNotifications";
import InfoMessageModal from "src/components/Modals/InfoMessageModal";
import ChatModel from "src/components/ChatModel";
import { useChat } from "src/hooks/useChat";
import { extras } from "src/data/constants";
import { useAuth } from "src/hooks/useAuth";
import BoosterModalPopup from "src/components/Modals/boosterMessageModal";
import { useSetting } from "src/hooks/useSetting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserAccountSetting from "src/components/Modals/AccountSetting";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import MemberSplash from "src/components/membersplash/membersplash";


const Header = ({ open, portfolioWel, zindexHead }) => {
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

  // console.log("togglePopup", setting)

  let avatartype = localStorage.getItem("avatartype");
  let avatarid = localStorage.getItem("avatarId");

  const handlechange = () => {
    toggleProfile();
  };

  const handleInfo = () => toggleInfoPopup();

  const handleOpenChat = () => toggleChatPopup();

  const handlechangeNotification = () => {
    toggleNotification();
  };


  const handleTogglePopup = () => togglePopup();

  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const Notification = memberInfoData?.notifications;
 
  const getCustomMessage = setting.message;
  // toast.success("getCustomMessage");
  useEffect(() => {
    if (getCustomMessage) {
      toast.success(getCustomMessage, {
        onOpen: () => toggleTostify(),
        onClose: () => toggleTostify(),
      });
      customMessage("");
    }
  }, [getCustomMessage]);

  useEffect(() => {
    if (toast.isActive) {
      console.log("isActive", "true");
    }
    if (!toast.isActive) {
      console.log("isActive", "false");
    }
  }, []);

  // useEffect(() => {
  //    localStorage.removeItem("avatarId");
  //    localStorage.setItem("avatarId", auth?.avatar);
  //    localStorage.removeItem("avatartype");
  // localStorage.setItem("avatarId", auth?.avatartype);
  // }, [auth]);

  console.log("setting.isPopupActive", setting.isPopupActive, getCustomMessage);
  console.log("zindexHead", zindexHead)

  return (
    <>
      <div
        id="scrollStopHeader"
        className={
          open == "buy" || open == "watchlist" || open == "sell"
            ? styles["header"] + " " + styles["active-tp-head"]
            : styles["header"]
        }
        style={{zIndex: portfolioWel ==0 || zindexHead ==true ||open=='LearnMore' ?"0":"4"}}
      >
        <div className={styles.row}>
          <div className={styles["col-6"]}>
            {/*<img src={extras.mainLogo} alt="" className={styles.logo} />*/}
            <img src={extras.mainLogo} alt="" className={styles.logo} />
          </div>
          <div className={styles["col-6"]}>
            <ul className="my-account">
              <li className="myMoney">
                <Link to="/MyMoneyPage" >
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
              <MemberSplash/>
              </li>
            </ul>
          </div>
        </div>
        {/* {show && <UserAccountSetting CloseModel={setShow} />}

         {openChat && <ChatModel CloseModel={setOpenChat} />}

         {showNotification && (
            <MemberNotifications CloseModel={setShowNotification} />
         )}
         {infoPopup && <InfoMessageModal CloseModel={setInfoPopup} />}

         {setting.isPopupActive && (
            <BoosterModalPopup handleTogglePopup={handleTogglePopup} />
         )} */}

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
