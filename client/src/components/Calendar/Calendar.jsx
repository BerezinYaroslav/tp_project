import React from 'react';
import calendar from '../../images/Calendar.png';

function Calendar() {
  return (
    <div className="calendar">
      <img src={calendar} className="calendar__item" alt="календарь" />
    </div>
  );
}

export default Calendar;
