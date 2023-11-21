import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  if (value < 10) {
    var newValue = '0' + value
  }
  return (
    <div className="timer__container">
      <p className="timer__label">{type}</p>
      <span id="days">{newValue ? newValue : value}</span>
    </div>
  );
};

export default DateTimeDisplay;
