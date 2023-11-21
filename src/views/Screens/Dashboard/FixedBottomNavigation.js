import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mainlandingpage } from "src/data/constants";
import { useSetting } from "src/hooks/useSetting";
// import { ToastContainer, toast } from "react-toastify";

const FixedBottomNavigation = ({
  show,
  setShow,
  openChat,
  showNotification,
  setOpen,
  open,
  infoPopup,
  setBoosterPopup,
  boosterPopup,
}) => {
  const navlist = [
    {
      to: "/MainLandingPage",
      title: mainlandingpage.menu.portfolio,
      img: "assets/images/icons/trading_center.svg",
      imgmobile: "assets/images/icons/trading_center_mobile.svg",
    },

    {
      to: "/HeadToHeadScreen",
      title: mainlandingpage.menu.h2h,
      img: "assets/images/icons/gr-03.svg",
      imgmobile: "assets/images/icons/gr-03_mobile.svg",
    },

    {
      to: "/MyMoneyPage",
      title: mainlandingpage.menu.myMoney,
      img: "assets/images/icons/gr-04.svg",
      imgmobile: "assets/images/icons/gr-04_mobile.svg",
    },

    // {
    //    to: "/Maintenance",
    //    title: "Maintenance",
    //    img: "assets/images/icons/gr-04.svg",
    //    imgmobile: "assets/images/icons/gr-04_mobile.svg",
    // },

    {
      to: "/HeadToHeadThreeScreen",
      title: mainlandingpage.menu.rules,
      img: "assets/images/icons/gr-05.svg",
      imgmobile: "assets/images/icons/gr-05_mobile.svg",
    },
  ];
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  const { setting } = useSetting();

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  // console.log(setting.istostifyActive)

  return (
    <div
      className={`${toggle ? "fixed-nav unsticky-hyphen" : "fixed-nav"} ${
        setting.isKeyboardActive ? "keyboard-nav-active" : ""
      }`}
      style={{
        zIndex: setting.istostifyActive === true ? 0 : 1,
      }}
    >
      <div
        className="toggle-me-now"
        style={{
          // opacity:
          //    show || openChat || showNotification || infoPopup
          //       ? "0.3"
          //       : "1",
          opacity:
            show ||
            openChat ||
            showNotification ||
            infoPopup ||
            boosterPopup ||
            setting.isPopupActive
              ? "0.3"
              : "1",
          cursor:
            show ||
            openChat ||
            showNotification ||
            infoPopup ||
            boosterPopup ||
            setting.isPopupActive
              ? "auto"
              : "pointer",
          pointerEvents:
            show ||
            openChat ||
            showNotification ||
            infoPopup ||
            boosterPopup ||
            setting.isPopupActive
              ? "none"
              : "",
        }}
        id="toggle-open-now"
        onClick={toggleSidebar}
      >
        <span className="toggle-bar">
          <span className="line"></span>
          <span className="line"></span>
        </span>
        <p className="menu-text">{mainlandingpage.menu.menuText}</p>
      </div>
      <div className={`${toggle ? "toggle-open" : ""} nav`}>
        <div
          className={
            show ||
            openChat ||
            showNotification ||
            infoPopup ||
            boosterPopup ||
            setting.isPopupActive
              ? "fade-nav child-nav"
              : "fade-nav"
          }
        >
          <ul>
            {navlist.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>
                  <div
                    className={`${
                      window.location.href.includes(item.to)
                        ? "btm-icon active"
                        : "btm-icon"
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

export default FixedBottomNavigation;
