
import React,{useState} from 'react'
import styles from './contactsupport_form.module.scss'
import axiosInstance from 'src/services/axios'

function ContactSupport_Form({setContactSupportPopup}) {

const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [comments, setComments] = useState("")
const [btnChange, setBtnChange] = useState(false)
const [msg, setMsg] = useState("")
const [msgPopup, setMsgPopuo] = useState(false)


  const handleSubmit=() => {
    if(username && email && comments){

      axiosInstance
      .post("/sendgrid/", {
         action: "contactform",
         name:username,
         email:email,
         comments:comments
      })
      .then(function (response) {
        setBtnChange(true)
        setMsg(response.data.status)
        setMsgPopuo(true)
      })
      .catch(function (errors) {
         console.log(errors);
      });
    
    }

  }
  return (
    <div className={styles.contactSupportContainer}>
    <div className={styles.contactSupportMain_container}>
    {/* <button className={styles.btn_closeme} onClick={()=>{setContactSupportPopup(false)}}>
    // <i className="fa-solid fa-xmark"></i> 
    &times;
    </button> */}
    {!msgPopup &&   <div className={styles.contactSupportMain}>
    <div className={styles.contactSupportMain_contant}>
    <label>Name</label>
     <input
        type="text"
        name="handlename"
        placeholder="Name"
        className="form-control"
        value={username}
        onChange={(e)=>{setUsername(e.target.value)}}
                           />
    </div>
   
    <div className={styles.contactSupportMain_contant}>
    <label>Email</label>
     <input
        type="text"
        name="handleEmail"
        placeholder="Email"
        className="form-control"
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
                           />
    </div>

    <div className={styles.contactSupportMain_contant + " " + styles.Message}>
    <label>Comments</label>
     <input
        type="text"
        name="handleMsg"
        placeholder="Comments"
        className="form-control"
        value={comments}
        onChange={(e)=>{setComments(e.target.value)}}
                           />
    </div>
    {msg && <span  className={styles.contactmsg} style={{color:"red"}}>{msg}</span>}
    </div> }

    {msgPopup &&
    <div className={styles.msgPopupHeadContainer}>
    <div className={styles.msgSubContainer}>
    <p className={styles.msgPopupPara}>Thank you for contacting us! We have received your message and will get back to you soon.</p>
    </div>
    </div>
    }
  
    
    <div className={styles.support_btn_mainContainer}>

    {!btnChange && <><div className={styles.support_popup_btn}  >
    <button className={styles.price_btn} onClick={()=>{setContactSupportPopup(false)}}>Cancel</button>
  </div>
      
      <div className={styles.support_popup_btn}>
      <button className={styles.price_btn} onClick={handleSubmit}>Send</button>
    </div></>}

   {btnChange && <div className={styles.support_popup_btn_close}>
      <button className={styles.price_btn} onClick={()=>{setContactSupportPopup(false)}}>close</button>
    </div>}
    
    
  </div>
    </div>
    </div>
  )
}

export default ContactSupport_Form