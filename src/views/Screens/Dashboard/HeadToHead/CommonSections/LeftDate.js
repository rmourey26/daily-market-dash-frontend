import React from "react";
export const LeftDate = ({ day, type }) => {
  return <div className={type === "desktop" ? "zone" : "zone timw-mobile"}>
    <span className="day">{day}</span>
    <span className="dt"></span>
  </div>
}