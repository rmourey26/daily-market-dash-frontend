import React, { useEffect } from "react";
import axiosInstance from "src/services/axios";
import WatchListProfileRow from "../widgets/WatchListProfileRow";
import { useStateIfMounted } from "use-state-if-mounted";

const WatchListTab = ({
   refreshData,
   handleTabChangeMain,
   setOpen,
   open,
   openModal,
}) => {
   const [data, setData] = useStateIfMounted([]);
   const [deleted, setDeleted] = useStateIfMounted([]);
   const getMarketData = async () => {
      await axiosInstance
         .post("/watchlist/", {
            action: "view",
         })
         .then(function (response) {
            setData(response.data.watchlist);
         })
         .catch(function (errors) {
            console.log(errors);
         });
   };
   // console.log("refreshdata", refreshData)
   useEffect(() => {
      getMarketData();
   }, [deleted, refreshData]);

   const confirmDeleted = (value) => {
      setDeleted(value);
   };

   return (
      <div>
         <div className="main-landing-profile">
            {data &&
               data.map((stock, i) => (
                  <WatchListProfileRow
                     handleTabChangeMain={handleTabChangeMain}
                     delete={confirmDeleted}
                     stock={stock}
                     key={i}
                     setOpen={setOpen}
                     open={open}
                     openModal={openModal}
                  />
               ))}
         </div>
      </div>
   );
};

export default WatchListTab;
