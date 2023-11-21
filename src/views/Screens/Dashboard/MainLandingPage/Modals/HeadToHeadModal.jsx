import React from "react";
import CustomModal from "src/components/Modals/CustomModal";


const HeadToHeadModal = ({ closeModal }) => {
   return (
      <CustomModal handleClose={closeModal}>
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
      </CustomModal>
   );
};

export default HeadToHeadModal;
