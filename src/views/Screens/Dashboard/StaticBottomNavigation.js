import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mainlandingpage } from "src/data/constants";
import { useSetting } from "src/hooks/useSetting";
import styles from "./StaticBottomNavigation.module.scss";
import { useChat } from "src/hooks/useChat";
import MemberSplash from "src/components/membersplash/membersplash";

// import { ToastContainer, toast } from "react-toastify";

const StaticBottomNavigation = ({
  show,
  setShow,
  openChat,
  showNotification,
  setOpen,
  open,
  infoPopup,
  setBoosterPopup,
  boosterPopup,
  setDateZIndex,
  dateZIndex,
  zindexHead
}) => {
  const navlist = [

    {
      id:"membernotification",
      to: "",
      title: "Member Notifications",
      img: "assets/images/icons/headicons/Notifications.svg",
      imgmobile: "assets/images/icons/headicons/Notifications.svg",
    },

    {
      id:"chat",
      to: "",
      title: "Chat",
      img: "assets/images/icons/headicons/Messaging.svg",
      imgmobile: "assets/images/icons/headicons/Messaging.svg",
    },

    {
      id:"booster",
      to: "",
      title: "Booster",
      img: "assets/images/icons/headicons/boost.svg",
      imgmobile: "assets/images/icons/headicons/boost.svg",
    },

    // {
    //   to: "/HeadToHeadScreen",
    //   title: mainlandingpage.menu.h2h,
    //   img: "assets/images/icons/gr-03.svg",
    //   imgmobile: "assets/images/icons/gr-03_mobile.svg",
    // },

    {
      to: "/MainLandingPage",
      title: mainlandingpage.menu.portfolio,
      img: "assets/images/icons/trading_center.svg",
      imgmobile: "assets/images/icons/trading_center_mobile.svg",
    },

    {
      to: "/MyMoneyPage",
      title: mainlandingpage.menu.myMoney,
      img: "assets/images/icons/gr-04.svg",
      imgmobile: "assets/images/icons/gr-04_mobile.svg",
    },

    // {
    //   to: "/DailyGame",
    //   title: mainlandingpage.menu.dailyGame,
    //   img: "assets/images/icons/trading_center.svg",
    //   imgmobile: "assets/images/icons/trading_center_mobile.svg",
    // },

    {
      to: "/HeadToHeadThreeScreen",
      title: mainlandingpage.menu.rules,
      img: "assets/images/icons/gr-05.svg",
      imgmobile: "assets/images/icons/gr-05_mobile.svg",
    },

    {
      to: "/Info",
      title: "FAQ",
      img: "assets/images/icons/headicons/faq.svg",
      imgmobile: "assets/images/icons/headicons/faq.svg",
    },
  ];
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  const { setting, togglePopup, toggleNotification, toggleChatPopup } = useSetting();
  const { chat } = useChat();

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const Notification = memberInfoData?.notifications;



  const toggleSidebar = () => {
    setToggle(!toggle);
    setDateZIndex(!dateZIndex)
  };


  const handleallpopup = (event,id) => { 
    event.preventDefault();
    console.log(id)
    if(id==="booster"){
      togglePopup()
    }
    else if (id==="chat"){
      toggleChatPopup()
    }
    else if(id==="membernotification"){
      toggleNotification()
     
    }

  }
  


  // console.log(setting.istostifyActive)

  return (
    <div
      className={`${
        toggle
          ? styles["fixed-nav"] + " " + styles["unsticky-hyphen"]
          : styles["fixed-nav"]
      } ${setting.isKeyboardActive ? "keyboard-nav-active" : ""}`}
      style={{
        zIndex: setting.istostifyActive === true || zindexHead==true ? 0 : 4,
      }}
    >
      <div
        className={styles["toggle-me-now"]}
        style={{
          // opacity:
          //    show || openChat || showNotification || infoPopup
          //       ? "0.3"
          //       : "1",
          opacity:
            setting.isprofileActive ||
            setting.ischatPopupActive ||
            setting.isnotificationActive ||
            setting.isPopupActive ||
            setting.isinfoPopupActive
              ? "0.3"
              : "1",
          cursor:
            setting.isprofileActive ||
            setting.ischatPopupActive ||
            setting.isnotificationActive ||
            setting.isPopupActive ||
            setting.isinfoPopupActive
              ? "auto"
              : "pointer",
          pointerEvents:
            setting.isprofileActive ||
            setting.ischatPopupActive ||
            setting.isnotificationActive ||
            setting.isPopupActive ||
            setting.isinfoPopupActive
              ? "none"
              : "",
        }}
        id={styles["toggle-open-now"]}
        onClick={toggleSidebar}
      >
        <span className={styles["toggle-bar"]}>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </span>
        <p className={styles["menu-text"]}>{mainlandingpage.menu.menuText}</p>
      </div>
      <div
        className={
          toggle && !setting.isPopupActive && !setting.ischatPopupActive && !setting.isnotificationActive? styles["toggle-open"] + " " + styles.nav : styles.nav
        }
      >
        <div
          className={
            setting.isprofileActive ||
            setting.ischatPopupActive ||
            setting.isnotificationActive ||
            setting.isPopupActive ||
            setting.isinfoPopupActive
              ? styles["fade-nav"] + " " + styles["child-nav"]
              : styles["fade-nav"]
          }
        >
          <ul>
            <li className="memberSplash mobile">
              <MemberSplash />
              </li>
            {navlist.map((item) => (
              item.to ==""?  <li key={item.title}>
              <Link onClick={(event)=>{handleallpopup(event,item.id)}}>
                <div
                  className={`${
                    item.to==""
                      ? styles["btm-icon"] + " " + styles["active"]
                      : styles["btm-icon"]
                  }`}
                >
                  <img
                    src={width <= 786 ? item.imgmobile : item.img}
                    alt=""
                  />
                </div>
                <span>{item.title}</span>
               {item.id!=="booster" &&<span className="mobile-notify">{item.id=="chat"? chat.notifications : Notification}</span>}
              </Link>
            </li>:
              <li
                key={item.to}
                className={
                  item.to == "/HeadToHeadThreeScreen" ? styles.disabledlink : ""
                }
              >
                <Link to={item.to}>
                  <div
                    className={`${
                      window.location.href.includes(item.to)
                        ? styles["btm-icon"] + " " + styles["active"]
                        : styles["btm-icon"]
                    }`}
                  >
                    <img
                      src={width <= 786 ? item.imgmobile : item.img}
                      alt=""
                    />
                  </div>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          
        </div>
      </div>
    </div>
  );
};

export default StaticBottomNavigation;
