import React from "react";
// import { useState } from "react";
import InfoMessageModal from "src/components/InfoMessageModal";
import UserAccountSetting from "src/components/AccountSetting";
import MemberNotifications from "./MemberNotifications";
import ChatModel from "src/components/ChatModel";
import { extras } from "src/data/constants";
import { useAuth } from "src/hooks/useAuth";
import { useChat } from "src/hooks/useChat";
// import parse from "html-react-parser";
// import WelcomePopUp from "src/components/WelcomePopUp/WelcomePopUp";

const Header = ({
  show,
  setShow,
  openChat,
  setOpenChat,
  showNotification,
  setShowNotification,
  infoPopup,
  setInfoPopup,
}) => {
  // const [openChat, setOpenChat] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const { auth } = useAuth();
  const { chat } = useChat();
  const handlechange = () => {
    setShow(true);
  };

  const handleCloseChat = () => setOpenChat(false);
  const handleInfo = () => setInfoPopup(true);

  const handleOpenChat = () => setOpenChat(true);
  const handlechangeNotification = () => {
    setShowNotification(true);
  };
  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const Notification = memberInfoData?.notifications;
  let avatartype = localStorage.getItem("avatartype");
  let avatarid = localStorage.getItem("avatarId");

  return (
    <div className="header">
      <div className="row">
        <div className="col-6">
          <img src={extras.mainLogo} alt="" className="logo" />
        </div>
        <div className="col-6">
          <ul className="my-account">
            <li onClick={handlechange}>
              <img
                src={extras.avatarUrl + `256_${avatarid}.${avatartype}`}
                alt=""
              />
            </li>
            <li className="myMoney">
              <Link to="/MyMoneyPage">
                <img src="assets/images/icons/headicons/my_Money.svg" alt="" />
              </Link>
            </li>
            <li onClick={handlechangeNotification}>
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
          </ul>
        </div>
      </div>
      {show && <UserAccountSetting CloseModel={setShow} />}
      {openChat && <ChatModel CloseModel={setOpenChat} />}
      {showNotification && (
        <MemberNotifications CloseModel={setShowNotification} />
      )}
      {infoPopup && <InfoMessageModal CloseModel={setInfoPopup} />}
    </div>
  );
};

export default Header;
