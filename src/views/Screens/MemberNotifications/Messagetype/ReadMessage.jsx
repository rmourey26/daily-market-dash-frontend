import React, { useState, useEffect } from "react";
import axiosInstance from "src/services/axios";
// import "../style.scss";
import styles from "../MemberNotification.module.scss";

const ReadMessage = () => {
   const [allNotifications, setAllNotifications] = useState([]);
   const [notifications, setNotifications] = useState([]);
   const [page, setPage] = useState(0);
   const [count, setCount] = useState(5);
   const [lastIndex, setLastIndex] = useState(0);
   const [startIndex, setStartIndex] = useState(0);
   const [showLast, setShowLast] = useState(true);
   const [width, setWidth] = useState(window.innerWidth);
   const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
   };
   useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
         window.removeEventListener("resize", handleWindowSizeChange);
      };
   }, []);

   const resetStates = () => {
      setLastIndex(0);
      setStartIndex(0);
      setPage(0);
      setShowLast(true);
   };

   useEffect(() => {
      getMarketData();
   }, []);

   const getMarketData = async () => {
      await axiosInstance
         .post("/notifications/", {
            action: "read",
         })
         .then(function (response) {
            if (!response || response?.data?.length <= 0) return;

            setAllNotifications(response.data);

            let temp = [];
            if (response.data.length >= 5) {
               for (let i = 0; i < 5; i++) {
                  temp.push(response.data[i]);
               }
            } else {
               for (let i = 0; i < response.data.length; i++) {
                  temp.push(response.data[i]);
               }
            }
            // for (let i = 0; i < 5; i++) {
            //    temp.push(response.data[i]);
            // }

            setNotifications(temp);
         })
         .catch(function (errors) {
            console.log(errors);
         });
   };

   const goDown = () => {
      let start = (1 + page) * count;
      let end = start + count;

      if (start > allNotifications.length) return;

      let tempNotifications = [];

      if (end > allNotifications.length) {
         end = allNotifications.length;
         setShowLast(false);
      }

      let last = 0;
      setStartIndex(start);
      for (let index = start; index < end; index++) {
         if (allNotifications[index]) {
            tempNotifications.push(allNotifications[index]);
            last = index;
         }
      }

      setLastIndex(last);
      setNotifications(tempNotifications);
      setPage(page + 1);
   };

   const goUp = () => {
      let start = startIndex - 1;
      let end = startIndex - count;

      if (end < 0 || page < 0) return;
      setShowLast(true);

      let tempNotifications = [];

      let last = 0;
      for (let index = start; index >= end; index--) {
         if (allNotifications[index]) {
            tempNotifications.push(allNotifications[index]);
            last = index;
         }
      }

      setNotifications(tempNotifications.reverse());
      setPage(page - 1 < 0 ? 0 : page - 1);
      setLastIndex(lastIndex - count);
      setStartIndex(last);
   };

   const Delete = async (id) => {
      await axiosInstance
         .post("/notifications/", {
            action: "trash",
            messageid: id,
         })
         .then(function (response) {
            resetStates();
            getMarketData();
            // const tempAllNotification = allNotifications.filter(
            //    (item) => item.messageid !== id
            // );

            // const tempNotification = notifications.filter(
            //    (item) => item.messageid !== id
            // );

            // setAllNotifications(tempAllNotification);
            // setNotifications(tempNotification);

            // setLastIndex(lastIndex - 1);
            // setStartIndex(startIndex - 1);
         })
         .catch(function (errors) {
            console.log(errors);
         });
   };

   useEffect(() => {
      setTimeout(() => {
         axiosInstance
            .post("/notifications/", {
               action: "read",
            })
            .then(function (response) {
               setAllNotifications(response.data);
            })
            .catch(function (errors) {
               console.log(errors);
            });
      }, 15000);
   }, []);

   return (
      <div className={styles["tabs-list"]}>
         {startIndex !== 0 && (
            <span className={styles["arrrow-up"]} onClick={goUp}>
               <img src="assets/images/icons/down-arrow.png" alt="" />
            </span>
         )}

         {showLast && (
            <span className={styles["arrrow-down"]} onClick={goDown}>
               <img src="assets/images/icons/down-arrow.png" alt="" />
            </span>
         )}

         <div className={styles["read-message-list"]}>
            <ul>
               {allNotifications && notifications && width >= 992
                  ? notifications?.map((messageRead) => (
                       <li key={messageRead?.messageid}>
                          <div className={styles["list-item"]}>
                             <span>
                                <p>{messageRead?.text}</p>
                             </span>

                             <span
                                onClick={() => Delete(messageRead?.messageid)}
                             >
                                <img
                                   src="assets/images/icons/del-icon.svg"
                                   alt=""
                                />
                             </span>
                          </div>
                       </li>
                    ))
                  : allNotifications?.map((messageRead) => (
                       <li key={messageRead?.messageid}>
                          <div className={styles["list-item"]}>
                             <span>
                                <p>{messageRead?.text}</p>
                             </span>

                             <span
                                onClick={() => Delete(messageRead?.messageid)}
                             >
                                <img
                                   src="assets/images/icons/del-icon.svg"
                                   alt=""
                                />
                             </span>
                          </div>
                       </li>
                    ))}
            </ul>
         </div>
      </div>
   );
};

export default ReadMessage;
