import React from 'react';
import PropTypes from 'prop-types';

import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates }) => {
  const nowDay = new Date();

  return (
    <header className='calendar__header'>
      {weekDates.map((dayDate) => (
        <div className='calendar__day-label day-label'>
          <span
            className={
              dayDate.getDate() === nowDay.getDate()
                ? 'day-label__day-name day-label__day-name-current'
                : 'day-label__day-name'
            }
          >
            {days[dayDate.getDay()]}
          </span>
          <span
            className={
              dayDate.getDate() === nowDay.getDate()
                ? 'day-label__day-number day-label__day-number-current'
                : 'day-label__day-number'
            }
          >
            {dayDate.getDate()}
          </span>
        </div>
      ))}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
};

export default Navigation;
