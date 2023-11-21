import React,{useState, useEffect} from "react";
import styles from "./styleModulesMoneyTabs/LegalDocuments.module.scss";
import axiosInstance from "src/services/axios";
import ViewDocumentModal from "src/components/Modals/ViewDocumentModal";

const MyAffidavit = ({setZindexHead}) => {
   const [affidavitData, setAffidavitData] = useState();
   const [viewModelOpen, setViewModelOpen] = useState(false);
   const [legals, setLegals] = useState("");

   
   const getAffidavit = async () =>{
   await axiosInstance
      .post("/members/", {
         action:"affidavits"
      })
      .then(function (response) {
         console.log("setAffidavitData",response);
         setAffidavitData(response.data);
        
      })
      .catch(function (errors) {
         console.log(errors);
      });
   }

   useEffect(() => {
      getAffidavit();
   }, [])

   const handlesignedAffidavits = (affidavitName) => {
      axiosInstance
      .post("/members/", {
         action:"affidavit",
         affidavit:affidavitName
      })
      .then(function (response) {
         setAffidavitData(response.data);
        
      })
      .catch(function (errors) {
         console.log(errors);
      });

   }


   return (
      <div className="main-landing-profile main-pro legaldocs">
         <div className={styles.legalDocuments}>
            <div className={styles.legalRow}>
               <div className={styles.legalCol}>
                  <h4>Daily Contest Affidavit</h4>
               </div>
               <div className={styles.legalCol}>
                  <div className={styles.legalRowChild}>
                     <div className={styles.legalColChild}>
                        <button type="button" className={styles.Active} onClick={()=>{setLegals("daily"); setViewModelOpen(true); setZindexHead(true)}}>
                           view document
                        </button>
                        <button type="button" className={affidavitData?.daily == 0 ? styles.Active: styles.Disabled} onClick={()=>{handlesignedAffidavits("daily")}} disabled={affidavitData?.daily == 0 ? false : true}>
                           sign document
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.legalRow}>
               <div className={styles.legalCol}>
                  <h4>Weekly Contest Affidavit</h4>
               </div>
               <div className={styles.legalCol}>
                  <div className={styles.legalRowChild}>
                     <div className={styles.legalColChild}>
                        <button type="button" className={styles.Active} onClick={()=>{setLegals("weekly"); setViewModelOpen(true); setZindexHead(true)}}>
                           view document
                        </button>
                        <button type="button" className={affidavitData?.weekly == 0 ? styles.Active: styles.Disabled}  onClick={()=>{handlesignedAffidavits("weekly")}} disabled={affidavitData?.weekly == 0?false:true }>
                           sign document
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.legalRow}>
               <div className={styles.legalCol}>
                  <h4>Battle Royale Affidavit</h4>
               </div>
               <div className={styles.legalCol}>
                  <div className={styles.legalRowChild}>
                     <div className={styles.legalColChild}>
                        <button type="button" className={styles.Active} onClick={()=>{setLegals("monthly"); setViewModelOpen(true); setZindexHead(true)}} >
                           view document
                        </button>
                        <button type="button" className={affidavitData?.monthly == 0 ? styles.Active: styles.Disabled} onClick={()=>{handlesignedAffidavits("monthly")}} disabled={affidavitData?.monthly == 0 ? false : true}>
                           sign document
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.legalRow}>
               <div className={styles.legalCol}>
                  <h4>Photo Identification</h4>
               </div>
               <div className={styles.legalCol}>
                  <div className={styles.legalRowChild}>
                     <div className={styles.legalColChild}>
                        <button className={styles.nonebtn}>
                           
                        </button>
                        <div className="doc-upload" style={{ display: "none" }}>
                        <input
                           type="file"
                           accept="image/*"     
                           id="DocUpload"
                        />
                     </div>
                     <label htmlFor="DocUpload">
                     <p  className={styles.Active}  onClick={()=>{handlesignedAffidavits("photo")}}>
                     upload Photo
                  </p>
                  </label>

                     </div>
                  </div>
               </div>
            </div>
         </div>
         {viewModelOpen && <ViewDocumentModal setViewModelOpen={setViewModelOpen} legals={legals} setZindexHead={setZindexHead}/>}
      </div>
   );
};

export default MyAffidavit;
