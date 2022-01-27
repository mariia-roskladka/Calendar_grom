import React from 'react';
import Day from '../day/Day';
import PropTypes from 'prop-types';

import './week.scss';

const Week = ({
  weekDates,
  events,
  deleteEvent,
  postNewEvent,
  setReRender,
  updateEventsApp,
}) => {
  return (
    <div className='calendar__week'>
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        const dayStartMs = new Date(dayStart.getTime());
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStartMs && event.dateTo < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            deleteEvent={deleteEvent}
            postNewEvent={postNewEvent}
            setReRender={setReRender}
            updateEventsApp={updateEventsApp}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  events: PropTypes.object,
  weekDates: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

Week.defaultProps = {
  events: [],
};

export default Week;
