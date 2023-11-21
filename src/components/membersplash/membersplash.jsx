import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

function MemberSplash() {

  const saved = localStorage.getItem("membersInfo");
  const memberInfoData = JSON.parse(saved);
  const Points = memberInfoData?.points
  const Memeberships = memberInfoData?.membership
  const navigate = useNavigate();

  const MemberOpenNewTab = (event) => {
    event.preventDefault();
    navigate("/MyMoneyPage/?membership")
  };

  const openNewTab = (event) => {
    event.preventDefault();
    navigate("/MyMoneyPage/?point")
  };
  return (
    <div> 
    <div className="membership-level" onClick={MemberOpenNewTab}>
    <Link>{Memeberships} Member</Link>
    </div>
    <div className="membership-points" onClick={openNewTab}>
    <Link>
    {Points}&nbsp;
    Points
    </Link>
    </div>
   </div>
  )
}

export default MemberSplash