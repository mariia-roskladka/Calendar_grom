import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({ events, weekDates, deleteEvent, postNewEvent, updateEventsApp }) => {
  const [reRender, setReRender] = useState(false);
  const getTimezone = () => {
    const offset = new Date().getTimezoneOffset();

    if (offset < 0) {
      if (-offset % 60 < 10) return `GMT+0${Math.ceil(offset / -60)}`;
    } else {
      if (offset % 60 < 10) return `GMT-0${Math.ceil(offset / 60)}`;
    }
  };

  return reRender || !reRender ? (
    <section className='calendar'>
      <Navigation weekDates={weekDates} />
      <div className='calendar__offset'>
        <span className='calendar__offset-text'>{getTimezone()}</span>
        <div className='calendar__offset-line'></div>
      </div>
      <div className='calendar__body'>
        <div className='calendar__week-container'>
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            deleteEvent={deleteEvent}
            postNewEvent={postNewEvent}
            setReRender={setReRender}
            updateEventsApp={updateEventsApp}
          />
        </div>
      </div>
    </section>
  ) : null;
};

Calendar.propTypes = {
  events: PropTypes.object,
  weekDates: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

Calendar.defaultProps = {
  events: [],
};

export default Calendar;
