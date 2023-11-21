import React, { Fragment, useEffect, useState } from "react";
import axiosInstance from "src/services/axios";
import parse from "html-react-parser";
import WelcomeDMDPopup from "src/components/Modals/welcomeDMDPopup/WelcomeDMDPopup";

const LearnMoreModal = ({ closeModal }) => {
   const [datas, setDatas] = useState([]);

   useEffect(() => {
      const getSettingsData = async () => {
         await axiosInstance
            .post("learnmore/", {
               token: "good4loadtests",
               action: "content",
            })
            .then(function (response) {
               setDatas(response.data.content);

               console.log("logff: ", response.data.content);
               // setShowDetails('')
               // console.log("setting1", response.data);
            })
            .catch(function (errors) {
               console.log(errors);
            });
      };

      getSettingsData();
   }, []);

   return (
      <Fragment>
         <WelcomeDMDPopup
            heading="Welcome to Round x of Head 2 Head Oct 7, 2022"
            data={parse(`${datas}`)}
            handlecontinue={closeModal}
         />

         {/*  <CustomModal handleClose={closeModal}>
            <div className="watchlist-modal">
               <div className="appl-search">
                  <input type="search" id="watchlist" placeholder="Search" />
                  <img src="assets/images/icons/search.svg" alt="" />
               </div>
               <div className="stock-title">
                  <div className="det">
                     <h3>APPL</h3>
                     <p>Apple Inc.</p>
                  </div>
                  <div className="det">
                     <h3>NASD</h3>
                  </div>
               </div>
               <div className="action-buttn">
                  <button className="btn">Add</button>
               </div>
            </div>
         </CustomModal>*/}
      </Fragment>
   );
};

export default LearnMoreModal;
